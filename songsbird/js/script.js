import scss from "../styles/style.scss"
import birdsData from './birds'
import { RANDOM, CHOICES, INFO, BUTTONS, changeChoicesHTML, changeInfoHTML, changeRandomHTML, finishGame, highlightQuestion, showInfoHtml, putDefaultRandomHTML, changeCircleColor, resetCircleColor, putButtonDisabled, removeDisabledButton, playPauseAudio, changeAllTimeSong, changeTimeTracker, setTimePos, setVolume } from "./view"

export let count = 0
export let score = 0
export let birdsDataRandom
export let rightAnswer

function getNamesFromArray(birdsData) {
  let birdsNames = []
  birdsData.map(item => {
    if (item.name) {
      birdsNames.push(item.name)
    } else {
      getNamesFromArray(item)
    }
  })
  return birdsNames
}

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const getRandomBirdsNames = () => {
  let birdsNamesRandom = shuffle(getNamesFromArray(birdsDataRandom[count]))
  return birdsNamesRandom
}

const isRightAnswer = (e) => {
  let chosenAnswer = e.target.lastElementChild.textContent;
  let rightChoice = rightAnswer

  if (chosenAnswer === rightChoice.name) {
    changeRandomHTML(rightChoice)
    changeInfoHTML(chosenAnswer)
    changeScores()
    changeCircleColor(e, 'green')
    removeDisabledButton()
  } else {
    changeCircleColor(e, 'red')
    changeInfoHTML(chosenAnswer)
  }
}

const goNextQuestion = () => {
  if (count >= birdsData.length - 1) {
    finishGame()
  } else {
    count += 1
    getRandomBirdsNames(birdsDataRandom)
    changeChoicesHTML(getRandomBirdsNames())
  }
}

const changeScores = () => {
  score += 5;
  RANDOM.score.textContent = `Score: ${score}`
}

const getRightAnswer = () => {
  rightAnswer = birdsDataRandom[count][Math.floor(Math.random() * birdsDataRandom[count].length)];
}

export const convertTime = (time) => {
  let minutes = Math.floor(time / 60)
  let seconds = time % 60

  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

document.addEventListener('DOMContentLoaded', () => {
  birdsDataRandom = shuffle(birdsData);
  getRandomBirdsNames(birdsDataRandom)
  changeChoicesHTML(getRandomBirdsNames())
  highlightQuestion()
  showInfoHtml()
  getRightAnswer()
  putDefaultRandomHTML()
})

BUTTONS.next.addEventListener('click', () => {
  showInfoHtml()
  goNextQuestion()
  highlightQuestion()
  resetCircleColor()
  getRightAnswer()
  putDefaultRandomHTML()
  putButtonDisabled()
})

CHOICES.list.addEventListener('click', (e) => {
  isRightAnswer(e)
  showInfoHtml(true)
})

RANDOM.play.addEventListener('click', playPauseAudio)

RANDOM.audio.addEventListener('timeupdate', changeTimeTracker)
RANDOM.audio.addEventListener('canplaythrough', changeAllTimeSong)

RANDOM.input.addEventListener('input', setTimePos)
RANDOM.inputVolume.addEventListener('input', setVolume)