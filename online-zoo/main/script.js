'use strict'

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
	headerBlock.classList.add('active')
	burger.classList.add('active')
	header.classList.add('active')
	fon.classList.add('active')
	cross.addEventListener('click', () => removeActiveBurger(headerBlock, burger, header, fon))
	fon.addEventListener('click', () => removeActiveBurger(headerBlock, burger, header, fon))
}

function removeActiveBurger(headerBlock, burger, header, fon) {
	headerBlock.classList.remove('active')
	burger.classList.remove('active')
	header.classList.remove('active')
	fon.classList.remove('active')
}




/*.................CARUSEL........................*/
const containerPets = document.querySelector('.pets__container')
const blockPets = (document.querySelectorAll('.block-pets'))
const petsButtonNext = document.querySelector('.pets__button_next')
const petsButtonPrev = document.querySelector('.pets__button_prev')
const buttonsPets = document.querySelector('.pets').querySelectorAll('button')


buttonsPets.forEach((item) => item.addEventListener('click', createNewSlide))

function createNewSlide(e) {
	let button = e.target;
	let listPets = document.querySelector('.list-pets')
	let widthPetsList = listPets.offsetWidth;
	let nextSlide = document.createElement('div')

	if (button.textContent == '→') {
		containerPets.append(nextSlide)
		containerPets.firstElementChild.style.left = 0;
		containerPets.firstElementChild.style.right = '';
		nextSlide.classList.add('pets__list', 'list-pets')
		nextSlide.style.left = 20 + widthPetsList + 'rem'
		changeNewSlide(nextSlide, listPets, button)
	}
	if (button.textContent == '←') {
		containerPets.prepend(nextSlide)
		containerPets.lastElementChild.style.right = 0;
		containerPets.lastElementChild.style.left = '';
		nextSlide.classList.add('pets__list', 'list-pets')
		nextSlide.style.right = 20 + widthPetsList + 'rem'

		changeNewSlide(nextSlide, listPets, button)
	}

}

function changeNewSlide(newSlide, listPets, button) {

	let clonBlock = Array.from((listPets.cloneNode(true)).querySelectorAll('.block-pets'))
	for (let i = clonBlock.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[clonBlock[i], clonBlock[j]] = [clonBlock[j], clonBlock[i]];
	}
	addIconsInSlide(newSlide, clonBlock, listPets, button);
}


function addIconsInSlide(newSlide, clonBlock, listPets, button) {

	for (let block of clonBlock) {
		let b = block
		newSlide.append(b)
	}
	goNewSlide(listPets, button);
}

function goNewSlide(listPets, button) {
	buttonsPets.forEach((item) => item.removeEventListener('click', createNewSlide))
	let allListsPets = document.querySelectorAll('.list-pets')
	let widthPetsList = listPets.offsetWidth;
	if (button.textContent == '→') {
		allListsPets[0].style.left = -widthPetsList + 'rem';
		allListsPets[1].style.left = 0;
	}
	if (button.textContent == '←') {
		allListsPets[0].style.right = 0;

		allListsPets[1].style.right = -widthPetsList + 'rem';
	}
	setTimeout(() => deletePreviousSlide(button), 2000)
}
function deletePreviousSlide(button) {
	if (button.textContent == '→') {
		console.log('next');
		containerPets.firstElementChild.remove()
	}
	if (button.textContent == '←') {
		console.log('prev');
		containerPets.lastElementChild.remove()
	}
	buttonsPets.forEach((item) => item.addEventListener('click', createNewSlide))
}





/*.........CARUSEL TESTIMONIALS.................*/

const TESTIMONIALS = {
	input: document.querySelector('.strip__input'),
	commentsBlock: document.querySelector('.comments-testimonials'),
	commentColumn: document.querySelector('.testimonials-column'),
}

TESTIMONIALS.input.addEventListener('input', rangeValue)

// function rangeValue() {
// 	let offset = 0;
// 	let gap = parseInt(window.getComputedStyle(TESTIMONIALS.commentsBlock).gap);
// 	let step = TESTIMONIALS.input.value;
// 	const columnWidth = document.querySelector('.testimonials-column').offsetWidth;
// 	offset += columnWidth * step;
// 	TESTIMONIALS.commentsBlock.style.right = gap +offset + 'rem'
// }

function rangeValue() {
	let offset = 0;
	let step = TESTIMONIALS.input.value;
	let gap = parseInt(window.getComputedStyle(TESTIMONIALS.commentsBlock).gap);
	if (step == 0 || step > 11) {
		TESTIMONIALS.commentsBlock.style.right = '0';
		console.log('this');
		return
	}

	console.log('nothis');
	const columnWidth = document.querySelector('.testimonials-column').offsetWidth + gap;
	offset += (columnWidth * step);
	console.log(offset);
	TESTIMONIALS.commentsBlock.style.right = offset + 'rem'
}




/*.....................POPUP.............................*/


const popupColumns = document.querySelectorAll('.testimonials-column')

function addClassToPopup() { popupColumns.forEach((item) => item.addEventListener('click', addClassPopup)) }
addClassToPopup()

function addClassPopup(e) {
	const commentsTestimonials = document.querySelector('.comments-testimonials')
	const comment = e.target.closest('.testimonials-column');
	const cross = comment.querySelector('.testimonials__cross');
	const fon = document.querySelector('.fon')
	comment.classList.add('active')
	commentsTestimonials.classList.add('active')
	fon.classList.add('active')
	cross.classList.add('active')
	cross.addEventListener('click', () => removeActivePopup(comment, commentsTestimonials, fon, cross))
	fon.addEventListener('click', () => removeActivePopup(comment, commentsTestimonials, fon, cross));
	popupColumns.forEach((item) => item.removeEventListener('click', addClassPopup))
}

function removeActivePopup(comment, commentsTestimonials, fon, cross) {
	cross.classList.remove('active')

	comment.classList.remove('active')
	commentsTestimonials.classList.remove('active')
	fon.classList.remove('active')
	console.log('br');
	setTimeout(addClassToPopup, 1)

}