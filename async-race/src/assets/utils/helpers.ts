import { brandsCars } from './brands-cars';
import { modelsCars } from './models-cars';

const $ = (selector: string, parent?: Element) => {
  return parent ? parent.querySelector(selector) : document.querySelector(selector);
};

const $All = (selector: string, parent?: Element) => {
  return parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);
};

const mixCars = () => {
  const autoArr: string[] = [];
  let iterations = 100;

  for (let i = 0; i < iterations; i += 1) {
    const randomBrand = brandsCars[Math.floor(Math.random() * brandsCars.length)];
    const randomModel = modelsCars[Math.floor(Math.random() * modelsCars.length)];
    const randomCar = `${randomBrand} ${randomModel}`;
    if (!autoArr.includes(randomCar)) {
      autoArr.push(randomCar);
    } else {
      iterations += 1;
    }
  }
  return autoArr;
};

const randomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const getTranslateX = (transform: string) => transform.split('(')[1];

const addDisabled = (elem: HTMLElement) => {
  if (elem.classList.contains('drive__go')) {
    elem.setAttribute('disabled', 'disabled');
    const nearElem = <HTMLElement>elem.nextElementSibling;
    nearElem.removeAttribute('disabled');
  }
  if (elem.classList.contains('drive__stop')) {
    elem.setAttribute('disabled', 'disabled');
    const nearElem = <HTMLElement>elem.previousElementSibling;
    nearElem.removeAttribute('disabled');
  }
  if (elem.classList.contains('btns__race')) {
    elem.setAttribute('disabled', 'disabled');
    const nearElem = <HTMLElement>elem.nextElementSibling;
    nearElem.setAttribute('disabled', 'disabled');

    const allButtons = $All('.drive__go');
    const nearAllButtons = $All('.drive__stop');
    allButtons.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    nearAllButtons.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
  if (elem.classList.contains('btns__reset')) {
    elem.setAttribute('disabled', 'disabled');
    const nearElem = <HTMLElement>elem.previousElementSibling;
    nearElem.removeAttribute('disabled');

    const allButtons = $All('.drive__stop');
    const nearAllButtons = $All('.drive__go');
    allButtons.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    nearAllButtons.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
};

const convertTime = (time: number) => {
  time /= 1000;
  return +time.toFixed(2);
};

const changeColor = (image: SVGSVGElement, color: string) => {
  image.style.fill = color;
};

export { $, $All, mixCars, randomHexColor, getTranslateX, addDisabled, convertTime, changeColor };
