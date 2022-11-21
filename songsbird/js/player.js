const playPauseAudio = (block) => {
  if (!block.play.classList.contains('play')) {
    block.play.classList.add('play');
    block.play.src = '../img/stop.png'
    block.audio.play()
  } else {
    block.play.classList.remove('play')
    block.play.src = '../img/play.png'
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
  block.timeAll.textContent = convertTime(Math.floor(block.audio.duration))
}

const setVolume = (e, block) => {
  block.audio.volume = e.target.value
  block.iconVolume.src = (e.target.value === '0') ? '../img/volumeOff.png' : '../img/volumeOn.png'
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

export { playPauseAudio, changeAllTimeSong, changeTimeTracker, setTimePos, setVolume }