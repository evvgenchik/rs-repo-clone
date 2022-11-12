
const RANDOM = {
  icon: document.querySelector('.icon-random__img'),
  audio: document.querySelector('.audio-player__sound'),
  name: document.querySelector('.player-random__name'),
  score: document.querySelector('.player-random__score')
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
  text: document.querySelector('.info__description'),
}

const BUTTONS = {
  game: document.querySelector('#game'),
  gallery: document.querySelector('#gallery'),
  results: document.querySelector('#results')
}





export { RANDOM, CHOICES, INFO }