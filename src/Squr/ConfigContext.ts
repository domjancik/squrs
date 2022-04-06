import { createContext } from 'react'

const ConfigContext = createContext<{
  volume: React.MutableRefObject<number> | null
}>({ volume: null })

export default ConfigContext
