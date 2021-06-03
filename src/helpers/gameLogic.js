import { ROW_SUM } from "../constants"

export function getNumberPosition(index) {
  return {
    row: Math.floor(index / ROW_SUM),
    col: index % ROW_SUM,
  };
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}