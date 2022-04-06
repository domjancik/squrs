import React, { ReactElement } from 'react'
import Squr from './Squr'

import 'firebase/database'
import SqurProps from './SqurProps'
import EmptySqur from './EmptySqur'
import { getSqurKey } from './squrCommon'
import { SqurPersistenceProps, UsePersistenceHook } from './store/squrStore'

interface PersistentSqurProps extends Omit<SqurProps, SqurPersistenceProps> {
  usePersistenceHook: UsePersistenceHook
  storageKey?: string
}

function PersistentSqur({
  side = 100,
  storageKey = '/squr',
  usePersistenceHook,
  ...rest
}: PersistentSqurProps): ReactElement {
  const { expression, setExpression, logic, setLogic, view, setView, isError } =
    usePersistenceHook(storageKey)

  if (isError) {
    return (
      <EmptySqur side={side} palette={{ background: 'black' }}>
        Failed to load
      </EmptySqur>
    )
  }

  // Key is reset for each logic/view combination to enable exchange of hooks
  // without breaking order between renders
  const key = getSqurKey(logic, view)
  return (
    <Squr
      key={key}
      side={side}
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

export default PersistentSqur
