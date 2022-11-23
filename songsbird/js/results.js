import scss from "../styles/results.scss"

const ELEMENTS = {
  text: document.querySelector('.text'),
  button: document.querySelector('.button'),
}

const addHTML = () => {
  let language = localStorage.getItem('language')
  let score = localStorage.getItem('result')

  if (language === 'EN') { }
  if (score < 30) {
    ELEMENTS.text.textContent = (language === 'EN') ? `Congratulations! You completed the game and scored: ${score} points` : `Поздравляю! Вы прошли игру и набрали:${score} баллов`
  } else {
    ELEMENTS.text.textContent = (language === 'EN') ?
      `Congratulations! You won and scored: the maximum number of points is ${score}` : `Поздравляю! Вы выиграли  и набрали: максимальное количество баллов - ${score}`
  }
}

const goToGame = () => {
  window.location.href = './index.html'
}

ELEMENTS.button.addEventListener('click', goToGame)

document.addEventListener('DOMContentLoaded', addHTML)

