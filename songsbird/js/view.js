import { birdsDataRandom, count, score, rightAnswer } from "./script"

const ELEMENTS = {
  home: document.querySelector('#home'),
  game: document.querySelector('#game'),
  gallery: document.querySelector('#gallery'),
  en: document.querySelector('.language__english'),
  ru: document.querySelector('.language__russian'),
  categories: document.querySelectorAll('.menu__link'),
}

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
  home: document.querySelector('#homes'),
  game: document.querySelector('#game'),
  gallery: document.querySelector('#gallery'),
  next: document.querySelector('.main__button'),
}

const LANGUAGE = {
  en: document.querySelector('.language__english'),
  ru: document.querySelector('.language__russian')
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

export { RANDOM, CHOICES, INFO, BUTTONS, changeChoicesHTML, changeRandomHTML, changeInfoHTML, highlightQuestion, showInfoHtml, putDefaultRandomHTML, changeCircleColor, resetCircleColor, putButtonDisabled, removeDisabledButton, LANGUAGE, ELEMENTS }