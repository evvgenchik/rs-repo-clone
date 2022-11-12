import scss from "../styles/style.scss"
import birdsData from './birds'
import { RANDOM, CHOICES, INFO } from "./view"


let count = 0
let score = 0
let birdsDataRandom
let birdsNamesRandom

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


const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}



document.addEventListener('DOMContentLoaded', () => {
  birdsDataRandom = shuffle(birdsData);
  getRandomBirdsNames(birdsDataRandom)
  changeChoicesHTML(birdsNamesRandom)
  changeInfoHTML(birdsDataRandom)
  highlightQuestion()
})


const getRandomBirdsNames = (birdsDataRandom) => {
  birdsNamesRandom = shuffle(getNamesFromArray(birdsDataRandom[count]))
}

const changeChoicesHTML = (birdsNamesRandom) => {
  for (let i = 0; i < birdsNamesRandom.length; i++) {
    CHOICES.texts[i].textContent = birdsNamesRandom[i]
  }
}

const changeInfoHTML = (birdsDataRandom) => {
  let birdObj = birdsDataRandom[count][Math.floor(Math.random() * birdsDataRandom[count].length)];

  RANDOM.icon.src = birdObj.image;
  RANDOM.audio.src = birdObj.audio;
  RANDOM.name.textContent = birdObj.name;

  INFO.icon.src = birdObj.image;
  INFO.name.textContent = birdObj.name;
  INFO.species.textContent = birdObj.species;
  INFO.audio.src = birdObj.audio;
  INFO.text.textContent = birdObj.description;
}


CHOICES.list.addEventListener('click', (e) => {
  isRightAnswer(e)
  highlightQuestion()
})

const isRightAnswer = (e) => {
  let chosenAnswer = e.target.lastElementChild.textContent;
  let rightAnswer = document.querySelector('.info__name').textContent
  if (chosenAnswer === rightAnswer) {
    goNextQuestion()
  }

  return false
}

const goNextQuestion = () => {
  if (count >= birdsData.length - 1) {
    score += 5
    finishGame()
  } else {
    count += 1
    changeScores()
    getRandomBirdsNames(birdsDataRandom)
    changeChoicesHTML(birdsNamesRandom)
    changeInfoHTML(birdsDataRandom)
  }
}

const changeScores = () => {
  score += 5;
  RANDOM.score.textContent = `Score: ${score}`
}

const finishGame = () => {
  const winWindow = document.createElement('div');
  document.querySelector('main').style.display = 'none'
  winWindow.classList.add('win')
  winWindow.textContent = `Поздравляю! Вы выиграли и набрали:
  ${score} баллов`
  document.body.append(winWindow)
}

const highlightQuestion = () => {

  let questions = document.querySelectorAll('.menu__link');

  questions[count].classList.add('active')

  if (questions[count - 1]) {
    if (questions[count - 1].classList.contains('active')) {
      questions[count - 1].classList.remove('active')
    }
  }
}

const putDefoltItems = () => {
  RANDOM.icon
}