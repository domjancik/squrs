import React from 'react';
import './App.css';
import Squr from './Squr/Squr';
import { TimeContext } from './Squr/TimeContext';
import useTime from './useTime';

const SIDE = '20em'

function App() {
  const time = useTime()
  return (
    <TimeContext.Provider value={time}>
      {/* TODO Redo with minimal grid based centering */}
      {/* TODO gif animation credit */}
      <div style={{display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{display: 'grid', gridTemplateColumns: `repeat(2, ${SIDE})`, gap: '2em'}}>
          <Squr side={SIDE} init="0"/>
          <Squr side={SIDE} init="1"/>
          <Squr side={SIDE} init="t%1"/>
          <Squr side={SIDE} init="sin(t)"/>
        </div>
      </div>
    </TimeContext.Provider>
  );
}

export default App;
