import React from 'react';
import { TILE_SUM, ROW_SUM } from "./constants";
import { getNumberPosition, getVisualPosition } from "./helpers/gameLogic";

function Tile(props) {
  const { tile, index, width, height } = props;
  const { row, col } = getNumberPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);

  const tileStyle = {
    width: `calc(100% / ${ROW_SUM})`,
    height: `calc(100% / ${ROW_SUM})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
  };

  return (
    <>
      <li
      style={{
        width: tileStyle.width,
        height: tileStyle.height,
        transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
        opacity: tile === TILE_SUM - 1 ? 0 : 1,
      }}
      className="tile"
    >
      {tile + 1}
    </li>
    </>
  )
}

export default Tile;