import React, { ReactElement, useEffect, useState } from 'react'
import Squr from './Squr'

import 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import SqurProps from './SqurProps'
import EmptySqur from './EmptySqur'

interface SqurFirebaseProps extends Omit<SqurProps, 'expression' | 'setExpression'> {
    path?: string
}

function SqurFirebase({side = 100, path = '/squr', ...rest}: SqurFirebaseProps): ReactElement {
    const ref = useDatabase().ref(path)

    const { data, status } = useDatabaseObjectData<{expr: string}>(ref)
    
    // TODO debounce
    const setExpression = (newExpression: string) => {
        setLocalExpression(newExpression)
        ref.set({expr: newExpression})
    }

    // Optimistic updates and fix for cursor jumping (https://github.com/facebook/react/issues/955)
    const [localExpression, setLocalExpression] = useState('.5')
    useEffect(() => {
        if (status === 'success' && data.expr !== localExpression) setLocalExpression(data.expr ?? '.5')
    }, [status, data])

    if (status !== 'success') {
        return <EmptySqur side={side} color={{background: 'white'}}>{status}</EmptySqur>
    }

    return (
        <Squr side={side} expression={localExpression} setExpression={setExpression} {...rest} />
    )
}

export default SqurFirebase
