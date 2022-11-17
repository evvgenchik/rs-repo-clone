import scss from "../styles/style.scss"
import birdsData from './birds'
import { RANDOM, CHOICES, INFO, BUTTONS, changeChoicesHTML, changeInfoHTML, changeRandomHTML, finishGame, highlightQuestion, showInfoHtml, putDefaultRandomHTML, changeCircleColor, resetCircleColor, putButtonDisabled, removeDisabledButton } from "./view"
import { playPauseAudio, changeAllTimeSong, changeTimeTracker, setTimePos, setVolume } from './player'

export let count = 0
export let score = 0
export let scoreStep = 5
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
    playSoundAnswer(e, true)
    changeRandomHTML(rightChoice)
    changeInfoHTML(chosenAnswer)
    changeStepScore(e, 5)
    changeCircleColor(e, 'green')
    removeDisabledButton()
  } else {
    playSoundAnswer(e, false)
    changeStepScore(e, 1)
    changeCircleColor(e, 'red')
    changeInfoHTML(chosenAnswer)
  }
}

const goNextQuestion = () => {
  if (count >= birdsData.length - 1) {
    finishGame()
  } else {
    count += 1
    scoreStep = 5
    getRandomBirdsNames(birdsDataRandom)
    changeChoicesHTML(getRandomBirdsNames())
  }
}

const getRightAnswer = () => {
  rightAnswer = birdsDataRandom[count][Math.floor(Math.random() * birdsDataRandom[count].length)];
}

const playSoundAnswer = (e, answer) => {
  if (e.target.classList.contains('active')) {
    return
  }
  let sound = (answer) ? new Audio('./sounds/right.mp3') : new Audio('./sounds/wrong.mp3');
  sound.play()

  if (answer && RANDOM.play.classList.contains('play')) {
    playPauseAudio(RANDOM)
  }
}

const changeStepScore = (e, number) => {

  if (e.target.classList.contains('active')) {
    return
  }
  if (number == 5) {
    score += scoreStep;
    RANDOM.score.textContent = `Score: ${score}`
  } else {
    scoreStep -= 1
  }
}


const changeLanguage = () => {

}


// export const isHasClass = (elem, nameClass) => {
//   if (elem.classList.contains(nameClass)) {
//     return true
//   } else {
//     return false
//   }
// }

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

BUTTONS.english.addEventListener('click', changeLanguage)

RANDOM.play.addEventListener('click', () => {
  playPauseAudio(RANDOM)

})
INFO.play.addEventListener('click', () => {
  playPauseAudio(INFO)
})

RANDOM.audio.addEventListener('timeupdate', () => changeTimeTracker(event, RANDOM))

INFO.audio.addEventListener('timeupdate', () => changeTimeTracker(event, INFO))

RANDOM.audio.addEventListener('canplaythrough', () => changeAllTimeSong(RANDOM))

INFO.audio.addEventListener('canplaythrough', () => changeAllTimeSong(INFO))

RANDOM.audio.addEventListener('canplaythrough', () => changeAllTimeSong(RANDOM))

RANDOM.input.addEventListener('input', () => setTimePos(event, RANDOM))

INFO.input.addEventListener('input', () => setTimePos(event, INFO))

RANDOM.inputVolume.addEventListener('input', () => setVolume(event, RANDOM))

INFO.inputVolume.addEventListener('input', () => setVolume(event, INFO))