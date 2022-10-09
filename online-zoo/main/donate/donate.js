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


/*..........................BURGER............................*/
const burger = document.querySelector('.burger')

burger.addEventListener('click', addClassBurger)

function addClassBurger() {
	const headerBlock = document.querySelector('.header__block2');
	const cross = document.querySelector('.header__cross');
	const header = document.querySelector('.header');
	const fon = document.querySelector('.fon')
	headerBlock.classList.toggle('active')
	burger.classList.toggle('active')
	header.classList.toggle('active')
	fon.classList.toggle('active')
	cross.addEventListener('click', addClassBurger)
	fon.addEventListener('click', addClassBurger)
}




/*......................AMOUNT.............................*/


const PICK = {
	sumStripNumbers: document.querySelectorAll('.sum-strip__number'),
	inputPickFiel: document.querySelector('.input-pick__fiel'),
	defaultNumber: document.querySelector('#hundred'),

}
let currentNumber

PICK.sumStripNumbers.forEach(item => item.addEventListener('click', addClassAmount));

function addClassAmount(e) {
	if (currentNumber) {
		currentNumber.classList.remove('active')
	} else if (PICK.defaultNumber.classList.contains('active')) {
		PICK.defaultNumber.classList.remove('active')
	}
	currentNumber = (e.target) ? e.target : e;
	let sum = parseInt((currentNumber.textContent).match(/\d+/))
	currentNumber.classList.add('active');
	addSumInInput(sum)
}
function addSumInInput(sum) {
	PICK.inputPickFiel.value = sum;
}

PICK.inputPickFiel.addEventListener('input', function () {
	this.value = this.value.slice(0, 4)
	fromInputToString()
});
function fromInputToString() {
	const arrNumbers = Array.from(PICK.sumStripNumbers).map(item => parseInt((item.textContent).match(/\d+/)));
	for (let numberBlock of PICK.sumStripNumbers) {
		if (numberBlock.classList.contains('active')) {
			numberBlock.classList.remove('active')
		}
	}
	for (let number of arrNumbers) {
		if (PICK.inputPickFiel.value == number) {
			for (let numberBlock of PICK.sumStripNumbers) {
				if ('$' + number == numberBlock.textContent) {
					numberBlock.classList.add('active')
				}
			}
		}

	}
}
function defaultValueInput() {
	PICK.defaultNumber.classList.add('active')
	PICK.inputPickFiel.value = parseInt((PICK.defaultNumber.textContent).match(/\d+/));
}
defaultValueInput()


