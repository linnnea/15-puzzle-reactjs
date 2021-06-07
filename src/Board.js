import React, { useState } from "react";
import { TILE_SUM, ROW_SUM, BOARD_SIZE } from "./constants";
import { shuffle, canMoveTile, moveTile, isQuizSolved } from './helpers/gameLogic';
import Tile from './Tile';
import Timer from './Timer';
import TimerBtn from './TimerBtn';

function Board() {
  const [ tiles, setTiles ] = useState([...Array(TILE_SUM).keys()]);
  const [ isStarted, setIsStarted ] = useState(false);
  const [time, setTime] = useState({ms: 0, s: 0, m: 0, h: 0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  // Not started = 0
  // Started = 1
  // Paused = 2

  const pieceWidth = Math.round( BOARD_SIZE / ROW_SUM );
  const pieceHeight = Math.round( BOARD_SIZE / ROW_SUM );
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  }

  const moveTiles = (tileIndex) => {
    const emptySlot =  tiles.indexOf(tiles.length - 1);
    if(canMoveTile( tileIndex, emptySlot)) {
      const movedTiles = moveTile(tiles, tileIndex, emptySlot);
      setTiles(movedTiles);
    }
  }

  const startClick = () => {
    start();
    shuffleTiles();
    setIsStarted(true);
  } 

  const shuffleClick = () => {
    shuffleTiles();
  }

  const tileClick = (index) => {
    moveTiles(index);
  }

  const playerWins = isQuizSolved(tiles);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms: updatedMs, s: updatedS, m: updatedM, h: updatedH});
  };

  const pause = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms: 0, s: 0, m: 0, h: 0});
    shuffleTiles();
    setIsStarted(false);
  };

  const resume = () => start();
  
  return (
    <>
      <Timer time={time} />
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            tileClick={tileClick}
          />
        ))}
      </ul>
      <div className="buttons">
        <TimerBtn status={status} pause={pause} reset={reset} resume={resume} />
        {playerWins && isStarted && <div className="alert-win">Player wins 🎉</div> }
        {!isStarted ? 
          (<button start={start} onClick={() => startClick()}>Start game</button>) : 
          (<button onClick={() => shuffleClick()}>Shuffle</button>)
        }
      </div>
    </>
  )
}

export default Board 
