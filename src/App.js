import React, { useState, useEffect, useRef } from 'react'
import { Break } from './components/Break'
import { Session } from './components/Session'
import { Timer } from './components/Timer'

function App() {
  const audioElement = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [sessionType, setSessionType] = useState('Session'); //'Session' or 'Break'
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setbreakLength] = useState(300);
  const [timeLeft, setTimeLeft] = useState(sessionLength);


  //change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  //listen to timeLeft changes
  //change session to break or break to session
  useEffect(() => {
    //if timeLeft is zero
    if (timeLeft === 0) {
      //play the audio
      audioElement.current.play();
      if (sessionType === 'Session') {
        setSessionType('Break');
        setTimeLeft(breakLength);
      } else if (sessionType === 'Break') {
        setSessionType('Session');
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, sessionType, sessionLength, timeLeft]);

  const decrementBreak = () => {
    const newBreak = breakLength - 60;

    if (newBreak > 0) {
      setbreakLength(newBreak);
    }
  }

  const incrementBreak = () => {
    const newBreakLength = breakLength + 60
    if (newBreakLength <= 60 * 60) {
      setbreakLength(newBreakLength)
    }
  }

  const decrementSession = () => {
    const newSession = sessionLength - 60;
    if (newSession > 0) {
      setSessionLength(newSession);
    }
  }

  const incrementSession = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(newSessionLength)
    }
  }

  const isStarted = intervalId !== null;
  const handleStartStop = () => {
    if (isStarted) {
      //if we are in started mode:
      //we want to stop the timer
      //clearInterval
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      //if we are in stopped mode:
      //decrement timeLeft by one every second
      //to do this we'll use setInterval
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
      }, 1000);
      setIntervalId(newIntervalId);
    }
  }

  const handleReset = () => {
    //reset audio
    audioElement.current.load();
    //clear the timeout interval
    clearInterval(intervalId);
    //set the intervalId null
    setIntervalId(null);
    //set the sessionType to 'Session'
    setSessionType('Session')
    //reset the session length to 25 minutes
    setSessionLength(60 * 25);
    //reset the break length to 5 minutes
    setbreakLength(60 * 5);
    //reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 25)
  }

  return (
    <div className='app'>
      <h1 className='title'>25 + 5 Clock</h1>
      <Break
        breakLength={breakLength}
        decrementBreak={decrementBreak}
        incrementBreak={incrementBreak}
      />
      <Timer
        timerLabel={sessionType}
        handleStartStop={handleStartStop}
        startStopButtonLabel={isStarted ? 'stop' : 'start'}
        timeLeft={timeLeft}
      />
      <Session
        sessionLength={sessionLength}
        decrementSession={decrementSession}
        incrementSession={incrementSession}
      />
      <button id='reset' onClick={handleReset}>reset</button>
      <audio id='beep' ref={audioElement}>
        <source src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' type='audio/mpeg' />
      </audio>
    </div>
  );
}

export default App;
