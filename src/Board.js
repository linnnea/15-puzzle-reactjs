import React, { useState } from 'react';
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import { TILE_SUM, ROW_SUM, BOARD_SIZE } from './constants';
import Alert from './Alert';
import {
	shuffle,
	canMoveTile,
	moveTile,
	isQuizSolved,
} from './helpers/gameLogic';
import Tile from './Tile';
import Timer from './Timer';
import TimerBtn from './TimerBtn';

function Board() {
	const [tiles, setTiles] = useState([...Array(TILE_SUM).keys()]);
	const [started, setStarted] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
	const [interv, setInterv] = useState();
	const [status, setStatus] = useState(0);

	// Timer status
	// Not started = 0
	// Started = 1
	const pausedGame = status === 2;

	const pieceWidth = Math.round(BOARD_SIZE / ROW_SUM);
	const pieceHeight = Math.round(BOARD_SIZE / ROW_SUM);

	const boardStyle = {
		width: BOARD_SIZE - 15,
		height: BOARD_SIZE - 15,
	};

	const shuffleTiles = () => {
		const shuffledTiles = shuffle(tiles);
		setTiles(shuffledTiles);
	};

	const moveTiles = (tileIndex) => {
		const emptySlot = tiles.indexOf(tiles.length - 1);
		if (canMoveTile(tileIndex, emptySlot)) {
			const movedTiles = moveTile(tiles, tileIndex, emptySlot);
			setTiles(movedTiles);
		}
	};

	const startClick = () => {
		startTimer();
		shuffleTiles();
		setStarted(true);
		setDisabled(false);
	};

	const shuffleClick = () => {
		shuffleTiles();
	};

	const tileClick = (index) => {
		if (pausedGame) {
			return;
		} else {
			moveTiles(index);
		}
	};

	const playerWins = () => {
		isQuizSolved(tiles);
		pauseTimer();
	};

	const startTimer = () => {
		runTimer();
		setStatus(1);
		setInterv(setInterval(runTimer, 10));
	};

	let updatedMs = time.ms,
		updatedS = time.s,
		updatedM = time.m,
		updatedH = time.h;

	const runTimer = () => {
		if (updatedM === 60) {
			updatedH++;
			updatedM = 0;
		}
		if (updatedS === 60) {
			updatedM++;
			updatedS = 0;
		}
		if (updatedMs === 100) {
			updatedS++;
			updatedMs = 0;
		}
		updatedMs++;
		return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
	};

	const pauseTimer = () => {
		clearInterval(interv);
		setStatus(2);
		setDisabled(true);
	};

	const resetTimer = () => {
		clearInterval(interv);
		setStatus(0);
		setTime({ ms: 0, s: 0, m: 0, h: 0 });
		shuffleTiles();
		setStarted(false);
	};

	const resumeGame = () => {
		startTimer();
		setDisabled(false);
	};

	return (
		<>
			<Timer time={time} />
			<ul style={boardStyle} className="board">
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
			{playerWins && started && <Alert alertText="Player wins 🎉" />}
			{pausedGame ? <Alert alertText="PAUSED" /> : ''}
			<div className="buttons">
				{!started ? (
					<button className="start-btn" onClick={() => startClick()}>
						Start game
					</button>
				) : (
					<button
						disabled={disabled}
						className="timer-btn"
						onClick={() => shuffleClick()}
					>
						<ShuffleRoundedIcon />
					</button>
				)}
				<div className="buttons">
					<TimerBtn status={status} pause={pauseTimer} resume={resumeGame} />
					{started ? (
						<button className="timer-btn" onClick={resetTimer}>
							<PowerSettingsNewRoundedIcon />
						</button>
					) : (
						''
					)}
				</div>
			</div>
		</>
	);
}

export default Board;
