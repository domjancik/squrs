import React, { ReactElement } from 'react'
import Squr from './Squr'

import 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import SqurProps from './SqurProps'

interface SqurFirebaseProps extends Omit<SqurProps, 'expression' | 'setExpression'> {
    path?: string
}

function SqurFirebase({side, path = '/squr', ...rest}: SqurFirebaseProps): ReactElement {
    const ref = useDatabase().ref(path)

    const { data, status } = useDatabaseObjectData<{expr: string}>(ref)

    const expression = status === 'success'
        ? data.expr ?? '.5'
        : '.5'
    // TODO debounce, optimistic updates
    const setExpression = (newExpression: string) => {ref.set({expr: newExpression}); console.log('set')}

    return (
        <Squr side={side} expression={expression} setExpression={setExpression} {...rest} />
    )
}

export default SqurFirebase
