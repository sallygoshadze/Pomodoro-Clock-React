import moment from 'moment'
import React from 'react'


export const Break = ({ breakLength, decrementBreak, incrementBreak }) => {

    const breakLengthInMinutes = moment.duration(breakLength, 's').asMinutes();
    return (
        <div className='container'>
            <div className='break-container'>
                <p id='break-label'>break</p>
                <p id='break-length'>{breakLengthInMinutes}</p>
                <button id='break-decrement' onClick={decrementBreak}>-</button>
                <button id='break-increment' onClick={incrementBreak}>+</button>
            </div>
        </div>
    )
}
