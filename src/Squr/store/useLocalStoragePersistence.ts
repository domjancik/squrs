import useLocalStorageState from './useLocalStorageState'
import { DEFAULT_EXPRESSION, DEFAULT_LOGIC, DEFAULT_VIEW } from '../squrCommon'
import { UsePersistenceHook } from './squrStore'

const useLocalStoragePersistence: UsePersistenceHook = (storageKey: string) => {
  const [expression, setExpression] = useLocalStorageState(
    `${storageKey}-expression`,
    DEFAULT_EXPRESSION
  )
  const [logic, setLogic] = useLocalStorageState(
    `${storageKey}-logic`,
    DEFAULT_LOGIC
  )
  const [view, setView] = useLocalStorageState(
    `${storageKey}-view`,
    DEFAULT_VIEW
  )

  return {
    expression,
    setExpression,
    logic,
    setLogic,
    view,
    setView,
  }
}

export default useLocalStoragePersistence
