import React from 'react';
import { Motion, spring } from "react-motion";
import Board from './Board';

function App() {
  return (
    <Motion
      defaultStyle={{
        opacity: 0,
        translateY: 50
      }}
      style={{
        opacity: spring(1),
        translateY: spring(0)
      }}
    >
      {interpolatedStyles => (
        <div className="App"
          style={{
            transform: `translateY(${interpolatedStyles.translateY}px)`,
            opacity: interpolatedStyles.opacity
          }}
        >
          <h1>15 Puzzle</h1>
          <Board />
        </div>
      )}
    </Motion>
  );
}

export default App;