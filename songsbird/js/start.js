import scss from '../styles/start.scss'
import { TEXT } from './language'

const ELEMENTS = {
  home: document.querySelector('#home'),
  game: document.querySelector('#game'),
  gallery: document.querySelector('#gallery'),
  en: document.querySelector('.language__english'),
  ru: document.querySelector('.language__russian'),
  title: document.querySelector('.title'),
  subTitle: document.querySelector('p'),
  buttonStart: document.querySelector('.button-start'),
  rsSchool: document.querySelector('.footer__logo'),
  gitHub: document.querySelector('.footer__github'),
}






const changeLanguage = (lang) => {
  for (let key in TEXT) {
    if (lang === 'EN') {
      ELEMENTS.home.textContent = TEXT.Starting.EN.home
      ELEMENTS.game.textContent = TEXT.Starting.EN.game
      ELEMENTS.gallery.textContent = TEXT.Starting.EN.gallery
      ELEMENTS.title.textContent = TEXT.Starting.EN.title
      ELEMENTS.subTitle.textContent = TEXT.Starting.EN.subTitle
      ELEMENTS.buttonStart.textContent = TEXT.Starting.EN.buttonStart
    }
    if (lang === 'RU') {
      ELEMENTS.home.textContent = TEXT.Starting.RU.home
      ELEMENTS.game.textContent = TEXT.Starting.RU.game
      ELEMENTS.gallery.textContent = TEXT.Starting.RU.gallery
      ELEMENTS.title.textContent = TEXT.Starting.RU.title
      ELEMENTS.subTitle.textContent = TEXT.Starting.RU.subTitle
      ELEMENTS.buttonStart.textContent = TEXT.Starting.RU.buttonStart
    }
  }
}

ELEMENTS.en.addEventListener('click', () => {
  localStorage.setItem('language', 'EN')
  changeLanguage('EN')
})
ELEMENTS.ru.addEventListener('click', () => {
  localStorage.setItem('language', 'RU')
  changeLanguage('RU')
})

document.addEventListener('DOMContentLoaded', () => {
  changeLanguage(localStorage.getItem('language'))
})

