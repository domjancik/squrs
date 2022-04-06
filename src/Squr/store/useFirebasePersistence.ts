import { useEffect, useState } from 'react'

import 'firebase/database'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { DEFAULT_EXPRESSION, DEFAULT_LOGIC, DEFAULT_VIEW } from '../squrCommon'
import { UsePersistenceHook } from './squrStore'

const useFirebasePersistence: UsePersistenceHook = (storageKey: string) => {
  const ref = useDatabase().ref(storageKey)

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

  return {
    expression: localExpression,
    setExpression,
    logic: localLogic,
    setLogic,
    view: localView,
    setView,
  }
}

export default useFirebasePersistence
