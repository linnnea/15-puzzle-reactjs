import React from 'react';
import { Motion, spring } from "react-motion";
import { TILE_SUM, ROW_SUM } from "./constants";
import { getNumberPosition, getVisualPosition } from "./helpers/gameLogic";

function Tile(props) {
  const { tile, index, width, height, tileClick } = props;
  const { row, col } = getNumberPosition(index);
  const visualPos = getVisualPosition(row, col, width, height);

  const tileStyle = {
    width: `calc(100% / ${ROW_SUM})`,
    height: `calc(100% / ${ROW_SUM})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
  };

  const motionStyle = {
    translateX: spring(visualPos.x),
    translateY: spring(visualPos.y)
  };

  return (
    <Motion style={motionStyle}>
      {({ translateX, translateY }) => (
        <li
          style={{
            width: tileStyle.width,
            height: tileStyle.height,
            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
            // Empty slot
            opacity: tile === TILE_SUM - 1 ? 0 : 1,
            cursor: tile === TILE_SUM - 1 ? '' : 'pointer',
          }}
          className="tile"
          onClick={() => tileClick(index)}
        >
          {tile + 1}
        </li>
      )}
    </Motion>
  )
}

export default Tile;