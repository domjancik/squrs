import React, { useState } from "react"
import { FirebaseAppProvider } from "reactfire"
import * as Tone from 'tone'
import "./App.css"
import firebaseConfig from "./firebaseConfig"
import Help from "./Help/Help"
import Intro from "./Intro/Intro"
import ConfigContextProvider from "./Squr/ConfigContextProvider"
import SequencerContent from "./Squr/instruments/Sequencer/SequencerContent"
import SqurFirebase from "./Squr/SqurFirebase"
import { TimeContext } from "./Squr/TimeContext"
import useExpressionSequencer from "./Squr/instruments/Sequencer/useExpressionSequencer"
import useTime from "./useTime"

// TODO make this also syncd
const SQURS_PER_ROW = 1
const SQURS_PER_COL = SQURS_PER_ROW

const SQURS = SQURS_PER_ROW * SQURS_PER_COL
const SIDE = `${80 / SQURS_PER_ROW}vmin`

const getXIndex = (index: number, perRow = SQURS_PER_ROW) => index % perRow
const getYIndex = (index: number, perRow = SQURS_PER_ROW) =>
  Math.round(index / perRow)

const makeSqurs = (count: number) => {
  const a = new Array(count).fill(1)
  return a.map((_v, index) => {
    return (
    <SqurFirebase
      key={index}
      side={SIDE}
      path={`/squrs/${index}`}
      variables={{
        i: index + 1,
        x: getXIndex(index) + 1,
        y: getYIndex(index) + 1,
      }}
    />
  )})
}

const dynamicFirebaseSqurs = makeSqurs(SQURS)

function App() {
  const time = useTime()
  const [started, setStarted] = useState(false)

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ConfigContextProvider>
        <TimeContext.Provider value={time}>
          {/* TODO Redo with minimal grid based centering */}
          {/* TODO gif animation credit */}
          <div
            style={{
              display: "flex",
              height: "100vh",
              width: "100vw",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {started ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${SQURS_PER_ROW}, ${SIDE})`,
                  gap: "2vmin",
                }}
              >
                <Help />
                {dynamicFirebaseSqurs}
              </div>
            ) : (
              <Intro onClick={() => {
                setStarted(true)
                Tone.start()
                Tone.Transport.start()
              }} />
            )}
          </div>
        </TimeContext.Provider>
      </ConfigContextProvider>
    </FirebaseAppProvider>
  )
}

export default App
