type SqurPersistenceProps =
  | 'expression'
  | 'setExpression'
  | 'view'
  | 'setView'
  | 'logic'
  | 'setLogic'

type UsePersistenceHookOutput = Pick<SqurProps, SqurPersistenceProps> & {
  isError?: boolean
}

type UsePersistenceHook = (storageKey: string) => UsePersistenceHookOutput

export { UsePersistenceHook, SqurPersistenceProps }
