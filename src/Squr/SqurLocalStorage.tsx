import React, { ReactElement } from 'react'
import useLocalStorageState from '../useLocalStorageState'
import Squr from './Squr'
import SqurProps from './SqurProps'

interface SqurLocalStorageProps
  extends Omit<
    SqurProps,
    "expression" | "setExpression"
  > {
  storageKey: string;
}

function SqurLocalStorage({storageKey, ...props}: SqurLocalStorageProps): ReactElement {
    const [expression, setExpression] = useLocalStorageState(storageKey, 'sin(t)')

    return (
        <Squr expression={expression} setExpression={setExpression} {...props} />
    )
}

export default SqurLocalStorage
