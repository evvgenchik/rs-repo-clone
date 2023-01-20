// eslint-disable-next-line object-curly-newline
import { $, $All, mixCars, randomHexColor } from '../assets/utils/helpers';
import Garage from '../pages/garagePage';
import api from './api';

class Car {
  updateBtn: HTMLButtonElement;

  createBtn: HTMLButtonElement;

  selectBtn: HTMLButtonElement;

  removeBtn: HTMLButtonElement;

  currentId = '0';

  garage;

  constructor(garage: Garage) {
    this.createBtn = <HTMLButtonElement>$('.create__confirm');
    this.updateBtn = <HTMLButtonElement>$('.create__confirm');
    this.selectBtn = <HTMLButtonElement>$('.create__confirm');
    this.removeBtn = <HTMLButtonElement>$('.create__confirm');
    this.garage = garage;
  }

  eventliteners() {
    const createBtn = <HTMLButtonElement>$('.create__confirm');
    const updateBtn = <HTMLButtonElement>$('.update__confirm');
    const selectBtn = <NodeList>$All('.control__select');
    const removeBtn = <NodeList>$All('.control__remove');
    const generateBtn = <HTMLButtonElement>$('.btns__generate');

    createBtn.addEventListener('click', () => {
      this.create();
      this.garage.cleanCars();
      this.garage.renderCars();
    });

    selectBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.select(e));
    });

    removeBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.remove(e));
    });

    updateBtn.addEventListener('click', () => {
      this.update();
      this.garage.cleanCars();
      this.garage.renderCars();
    });

    generateBtn.addEventListener('click', () => {
      this.generateCars();
      this.garage.cleanCars();
      this.garage.renderCars();
    });
  }

  create() {
    const modelInput = <HTMLInputElement>$('.input__create.input');
    const colorInput = <HTMLInputElement>$('.btn__create.color');
    api.createCar(modelInput.value, colorInput.value);
  }

  select(e: Event) {
    const eventBtn = <HTMLElement>e.target;
    const carBlock = <HTMLElement>eventBtn.closest('.item__block');
    const name = <string>$('.control__model', carBlock)?.textContent;
    const icon = <SVGSVGElement>$('.drive__img', carBlock);
    const modelInput = <HTMLInputElement>$('.input__update.input');
    const colorInput = <HTMLInputElement>$('.btn__update.color');

    this.currentId = <string>carBlock.id;
    modelInput.value = name;
    colorInput.value = <string>icon.getAttribute('data-color');
  }

  update() {
    const modelInput = <HTMLInputElement>$('.input__update.input');
    const colorInput = <HTMLInputElement>$('.btn__update.color');

    api.updateCar(modelInput.value, colorInput.value, this.currentId);
  }

  remove(e: Event) {
    const eventBtn = <HTMLElement>e.target;
    const carBlock = <HTMLElement>eventBtn.closest('.item__block');

    api.deleteCar(carBlock.id);
    this.garage.cleanCars();
    this.garage.renderCars();
  }

  changeColor(image: SVGSVGElement, color: string) {
    image.style.fill = color;
  }

  generateCars() {
    const arrayAuto = <string[]>mixCars();
    console.log(arrayAuto);
    arrayAuto.forEach((item) => {
      api.createCar(item, randomHexColor());
    });
  }
}

export default Car;
