import { useEffect, useState } from 'react'
import Button from './components/Button.jsx'
import settings from './images/settings-white.png'
import sound from './sounds/trim.wav'

function App() {
  const [startValues, setStartValues] = useState(
    {
      focus: '01',
      short: '05',
      long: '10',
      timesToLong: 4,
      autoStart: true
    }
  )
  const [optionValues, setOptionValues] = useState({
    focus: {
      color: 'red',
      time: startValues?.focus,
      next: 'short'
    },
    short: {
      color: 'green',
      time: startValues?.short,
      next: 'focus'
    },
    long: {
      color: 'blue',
      time: startValues?.long,
      next: 'focus'
    }
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [option, setOption] = useState('focus')
  const [defaultColor, setDefaultColor] = useState('red')
  const [buttonText, setButtonText] = useState('Iniciar')
  const [minutes, setMinutes] = useState(startValues[option])
  const [seconds, setSeconds] = useState('00')
  const [currentTimer, setCurrentTimer] = useState(1)

  useEffect(() => {
    document.title = `${optionValues['focus'].time}:00 - Hora de focar!`
  }, [])

  useEffect(() => {
    document.title = `${minutes}:${seconds} - Hora de ${option === 'focus' ? 'focar' : 'dar uma pausa'}!`
  }, [minutes, seconds, option])

  useEffect(() => {
    if (buttonText === 'Iniciar') {
      return
    }

    const pixelsByScreen = window.screen.width <= 460 ? 786 : 1100
    const rect = document.querySelector('#timer-rect')
    const interval = setInterval(() => {
      if (!rect.style.strokeDashoffset) {
        rect.style.strokeDashoffset = pixelsByScreen
      }
      const pixels = pixelsByScreen / (startValues[option] * 60)

      if (seconds === '00') {
        if (minutes === '00') {
          document.querySelector('#sound-player').play()
          clearInterval(interval)
          startStop()
          const rect = document.querySelector('#timer-rect')
          rect.style.strokeDashoffset = pixelsByScreen

          if (option === 'focus') {
            if (currentTimer % startValues.timesToLong === 0) {
              changeOption('long')
            } else {
              changeOption(optionValues[option].next)
            }
          } else {
            setCurrentTimer((previous) => previous += 1)
            changeOption(optionValues[option].next)
          }
          setTimeout(() => {
            if (startValues.autoStart) {
              setButtonText('Parar')
            }
          }, 1000)
          return
        }

        if (minutes >= 11) {
          setMinutes(minute => Number(minute) - 1)
        }

        if (minutes >= 1 && minutes <= 10) {
          setMinutes(minute => `0${minute - 1}`)
        }
        setSeconds(59)
        rect.style.strokeDashoffset = Number(rect.style.strokeDashoffset) - pixels
        return
      }

      if (seconds >= 11) {
        setSeconds((Number(seconds) - 1))
      }

      if (seconds > 0 && seconds <= 10) {
        setSeconds(second => `0${second - 1}`)
      }

      rect.style.strokeDashoffset = Number(rect.style.strokeDashoffset) - pixels
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [buttonText, minutes, seconds])

  function startStop() {
    if (buttonText === 'Iniciar') {
      setButtonText('Parar')
    } else {
      setButtonText('Iniciar')
    }
  }

  const openCloseModal = () => {
    setModalOpen(!modalOpen)
  }

  const changeOption = (opt) => {
    if (opt === option) {
      return false
    }
    setOption(opt)
    setDefaultColor(optionValues[opt].color)
    setMinutes(optionValues[opt].time)
    setSeconds('00')
    setButtonText('Iniciar')
    const rect = document.querySelector('#timer-rect')
    const pixelsByScreen = window.screen.width <= 460 ? 786 : 1100
    rect.style.strokeDashoffset = pixelsByScreen
    document.title = `${optionValues[opt].time}:00 - Hora de ${option === 'focus' ? 'focar!' : 'dar uma pausa!'}!`
  }

  return (
    <div className={`app ${defaultColor}`}>
      <header className="container-limit">
        <button type="button" id="settings" onClick={openCloseModal}>
          <img src={settings} alt="Imagem de um ícone que simboliza as configurações" />
        </button>
      </header>

      <div className="buttons-container">
        <Button
          text="Foco"
          classes={`${option === 'focus' && 'selected'}`}
          onClick={() => changeOption('focus')}
        />
        <Button
          text="Intervalo curto"
          classes={`${option === 'short' && 'selected'}`}
          onClick={() => changeOption('short')}
        />
        <Button
          text="Intervalo longo"
          classes={`${option === 'long' && 'selected'}`}
          onClick={() => changeOption('long')}
        />
      </div>

      <div className="circle">
        <span className="current-count-timer">#{currentTimer}</span>
        <svg>
          <rect id="timer-rect" width="150px" height="150px" rx="100%"></rect>
        </svg>
        <span>{minutes}:{seconds}</span>
      </div>

      <Button
        classes={`btn-start-stop ${defaultColor}`}
        onClick={startStop}
        text={buttonText}
      />

      <audio id="sound-player">
        <source src={sound} type="audio/mp3" />
      </audio>
    </div>
  )
}

export default App
