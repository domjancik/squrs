import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import './App.css';
import firebaseConfig from './firebaseConfig';
import SqurFirebase from './Squr/SqurFirebase';
import { TimeContext } from './Squr/TimeContext';
import useTime from './useTime';

// TODO make this also syncd
const SQURS_PER_ROW = 4
const SQURS_PER_COL = SQURS_PER_ROW

const SQURS = SQURS_PER_ROW * SQURS_PER_COL
const SIDE = `${80 / SQURS_PER_ROW}vmin`

const getXIndex = (index: number, perRow = SQURS_PER_ROW) => index % perRow
const getYIndex = (index: number, perRow = SQURS_PER_ROW) => Math.round(index / perRow)

const makeSqurs = (count: number) => {
  const a = new Array(count).fill(1)
  return a.map((_v, index) => <SqurFirebase key={index} side={SIDE} path={`/squrs/${index}`} variables={{i: index + 1, x: getXIndex(index) + 1, y: getYIndex(index) + 1}} />)
}

const dynamicFirebaseSqurs = makeSqurs(SQURS)

function App() {
  const time = useTime()
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <TimeContext.Provider value={time}>
        {/* TODO Redo with minimal grid based centering */}
        {/* TODO gif animation credit */}
        <div style={{display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{display: 'grid', gridTemplateColumns: `repeat(${SQURS_PER_ROW}, ${SIDE})`, gap: '2vmin'}}>
            {dynamicFirebaseSqurs}
          </div>
        </div>
      </TimeContext.Provider>
    </FirebaseAppProvider>
  );
}

export default App;
