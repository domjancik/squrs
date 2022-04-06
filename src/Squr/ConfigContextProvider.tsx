import React, { ReactElement, ReactNode, useEffect, useRef } from 'react'
import ConfigContext from './ConfigContext'

interface Props {
  children: ReactNode
}

function ConfigContextProvider({ children }: Props): ReactElement {
  const volume = useRef(1)

  useEffect(() => {
    // @ts-ignore
    window.setVolume = (newVolume: number) => (volume.current = newVolume)
    return () => {
      // @ts-ignore
      delete window.setVolume
    }
  }, [])

  return (
    <ConfigContext.Provider value={{ volume: volume }}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigContextProvider
