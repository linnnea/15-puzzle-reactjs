import React, { useState } from "react";
import { TILE_SUM, ROW_SUM, BOARD_SIZE } from "./constants";
import Tile from './Tile';

function Board() {
  const [ tiles, setTiles ] = useState([...Array(TILE_SUM).keys()]);

  const pieceWidth = Math.round( BOARD_SIZE / ROW_SUM );
  const pieceHeight = Math.round( BOARD_SIZE / ROW_SUM );
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  
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
          />
        ))}
      </ul>
    </>
  )
}

export default Board
