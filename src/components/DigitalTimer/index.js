import {useState, useEffect} from 'react'
import './index.css'

export default function DigitalTimer() {
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [timeStatus, setTimeStatus] = useState('Paused')
  const [playIconBtn, setPlayIconBtn] = useState(
    'https://assets.ccbp.in/frontend/react-js/play-icon-img.png ',
  )
  const [changeAltText, setChangeAltText] = useState('play icon')
  const [playBtnText, setPlayBtnText] = useState('Start')
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [changeIconBtn, setChangeIcon] = useState(false)

  const changeIcon = () => {
    setChangeIcon(!changeIconBtn)

    if (changeIconBtn === true) {
      setPlayIconBtn(
        'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
      )
      setChangeAltText('pause icon')
      setTimeStatus('Running')
      setPlayBtnText('Pause')
      setSeconds(59)
      setIsTimeRunning(true)
    }
    if (changeIconBtn === false) {
      setPlayIconBtn(
        'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
      )
      setChangeAltText('play icon')
      setTimeStatus('Paused')
      setPlayBtnText('Start')
      setIsTimeRunning(false)
    }
  }

  useEffect(() => {
    let interval = null
    if (minutes === 0 && seconds === 0) {
      alert('Time Has Finished')
    } else {
      interval =
        isTimeRunning &&
        setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1)
          } else if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval)
            } else {
              setMinutes(minutes - 1)
              setSeconds(59)
            }
          }
        }, 1000)
    }
    return () => clearInterval(interval)
  }, [minutes, seconds])

  const setTimer = () => {
    setMinutes(25)
    setSeconds(0)
  }

  const incrementCount = () => {
    setMinutes(minutes + 1)
  }

  const decrementCount = () => {
    if (minutes === 25) {
      setMinutes(parseInt(25))
    }
    if (minutes > 25) {
      setMinutes(minutes - 1)
    }
  }

  return (
    <div className="app-container">
      <div className="heading-container">
        <h1 className="heading">Digital Timer</h1>
      </div>
      <div className="making-flex">
        <div className="timer-container">
          <div className="timer">
            <p className="time">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>
            <p className="running-not">{timeStatus}</p>
          </div>
        </div>
        <div className="buttons-timer-limit-container">
          <div className="start-Reset-buttons">
            <button type="button" onClick={changeIcon}>
              <img src={playIconBtn} className="play" alt={changeAltText} />
            </button>
            <h1 className="start" type="button">
              {playBtnText}
            </h1>

            <button type="button" onClick={setTimer}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                className="pause"
                alt="reset icon"
              />
            </button>
            <h1 className="resetBtn" type="button">
              Reset
            </h1>
          </div>
          <div className="increment-decrement-setter">
            <div className="set-timer-limit">
              <p className="set-timer-limit">Set Timer limit</p>
            </div>
            <div className="minutes-buttons">
              <button
                className="decrement-button"
                type="button"
                onClick={decrementCount}
              >
                -
              </button>
              <button className="number-button" type="button">
                {minutes}
              </button>
              <button
                className="increment-button"
                type="button"
                onClick={incrementCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
