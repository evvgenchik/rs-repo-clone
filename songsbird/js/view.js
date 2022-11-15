import { birdsDataRandom, count, score, rightAnswer, shuffle, convertTime, isHasClass } from "./script"

const RANDOM = {
  icon: document.querySelector('.icon-random__img'),
  audio: document.querySelector('.audio-player__sound'),
  play: document.querySelector('.button-player-controles__img'),
  input: document.querySelector('input'),
  timePassed: document.querySelector('.player-time__passed'),
  timeAll: document.querySelector('.player-time__all'),
  name: document.querySelector('.player-random__name'),
  score: document.querySelector('.player-random__score'),
  inputVolume: document.querySelector('.track-player__volume_input'),
  iconVolume: document.querySelector('.track-player__volume_img')
}

const CHOICES = {
  list: document.querySelector('.choices__list'),
  items: document.querySelectorAll('.choices__item'),
  texts: document.querySelectorAll('.choices__text')
}

const INFO = {
  icon: document.querySelector('.info__img'),
  name: document.querySelector('.info__name'),
  species: document.querySelector('.info__species'),
  audio: document.querySelector('#choices-audio'),
  play: document.querySelector('.info__wrapper').querySelector('.button-player-controles__img'),
  input: document.querySelector('.info__wrapper').querySelector('input'),
  timePassed: document.querySelector('.info__wrapper').querySelector('.player-time__passed'),
  timeAll: document.querySelector('.info__wrapper').querySelector('.player-time__all'),
  text: document.querySelector('.info__description'),
  defolt: document.querySelector('.info__defolt'),
  wrapper: document.querySelector('.info__wrapper'),
  inputVolume: document.querySelector('.info__wrapper').querySelector('.track-player__volume_input'),
  iconVolume: document.querySelector('.info__wrapper').querySelector('.track-player__volume_img')
}

const BUTTONS = {
  game: document.querySelector('#game'),
  gallery: document.querySelector('#gallery'),
  results: document.querySelector('#results'),
  next: document.querySelector('.main__button')
}



const changeChoicesHTML = (birdsNamesRandom) => {
  for (let i = 0; i < birdsNamesRandom.length; i++) {
    CHOICES.texts[i].textContent = birdsNamesRandom[i]

    if (CHOICES.items[i].classList.contains('active')) {
      CHOICES.items[i].classList.remove('active')
    }
  }
}


const changeInfoHTML = (birdName) => {
  let birdObj = birdsDataRandom[count].find(item => item.name === birdName);

  INFO.icon.src = birdObj.image;
  INFO.name.textContent = birdObj.name;
  INFO.species.textContent = birdObj.species;
  INFO.audio.src = birdObj.audio;
  INFO.text.textContent = birdObj.description;
}

const changeRandomHTML = (birdObj) => {
  RANDOM.icon.src = birdObj.image;
  RANDOM.name.textContent = birdObj.name;
}



const finishGame = () => {
  const winWindow = document.createElement('div');
  document.querySelector('main').style.display = 'none'
  winWindow.classList.add('win')
  document.body.append(winWindow)

  if (score < 30) {
    winWindow.textContent = `Поздравляю! Вы прошли игру и набрали:
  ${score} баллов`
    const button = document.createElement('button')
    button.classList.add('win__button')
    winWindow.append(button)
    button.textContent = `Попробовать сыграть еще раз!`
  } else {
    winWindow.textContent = `Поздравляю! Вы выиграли  и набрали:
      максимальное количество баллов - ${score}`
  }
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

const showInfoHtml = (status) => {
  if (status) {
    INFO.wrapper.style.display = 'block'
    INFO.defolt.style.display = 'none'
  } else {
    INFO.wrapper.style.display = 'none'
    INFO.defolt.style.display = 'block'
  }
  if (INFO.play.classList.contains('play')) {
    playPauseAudio(INFO)
  }
}

const putDefaultRandomHTML = () => {
  RANDOM.icon.src = './img/defolt.jpg';
  RANDOM.name.textContent = '******';
  RANDOM.audio.src = rightAnswer.audio;
  RANDOM.play.src = './img/play.png'
  if (RANDOM.play.classList.contains('play')) {
    playPauseAudio(RANDOM)
  }
}

const changeCircleColor = (e, color) => {
  let circle = e.target.firstElementChild;
  e.target.classList.add('active')

  if (circle.classList.contains('choices__button')) {
    circle.style.backgroundColor = color
  }
}

const resetCircleColor = () => {
  for (let choice of CHOICES.items) {
    choice.firstElementChild.style.backgroundColor = ''
  }
}

const putButtonDisabled = () => {
  BUTTONS.next.disabled = true;
  BUTTONS.next.style.backgroundColor = 'rgb(254, 252, 234)'
}

const removeDisabledButton = () => {
  BUTTONS.next.disabled = false;
  BUTTONS.next.style.backgroundColor = '#A15849'
}

const playPauseAudio = (block) => {
  if (!block.play.classList.contains('play')) {
    block.play.classList.add('play');
    block.play.src = './img/stop.png'
    block.audio.play()
  } else {
    block.play.classList.remove('play')
    block.play.src = './img/play.png'
    block.audio.pause()
  }
}



const changeTimeTracker = (e, block) => {
  let currentTime = Math.floor(e.target.currentTime)
  block.input.max = e.target.duration;
  block.input.value = currentTime;
  block.timePassed.textContent = convertTime(currentTime)
}

const setTimePos = (e, block) => {
  block.audio.currentTime = e.target.value
}

const changeAllTimeSong = (block) => {
  block.timeAll.textContent = convertTime(Math.floor(RANDOM.audio.duration))
}

const setVolume = (e, block) => {
  block.audio.volume = e.target.value
  block.iconVolume.src = (e.target.value === '0') ? './img/volumeOff.png' : './img/volumeOn.png'
}

export { RANDOM, CHOICES, INFO, BUTTONS, changeChoicesHTML, changeRandomHTML, changeInfoHTML, finishGame, highlightQuestion, showInfoHtml, putDefaultRandomHTML, changeCircleColor, resetCircleColor, putButtonDisabled, removeDisabledButton, playPauseAudio, changeAllTimeSong, changeTimeTracker, setTimePos, setVolume }