import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import React from 'react'

momentDurationFormatSetup(moment)

export const Timer = ({ timerLabel, handleStartStop, startStopButtonLabel, timeLeft }) => {

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div className='timer'>
            <div className='timer-wrapper'>
                <p id='timer-label'>{timerLabel}</p>
                <p id='time-left'>{formattedTimeLeft}</p>
                <button id='start_stop' onClick={handleStartStop}>{startStopButtonLabel}</button>
            </div>
        </div>
    )
}
