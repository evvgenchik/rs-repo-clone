'use strict'
const choice1 = document.querySelector('.input-pick__choice1');
const choice2 = document.querySelector('.input-pick__choice2');

choice1.addEventListener('click', function () {
	if (choice2.hasAttribute('checked')) {
		choice2.removeAttribute('checked')
		console.log(choice2)
	}
	choice1.setAttribute('checked', '')
})
choice2.addEventListener('click', () => {
	if (choice1.hasAttribute('checked')) {
		choice1.removeAttribute('checked')
		console.log(choice1);
	}
	choice2.setAttribute('checked', '')
})

const buttonForSubscribe = document.querySelector('.block3-footer__button');
const inputForSubscribe = document.querySelector('.block3-footer__input');


inputForSubscribe.addEventListener('focus', changeButtonSubscribe)
buttonForSubscribe.addEventListener('click', changeButtonSubscribe)

function changeButtonSubscribe() {
	if (!inputForSubscribe.valid) {
		buttonForSubscribe.setAttribute('data-mistake', '')
		console.log(!inputForSubscribe.valid)
	}
}

