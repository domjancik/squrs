import React, { ReactElement } from 'react'
import useLocalStorageState from '../useLocalStorageState'
import Squr from './Squr'
import { getSqurKey } from './squrCommon'
import SqurProps from './SqurProps'

interface SqurLocalStorageProps
  extends Omit<
    SqurProps,
    'expression' | 'setExpression' | 'logic' | 'setLogic' | 'view' | 'setView'
  > {
  storageKey: string
}

function SqurLocalStorage({
  storageKey,
  ...rest
}: SqurLocalStorageProps): ReactElement {
  const [expression, setExpression] = useLocalStorageState(
    `${storageKey}-expression`,
    'sin(t)'
  )
  const [logic, setLogic] = useLocalStorageState(
    `${storageKey}-logic`,
    'expsyn'
  )
  const [view, setView] = useLocalStorageState(`${storageKey}-view`, 'expsyn')

  const key = getSqurKey(logic, view)
  return (
    <Squr
      key={key}
      expression={expression}
      setExpression={setExpression}
      logic={logic}
      setLogic={setLogic}
      view={view}
      setView={setView}
      {...rest}
    />
  )
}

export default SqurLocalStorage
