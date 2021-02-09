import React from 'react';
import './App.css';
import Squr from './Squr/Squr';

const SIDE = 300

function App() {
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px'}}>
      <Squr side={SIDE}/>
      <Squr side={SIDE}/>
      <Squr side={SIDE}/>
      <Squr side={SIDE}/>
    </div>
  );
}

export default App;
