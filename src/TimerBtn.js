import React from 'react';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

function TimerBtn(props) {
	return (
		<div>
			{props.status === 1 ? (
				<div>
					<button className="timer-btn" onClick={props.pause}>
						<PauseRoundedIcon />
					</button>
				</div>
			) : (
				''
			)}

			{props.status === 2 ? (
				<div>
					<button className="timer-btn" onClick={props.resume}>
						<PlayArrowRoundedIcon />
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default TimerBtn;
