import React, { ReactElement } from 'react'
import useLocalStorageState from '../useLocalStorageState'
import Squr from './Squr'
import SqurProps from './SqurProps'
import { INSTRUMENTS } from "./instruments";

interface SqurLocalStorageProps
  extends Omit<
    SqurProps,
    "expression" | "setExpression"
  > {
  storageKey: string;
}

function SqurLocalStorage({storageKey, ...props}: SqurLocalStorageProps): ReactElement {
    const [expression, setExpression] = useLocalStorageState(storageKey, 'sin(t)')

    const { logic, view } = INSTRUMENTS["gridseq"];
    return (
        <Squr expression={expression} setExpression={setExpression}
        
      contentComponent={view}
      useExpressionHook={logic}
        {...props} />
    )
}

export default SqurLocalStorage
