import scss from "../styles/gallery.scss"
import birdsData from "./birds.js"
import birdsDataEN from './birdsEN'
import { playPauseAudio, changeAllTimeSong, changeTimeTracker, setTimePos, setVolume } from "./player.js"



const addHTMLfiles = (birdsData) => {

  let list = document.querySelector('.gallery__list')

  for (let i = 0; i < birdsData.length; i++) {

    if (Array.isArray(birdsData[i])) {
      addHTMLfiles(birdsData[i])
    } else {
      let item = document.createElement('div')
      item.classList.add('gallery__item')
      list.append(item)

      let icon = document.createElement('img')
      icon.classList.add('gallery__icon')
      icon.src = birdsData[i].image
      item.append(icon)

      addPlayer(birdsData[i].audio, item)

      let name = document.createElement('div')
      name.classList.add('gallery__name')
      name.textContent = birdsData[i].name
      item.append(name)

      let description = document.createElement('div')
      description.classList.add('gallery__description')
      description.textContent = birdsData[i].description
      item.append(description)
      addListeners(item)
    }
  }
}

const addPlayer = (audioLink, block) => {
  const template = document.querySelector('template')
  const audio = template.content.querySelector('.audio-player__sound')
  audio.src = audioLink
  block.append(template.content.cloneNode(true))
}

const addListeners = (item) => {
  const PLAYER = {
    audio: item.querySelector('.audio-player__sound'),
    play: item.querySelector('.button-player-controles__img'),
    input: item.querySelector('input'),
    timePassed: item.querySelector('.player-time__passed'),
    timeAll: item.querySelector('.player-time__all'),
    inputVolume: item.querySelector('.track-player__volume_input'),
    iconVolume: item.querySelector('.track-player__volume_img'),
  }

  PLAYER.play.addEventListener('click', () => {
    playPauseAudio(PLAYER)
  })

  PLAYER.audio.addEventListener('timeupdate', () => changeTimeTracker(event, PLAYER))

  PLAYER.audio.addEventListener('canplaythrough', () => changeAllTimeSong(PLAYER))

  PLAYER.input.addEventListener('input', () => setTimePos(event, PLAYER))

  PLAYER.inputVolume.addEventListener('input', () => setVolume(event, PLAYER))
}
const checkLocalStorageGallery = () => {
  const language = localStorage.getItem('language')
  let title = document.querySelector('.gallery__title')
  if (language === 'EN') {
    title.textContent = 'Gallery'
    addHTMLfiles(birdsDataEN)
  } else {
    title.textContent = 'Галерея'
    addHTMLfiles(birdsData)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkLocalStorageGallery()
})
