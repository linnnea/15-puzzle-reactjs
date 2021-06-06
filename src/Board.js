import React, { useState } from "react";
import { TILE_SUM, ROW_SUM, BOARD_SIZE } from "./constants";
import { shuffle, canMoveTile, moveTile, isSolved } from './helpers/gameLogic';
import Tile from './Tile';

function Board() {
  const [ tiles, setTiles ] = useState([...Array(TILE_SUM).keys()]);
  const [ isStarted, setIsStarted ] = useState(false);

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
    shuffleTiles();
    setIsStarted(true);
  }

  const shuffleClick = () => {
    shuffleTiles();
  }

  const tileClick = (index) => {
    moveTiles(index);
  }

  const playerWins = isSolved(tiles);
  
  return (
    <>
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
      {playerWins && isStarted && <div className="alert-win">Player wins 🎉</div> }
      {!isStarted ? 
        (<button onClick={() => startClick()}>Start game</button>) : 
        (<button onClick={() => shuffleClick()}>Restart game</button>)
      }
    </>
  )
}

export default Board
