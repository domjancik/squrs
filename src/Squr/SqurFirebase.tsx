import React, { ReactElement, useEffect, useState } from 'react'
import Squr from './Squr'

import 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import SqurProps from './SqurProps'
import EmptySqur from './EmptySqur'
import { INSTRUMENTS } from './instruments'

interface SqurFirebaseProps extends Omit<SqurProps, 'expression' | 'setExpression' | 'contentComponent' | 'useExpressionHook'> {
    path?: string
}

const DEFAULT_EXPRESSION = '0'

function SqurFirebase({side = 100, path = '/squr', ...rest}: SqurFirebaseProps): ReactElement {
    const ref = useDatabase().ref(path)

    const { data, status } = useDatabaseObjectData<{expr: string, instrument?: string}>(ref)
    
    // TODO debounce
    const setExpression = (newExpression: string) => {
        setLocalExpression(newExpression)
        ref.update({expr: newExpression})
    }

    // Optimistic updates and fix for cursor jumping (https://github.com/facebook/react/issues/955)
    const [localExpression, setLocalExpression] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (status === 'success') {
            const expr = data.expr ?? DEFAULT_EXPRESSION
            if (expr !== localExpression) setLocalExpression(expr)
        }
    }, [status, data])

    if (!localExpression || status !== 'success') {
        return <EmptySqur side={side} color={{background: 'white'}}>{status}</EmptySqur>
    }

    const instrumentName = data.instrument ?? 'expsyn'
    const { logic, view } = INSTRUMENTS[instrumentName] || INSTRUMENTS['expsyn']

    return (
        <Squr key={instrumentName} side={side} expression={localExpression} setExpression={setExpression} contentComponent={view} useExpressionHook={logic} {...rest} />
    )
}

export default SqurFirebase
