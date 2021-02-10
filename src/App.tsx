import React from 'react';
import './App.css';
import Squr from './Squr/Squr';
import { TimeContext } from './Squr/TimeContext';
import useAnimationFrame from './Squr/useAnimationFrame';
import useTime from './useTime';

const SIDE = 300

function App() {
  const time = useTime()
  return (
    <TimeContext.Provider value={time}>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px'}}>
      <Squr side={SIDE}/>
      <Squr side={SIDE}/>
      <Squr side={SIDE}/>
      <Squr side={SIDE}/>
    </div>
    </TimeContext.Provider>
  );
}

export default App;
