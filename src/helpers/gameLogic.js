import { TILE_SUM, ROW_SUM } from '../constants';

// Get linear index of tile
export function getIndex(row, col) {
	return parseInt(row, 10) * ROW_SUM + parseInt(col, 10);
}

// Get specific index of tile backwards
export function getNumberPosition(index) {
	return {
		row: Math.floor(index / ROW_SUM),
		col: index % ROW_SUM,
	};
}

// Calculates exact position in px
export function getVisualPosition(row, col, width, height) {
	return {
		x: col * width - 5,
		y: row * height - 5,
	};
}

// Randomize tiles and checks if solveable (inversions)
export function shuffle(tiles) {
	const shuffledTiles = [
		...tiles
			.filter((t) => t !== tiles.length - 1)
			.sort(() => Math.random() - 0.5),
		tiles.length - 1,
	];
	return isQuizSolvable(shuffledTiles) && !isQuizSolved(shuffledTiles)
		? shuffledTiles
		: shuffle(shuffledTiles);
}

// Check if possible to move tile to empty slot
export function canMoveTile(srcIndex, destIndex) {
	const { row: srcRow, col: srcCol } = getNumberPosition(srcIndex);
	const { row: destRow, col: destCol } = getNumberPosition(destIndex);
	return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function moveTile(tiles, src, dest) {
	const tilesResult = [...tiles];
	[tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
	return tilesResult;
}

// Shuffle the tiles until they are solvable
export function isQuizSolvable(tiles) {
	let item = 1;
	for (let i = 1, l = TILE_SUM - 1; i <= l; i++) {
		for (let j = i + 1, m = l + 1; j <= m; j++) {
			item *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
		}
	}
	return Math.round(item) === 1;
}

export function isQuizSolved(tiles) {
	for (let i = 0, l = tiles.length; i < l; i++) {
		if (tiles[i] !== i) {
			return false;
		}
	}
	return true;
}
