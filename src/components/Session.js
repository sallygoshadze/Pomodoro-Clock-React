import moment from 'moment'
import React from 'react'


export const Session = ({ sessionLength, decrementSession, incrementSession }) => {

    const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes();
    return (
        <div className='container'>
            <div className='session-container'>
                <p id='session-label'>session</p>
                <p id='session-length'>{sessionLengthInMinutes}</p>
                <button id='session-decrement' onClick={decrementSession}>-</button>
                <button id='session-increment' onClick={incrementSession}>+</button>
            </div>
        </div>
    )
}
