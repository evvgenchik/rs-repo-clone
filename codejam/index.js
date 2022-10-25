



const ELEMENTS = {
	CONTAINER: addToHtml('div', 'container', document.body),
	MENU: addToHtml('div', 'menu', document.querySelector('.container')),
	SUBTITLE: addToHtml('div', 'subtitle', document.querySelector('.container')),
	GAME: addToHtml('div', 'game', document.querySelector('.container')),
	CELL: addToHtml('div', 'game__cell', document.querySelector('.game'), 1, 16,),
	SIZES: addToHtml('div', 'sizes', document.querySelector('.container')),
	RESULTS: addToHtml('div', 'results', document.querySelector('.container')),
	CROSS: addToHtml('div', 'results__cross', document.querySelector('.results'), 'X'),
	WIN: addToHtml('div', 'win', document.querySelector('.container')),
	CROSSwIN: addToHtml('div', 'win__cross', document.querySelector('.win'), 'X'),
	TEXTwIN: addToHtml('p', 'win__text', document.querySelector('.win')),
}

const RESULTS = {
	ITEM: addToHtml('div', 'results__item', document.querySelector('.results'), null, 10)
}

const BUTTONS = {
	SHUFFLE: addToHtml('button', 'menu__button', document.querySelector('.menu'), 'SHUFFLE'),
	SOUND: addToHtml('button', 'menu__button', document.querySelector('.menu'), 'SOUND'),
	SAVE: addToHtml('button', 'menu__button', document.querySelector('.menu'), 'SAVE'),
	RESULTS: addToHtml('button', 'menu__button', document.querySelector('.menu'), 'RESULTS'),
}

const INPUTS = {
	x3: addToHtml('button', 'sizes_number', document.querySelector('.sizes'), '3x3'),
	x4: addToHtml('button', 'sizes_number', document.querySelector('.sizes'), '4x4'),
	x5: addToHtml('button', 'sizes_number', document.querySelector('.sizes'), '5x5'),
	x6: addToHtml('button', 'sizes_number', document.querySelector('.sizes'), '6x6'),
	x7: addToHtml('button', 'sizes_number', document.querySelector('.sizes'), '7x7'),
	x8: addToHtml('button', 'sizes_number', document.querySelector('.sizes'), '8x8'),
}
let moves = -1;

const SUBTITLE = {
	MOVES: addToHtml('div', 'subtitle__moves', document.querySelector('.subtitle'), `Moves:`),
	movesNumber: addToHtml('div', 'subtitle__moves_number', document.querySelector('.subtitle'), `${moves}`),
	TIME: addToHtml('div', 'subtitle__time', document.querySelector('.subtitle'), `Time:`),
	timeNumber: addToHtml('div', 'subtitle__time_number', document.querySelector('.subtitle'), `00:00`),
}


let arrCells = document.querySelectorAll('.game__cell');
let hiddenCell = arrCells[arrCells.length - 1];
let matrix
let audio = new Audio('https://zornet.ru/ABVUN/Anisa/oops.mp3');


document.addEventListener('DOMContentLoaded', () => {

	if (localStorage.getItem('previousGame') || localStorage.getItem('previousGame')) {
		getFromLocalStorage()
	} else {
		timer(0, 0)
		createMatrix(arrCells, 4)
		mixing()
		localStorage.setItem('number', '4')
		changeMoves()

	}
})



let interval
function timer(minutes, seconds) {
	let min = minutes;
	let sec = seconds
	interval = setInterval(() => {

		if (sec >= 60) {
			sec = -1;
			min += 1
		}
		sec += 1
		if (sec < 10 && min < 10) {
			SUBTITLE.timeNumber.textContent = `0${min}:0${sec}`;
		}
		if (sec > 10 && min < 10) {
			SUBTITLE.timeNumber.textContent = `0${min}:${sec}`;
		}
		if (sec < 10 && min > 10) {
			SUBTITLE.timeNumber.textContent = `${min}:0${sec}`;
		}
		if (sec > 10 && min > 10) {
			SUBTITLE.timeNumber.textContent = `${min}:${sec}`;
		}
		addTimeToLocalStorage()
	}, 1000)
}

function addToHtml(tag, clss, container, content, number) {

	if (number) {
		let element = document.createElement(tag)

		for (let i = 1; i <= number; i++) {
			let element = document.createElement(tag)
			element.classList.add(clss)
			container.append(element);
			if (content) {
				element.textContent = content
				content += 1
			}
		}

		return element
	} else {
		let element = document.createElement(tag)
		element.classList.add(clss)
		container.append(element);

		if (content) {
			element.textContent = content
		}

		return element
	}
}



/***********position*********************************/



function createMatrix(arr, number) {

	let newMatrix = [];
	let x = 0;
	let y = 0;

	changeSizeCells(arr, +number)



	for (let i = 0; i < number; i++) {
		newMatrix.push([])
	}

	for (let i = 0; i < arr.length; i++) {
		if (x >= number) {
			y += 1;
			x = 0;
		}

		newMatrix[y][x] = arr[i];
		x++
	}
	startPosition(newMatrix)
	hiddenCell.style.display = 'none';
	matrix = newMatrix
	return matrix
}





function startPosition(matrix) {
	for (let y = 0; y < matrix.length; y++) {

		for (let x = 0; x < matrix[y].length; x++) {
			matrix[y][x].style.transform = `translate(${x * 100}%, ${y * 100}%)`;
		}
	}

}




/*..........CHANGE POSITION*******************************/

ELEMENTS.GAME.addEventListener('click', changePosition)



function changePosition(e) {
	let visibleCell = e.target;
	let visibleCellCoords = findCoords(visibleCell);
	let hiddenCellCoords = findCoords(hiddenCell);

	if (isValid(visibleCellCoords, hiddenCellCoords)) {
		let visibleCellForChange = matrix[visibleCellCoords.y][visibleCellCoords.x];

		matrix[visibleCellCoords.y][visibleCellCoords.x] = matrix[hiddenCellCoords.y][hiddenCellCoords.x];

		matrix[hiddenCellCoords.y][hiddenCellCoords.x] = visibleCellForChange;

		if (isWon(matrix)) {
			showWin()
		}
		startPosition(matrix)
		changeMoves()
		addToLocalStorage(matrix)
		addMovesToLocalStorage()
		addAudio()
	}
}

function isWon(matrix) {
	let arrFromMatrix = matrix.flat().map(item => +item.textContent);
	let arr = new Array(arrFromMatrix.length).fill(0).map((index, i) => index + i + 1);

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] != arrFromMatrix[i]) {
			return false
		}
	}
	return true
}

function showWin() {
	let blockWin = document.querySelector('.win');
	blockWin.classList.add('show');

	let textForWin = blockWin.querySelector('p');
	textForWin.innerHTML = '';

	document.querySelector('.win__cross').addEventListener('click', () => {
		document.querySelector('.win').classList.remove('show')
	})

	let time = document.querySelector('.subtitle__time_number').textContent;

	textForWin.insertAdjacentHTML('afterbegin', `
	Ура! <br>
	Вы решили головоломку  <br>
	за ${time} <br>
	и ${moves} ходов!<br>`)

	resultsToLocalStorage(time, moves)
}


function findCoords(cell) {
	for (let y = 0; y < matrix.length; y++) {

		for (let x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] === cell) {
				return { x, y }
			}
		}
	}
}

function isValid(visibleCellCoords, hiddenCellCoords) {
	try {
		if (((Math.abs(hiddenCellCoords.x - visibleCellCoords.x) === 1) || (Math.abs(visibleCellCoords.y - hiddenCellCoords.y) === 1)) && ((visibleCellCoords.x === hiddenCellCoords.x) || (visibleCellCoords.y === hiddenCellCoords.y))) {

			return true
		} else {
			return false
		}
	} catch (er) {
		console.log(er);
	}
}

function changeMoves() {
	moves += 1
	SUBTITLE.movesNumber.textContent = moves;
}

BUTTONS.SOUND.addEventListener('click', () => {
	if (audio) {
		audio = null
		return
	} else {
		audio = new Audio('http://zornet.ru/ABVUN/Anisa/oops.mp3');
	}
})


function addAudio() {
	if (audio) {
		audio.play()
	}
}


/**********************Shuffle***********************/





BUTTONS.SHUFFLE.addEventListener('click', mixing)

function mixing(number) {
	let maxShuffle = 200;

	let swaps = setInterval(() => {
		if (maxShuffle < 0) {
			clearInterval(swaps)
		}

		let hiddenCellCoords = findCoords(hiddenCell);
		let visibleCellCoords = findValidCoords(hiddenCellCoords);


		let visibleCellForChange = matrix[visibleCellCoords.y][visibleCellCoords.x];

		matrix[visibleCellCoords.y][visibleCellCoords.x] = matrix[hiddenCellCoords.y][hiddenCellCoords.x];

		matrix[hiddenCellCoords.y][hiddenCellCoords.x] = visibleCellForChange;

		startPosition(matrix)
		maxShuffle -= 1
	}, 0.1)
}


function findValidCoords(hiddenCellCoords) {
	let arr = [];

	for (let y = 0; y < matrix.length; y++) {

		for (let x = 0; x < matrix[y].length; x++) {
			if (isValid({ x, y }, hiddenCellCoords)) {
				arr.push({ x, y })
			}
		}
	}
	let randElem = Math.floor(Math.random() * arr.length)
	return arr[randElem]
}

/*****************************ADD TO LOCALSTORAGE****************/



function addToLocalStorage(matrix) {
	let arrFromMatrix = (matrix.flat()).map((item) => item.textContent)

	localStorage.setItem('previousGame', arrFromMatrix);
}
function addMovesToLocalStorage() {
	localStorage.setItem('moves', moves);
}
function addTimeToLocalStorage() {
	let time = (document.querySelector('.subtitle__time_number')).textContent
	localStorage.setItem('time', time);
}


function getFromLocalStorage() {
	let number = localStorage.getItem('number');


	changeSize(number)



	let matrixFromLocalStorage = (localStorage.getItem('previousGame')).split(',');
	let arr = matrixFromLocalStorage.map((item) => {
		for (let divHtml of arrCells) {
			if (divHtml.textContent == item) {
				return divHtml
			}
		}
	})
	createMatrix(arr, number)


	moves = localStorage.getItem('moves') - 1
	changeMoves()

	let time = localStorage.getItem('time').split(':');

	timer(Number(time[0]), Number(time[1]))


	return
}



function resultsToLocalStorage(time, moves) {
	if (localStorage.getItem('results')) {
		let arrToLocalStorage = [];
		let actualResults = Array.from([time, moves]);

		let resultsFromLocalStorage = localStorage.getItem('results');

		arrToLocalStorage.push(resultsFromLocalStorage);
		arrToLocalStorage.push(((actualResults)))
		localStorage.setItem('results', ([arrToLocalStorage]))

		return
	}
	localStorage.setItem('results', ([time, moves]));
}



/*******************************CHANGE SIZE*******************/

INPUTS.x3.addEventListener('click', () => {
	clearLocalStorage()
	moves = -1
	changeMoves()
	changeSize(3)
	mixing()
	clearInterval(interval)
	timer(0, -1)
})
INPUTS.x4.addEventListener('click', () => {
	clearLocalStorage();
	moves = -1
	changeMoves()
	changeSize(4)
	mixing()
	clearInterval(interval)
	timer(0, -1)

})
INPUTS.x5.addEventListener('click', () => {
	clearLocalStorage()
	moves = -1
	changeMoves()
	changeSize(5)
	mixing()
	clearInterval(interval)
	timer(0, -1)

})
INPUTS.x6.addEventListener('click', () => {
	clearLocalStorage()
	moves = -1
	changeMoves()
	changeSize(6)
	mixing()
	clearInterval(interval)
	timer(0, -1)

})
INPUTS.x7.addEventListener('click', () => {
	clearLocalStorage()
	moves = -1
	changeMoves()
	changeSize(7)
	mixing()
	clearInterval(interval)
	timer(0, -1)

})
INPUTS.x8.addEventListener('click', () => {
	clearLocalStorage()
	moves = -1
	changeMoves()
	changeSize(8)
	mixing()
	clearInterval(interval)
	timer(0, -1)

})

function clearLocalStorage() {
	if (localStorage.getItem('results')) {
		let results = localStorage.getItem('results');
		localStorage.clear();
		localStorage.setItem('results', results)
		return
	}
	localStorage.clear();

}

function changeSize(number) {

	document.querySelector('.game').innerHTML = "";

	addToHtml('div', 'game__cell', document.querySelector('.game'), 1, number * number);

	arrCells = document.querySelectorAll('.game__cell');

	localStorage.setItem('number', number);

	changeSizeCells(arrCells, number)

	hiddenCell = arrCells[arrCells.length - 1]
	hiddenCell.style.display = 'none'

	createMatrix(arrCells, number)
}


/**********HELPERS***************************/

function changeSizeCells(arrCells, number) {
	if (number === 3) {
		for (let i = 0; i < arrCells.length; i++) {
			arrCells[i].style.width = '33.3%'
			arrCells[i].style.height = '33.3%'
		}
	}
	if (number === 4) {
		for (let i = 0; i < arrCells.length; i++) {
			arrCells[i].style.width = '25%'
			arrCells[i].style.height = '25%'
		}
	}
	if (number === 5) {
		for (let i = 0; i < arrCells.length; i++) {
			arrCells[i].style.width = '20%'
			arrCells[i].style.height = '20%'
		}
	}
	if (number === 6) {
		for (let i = 0; i < arrCells.length; i++) {
			arrCells[i].style.width = '16.6%';
			arrCells[i].style.height = '16.6%';
			arrCells[i].style.fontSize = '40rem';
		}
	}
	if (number === 7) {
		for (let i = 0; i < arrCells.length; i++) {
			arrCells[i].style.width = '14.28%'
			arrCells[i].style.height = '14.28%'
			arrCells[i].style.fontSize = '35rem';

		}
	}
	if (number === 8) {
		for (let i = 0; i < arrCells.length; i++) {
			arrCells[i].style.width = '12.5%'
			arrCells[i].style.height = '12.5%'
			arrCells[i].style.fontSize = '30rem';

		}
	}

}




/********************RESULTS*****************/


BUTTONS.RESULTS.addEventListener('click', () => {
	document.querySelector('.results').classList.add('show');
	document.querySelector('.results__cross').addEventListener('click', () => {
		document.querySelector('.results').classList.remove('show')
	})

	getResultsFromLocalStorage()
});


function getResultsFromLocalStorage() {
	if (localStorage.getItem('results')) {
		let arrResults = localStorage.getItem('results');
		let arr = arrResults.split(',');

		let arrForSort = []
		let i = 0;
		while (i < arr.length) {
			let newArr = []

			newArr.push(arr[i])
			newArr.push(arr[i + 1])
			arrForSort.push(newArr)
			i += 2
		}
		addResultFromStorageToHtml(arrForSort.sort((a, b) => a[1] - b[1]));
	}
	return
}




function addResultFromStorageToHtml(arr) {
	try {

		let resultsItems = document.querySelectorAll('.results__item');

		for (let i = 0; i < resultsItems.length; i++) {
			resultsItems[i].textContent = `Move: ${arr[i][1]},         Time: ${arr[i][0]}`
		}
	} catch (er) {
		console.log(er);
	}

}



/*****************CREATE HTML********************** */

// const container = document.createElement("div");
// const gameContainer = document.createElement("div");
// const Cells = createCellArr();
// const menu = document.createElement('div')
// const Shuffle = createButtons('Shuffle and start');
// const Stop = createButtons('Stop');
// const Save = createButtons('Save');
// const Results = createButtons('Results');


// function createButtons(name) {
// 	let button = document.createElement('button');
// 	button.classList.add('menu__button');
// 	button.innerHTML = name;
// 	button.setAttribute('data-name', name);

// 	menu.append(button)
// 	return button
// }

// function createCellArr() {
// 	let arr = [];
// 	for (let i = 1; i <= 16; i++) {
// 		const Cell = document.createElement("div");
// 		Cell.classList.add('game__cell');
// 		Cell.innerText = i;
// 		Cell.id = i;
// 		gameContainer.append(Cell)
// 		arr.push(Cell)
// 	}
// 	return arr
// }



// function addHtml() {
// 	container.classList.add('container');
// 	gameContainer.classList.add('game');
// 	menu.classList.add('menu')
// 	document.body.append(container);
// 	container.append(menu)
// 	container.append(gameContainer);

// };
// addHtml();


// /*****************POSITION************************************ */


// let matrix = getMatrix(Cells.map(item => Number(item.textContent)));

// Cells[Cells.length - 1].style.display = 'none';

// addPosition(matrix)





// /************************HELPERS*********************** */


// function getMatrix(arr) {
// 	matrix = [[], [], [], []];
// 	let x = 0;
// 	let y = 0;
// 	for (let i = 0; i < arr.length; i++) {
// 		if (x >= 4) {
// 			y++;
// 			x = 0;
// 		}
// 		matrix[y][x] = arr[i]
// 		x++
// 	}
// 	return matrix
// };


// function addPosition(matrix) {
// 	for (let y = 0; y < matrix.length; y++) {
// 		for (let x = 0; x < matrix[y].length; x++) {
// 			let value = matrix[y][x];
// 			let cell = Cells[value - 1]
// 			addTransform(cell, x, y)
// 		}
// 	}
// }


// function addTransform(cell, x, y) {
// 	let space = 100;

// 	cell.style.transform = `translate(${ x * space} %, ${ y * space} %)`;
// }


// /*******************CHANGE CLICK*************************/

// gameContainer.addEventListener('click', chengePosition);

// function chengePosition(event) {
// 	const hiddenButton = Number((Cells[Cells.length - 1]).textContent);
// 	const button = event.target;
// 	const buttonNumber = Number(button.textContent);
// 	const buttonCoors = findCoors(buttonNumber);
// 	const hiddenButtonCoors = findCoors(hiddenButton);
// 	const isValid = isValidSwap(buttonCoors, hiddenButtonCoors);
// 	console.log();

// 	if (isValid) {
// 		swapCells(buttonCoors, hiddenButtonCoors)
// 		addPosition(matrix)

// 	}


// }

// function findCoors(number) {
// 	for (let y = 0; y < matrix.length; y++) {

// 		for (let x = 0; x < matrix[y].length; x++) {
// 			if (number === matrix[y][x]) {

// 				return { x, y }
// 			}
// 		}
// 	}
// 	return null
// }


// function isValidSwap(coorsVisible, coorsHidden) {
// 	const differX = Math.abs(coorsVisible.x - coorsHidden.x);
// 	const differY = Math.abs(coorsVisible.y - coorsHidden.y);

// 	return ((differX === 1 || differY === 1) && (coorsVisible.x === coorsHidden.x || coorsVisible.y === coorsHidden.y))
// }

// function swapCells(coorsVisible, coorsHidden) {
// 	const coorsVisibleNumber = matrix[coorsVisible.y][coorsVisible.x];
// 	matrix[coorsVisible.y][coorsVisible.x] = matrix[coorsHidden.y][coorsHidden.x];
// 	matrix[coorsHidden.y][coorsHidden.x] = coorsVisibleNumber;


// 	// if (isWon()) {
// 	// 	addWonClass()
// 	// }
// }

// // const winFlatArr = new Array(16).fill(0).map((item, i) => i + 1)

// // function isWon() {
// // 	const flatMatrix = matrix.flat();

// // 	for (let i = 0; i < winFlatArr.length; i++) {
// // 		if (winFlatArr[i] !== flatMatrix[i]) {
// // 			return false;
// // 		}
// // 	}
// // 	return true;
// // };


// /***********************mixing********************/

// function addWonClass() {
// 	setTimeout(() => {
// 		container.classList.add('won')

// 		setTimeout(() => {
// 			container.classList.remove('won')

// 		}, 2000)
// 	}, 300)
// }


// const maxShuffle = 100;
// let timer;


// Shuffle.addEventListener('click', () => {
// 	mixing()
// 	addPosition(matrix)

// 	clearInterval(timer);

// 	let shuffleCount = 0;

// 	timer = setInterval(() => {
// 		mixing();
// 		addPosition(matrix)

// 		shuffleCount += 1

// 		if (shuffleCount >= maxShuffle) {
// 			shuffleCount = 0;
// 			clearInterval(timer);
// 		}
// 	}, 10)
// });


// let blockCoords = null;

// function mixing() {
// 	const hiddenButton = Number((Cells[Cells.length - 1]).textContent);
// 	const hiddenButtonCoors = findCoors(hiddenButton);
// 	const validCoords = findValidCoords(hiddenButtonCoors, blockCoords)

// 	const finalCoords = validCoords[Math.floor(Math.random() * validCoords.length)];

// 	swapCells(hiddenButtonCoors, finalCoords);
// 	blockCoords = hiddenButtonCoors;
// }

// function findValidCoords(hiddenButtonCoors, blockCoords) {
// 	const validsCoords = [];

// 	for (let y = 0; y < matrix.length; y++) {

// 		for (let x = 0; x < matrix[y].length; x++) {
// 			if (isValidSwap({ x, y }, hiddenButtonCoors))

// 				if (!blockCoords || !(
// 					blockCoords.x === x && blockCoords.y === y
// 				)) {
// 					validsCoords.push({ x, y })
// 				}
// 		}
// 	}

// 	return validsCoords;
// }