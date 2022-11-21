import scss from "../styles/results.scss"

const ELEMENTS = {
  text: document.querySelector('.text'),
  button: document.querySelector('.button'),
}

const addHTML = () => {
  let score = localStorage.getItem('result')
  if (score < 30) {
    ELEMENTS.text.textContent = `Поздравляю! Вы прошли игру и набрали:${score} баллов`
  } else {
    ELEMENTS.text.textContent = `Поздравляю! Вы выиграли  и набрали: максимальное количество баллов - ${score}`
  }
}

const goToGame = () => {
  window.location.href = './index.html'
}

ELEMENTS.button.addEventListener('click', goToGame)

document.addEventListener('DOMContentLoaded', addHTML)

