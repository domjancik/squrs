import React, { useMemo, useState } from 'react'
import { FirebaseAppProvider } from 'reactfire'
import * as Tone from 'tone'
import './App.css'
import firebaseConfig from './firebaseConfig'
import Credit from './Help/Credit'
import Help from './Help/Help'
import Intro from './Intro/Intro'
import ConfigContextProvider from './Squr/ConfigContextProvider'
import makeSqurs from './Squr/makeSqurs'
import { TimeContext } from './Squr/TimeContext'
import useQueryParamsConfig from './Squr/useQueryParamsConfig'
import useTime from './useTime'

function App() {
  const time = useTime()
  const [started, setStarted] = useState(false)
  const config = useQueryParamsConfig()
  const { squrs, sideSize } = useMemo(() => {
    const { resolution, room, store } = config
    return makeSqurs(resolution, room, store)
  }, [config])

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ConfigContextProvider>
        <TimeContext.Provider value={time}>
          {/* TODO Redo with minimal grid based centering */}
          <div
            style={{
              display: 'flex',
              height: '100vh',
              width: '100vw',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {started ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${config.resolution}, ${sideSize})`,
                  gap: '2vmin',
                }}
              >
                {squrs}
                <Help />
                <Credit />
              </div>
            ) : (
              <Intro
                onClick={() => {
                  setStarted(true)
                  Tone.start()
                  Tone.Transport.start()
                }}
              />
            )}
          </div>
        </TimeContext.Provider>
      </ConfigContextProvider>
    </FirebaseAppProvider>
  )
}

export default App
