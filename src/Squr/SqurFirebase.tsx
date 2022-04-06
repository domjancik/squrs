import React, { ReactElement, useEffect, useState } from 'react'
import Squr from './Squr'

import 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import SqurProps from './SqurProps'
import EmptySqur from './EmptySqur'
import { DEFAULT_EXPRESSION, DEFAULT_LOGIC, DEFAULT_VIEW } from './squrCommon'
import { getSqurKey } from './squrCommon'

interface SqurFirebaseProps
  extends Omit<
    SqurProps,
    | 'expression'
    | 'setExpression'
    | 'contentComponent'
    | 'useExpressionHook'
    | 'toggleInstrument'
  > {
  path?: string
}

function SqurFirebase({
  side = 100,
  path = '/squr',
  ...rest
}: SqurFirebaseProps): ReactElement {
  const ref = useDatabase().ref(path)

  const { data, status } = useDatabaseObjectData<{
    expr: string
    logic?: string
    view?: string
  }>(ref)

  // Optimistic updates and fix for cursor jumping (https://github.com/facebook/react/issues/955)
  const [localExpression, setLocalExpression] = useState<string | undefined>(
    undefined
  )
  const [localLogic, setLocalLogic] = useState<string | undefined>(undefined)
  const [localView, setLocalView] = useState<string | undefined>(undefined)
  // TODO debounce
  const makeSetStateAndFirebase =
    (setLocal: typeof setLocalExpression, firebaseField: string) =>
    (newValue: string) => {
      setLocal(newValue)
      ref.update({ [firebaseField]: newValue })
    }
  const setExpression = makeSetStateAndFirebase(setLocalExpression, 'expr')
  const setLogic = makeSetStateAndFirebase(setLocalLogic, 'logic')
  const setView = makeSetStateAndFirebase(setLocalView, 'view')

  useEffect(() => {
    if (status === 'success') {
      const expr = data.expr ?? DEFAULT_EXPRESSION
      const logic = data.logic ?? DEFAULT_LOGIC
      const view = data.view ?? DEFAULT_VIEW
      if (expr !== localExpression) setLocalExpression(expr)
      if (logic !== localLogic) setLocalLogic(logic)
      if (view !== localView) setLocalView(view)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data])

  if (localExpression === undefined || status !== 'success') {
    return (
      <EmptySqur side={side} palette={{ background: 'black' }}>
        {status}
      </EmptySqur>
    )
  }

  return (
    <Squr
      key={getSqurKey(localLogic, localView)}
      side={side}
      expression={localExpression}
      setExpression={setExpression}
      logic={localLogic}
      setLogic={setLogic}
      view={localView}
      setView={setView}
      {...rest}
    />
  )
}

export default SqurFirebase
