import React from 'react'

function TimerBtn(props) {
  return (
    <div className="">
      {(props.status === 1)? 
        <div>
          <button className="timer-btn pause"
            onClick={props.pause}>Pause</button>
        </div> : ""
      }

     {(props.status === 2)? 
        <div>
          <button className="timer-btn resume"
            onClick={props.resume}>Resume</button>
          <button className="timer-btn quit"
            onClick={props.reset}>Quit</button>
        </div> : ""
      }
     
    </div>
  )
}

export default TimerBtn
