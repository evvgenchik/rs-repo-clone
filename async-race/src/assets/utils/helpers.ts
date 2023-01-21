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

const getTranslateX = (transform: string) => Number(transform.split('(')[1]);

// eslint-disable-next-line prettier/prettier
export {
  $, $All, mixCars, randomHexColor, getTranslateX
};
