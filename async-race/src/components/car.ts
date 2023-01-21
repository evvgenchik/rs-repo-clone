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

  animationId = 0;

  garage;

  constructor(garage: Garage) {
    this.createBtn = <HTMLButtonElement>$('.create__confirm');
    this.updateBtn = <HTMLButtonElement>$('.create__confirm');
    this.selectBtn = <HTMLButtonElement>$('.create__confirm');
    this.removeBtn = <HTMLButtonElement>$('.create__confirm');
    this.garage = garage;
  }

  eventlitenersMenu() {
    const createBtn = <HTMLButtonElement>$('.create__confirm');
    const updateBtn = <HTMLButtonElement>$('.update__confirm');
    const generateBtn = <HTMLButtonElement>$('.btns__generate');

    createBtn.addEventListener('click', () => {
      this.create();
      this.garage.cleanCars();
      this.garage.renderCars();
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

  eventliteners() {
    const selectBtn = <NodeList>$All('.control__select');
    const removeBtn = <NodeList>$All('.control__remove');
    const aBtns = <NodeList>$All('.drive__go');
    const bBtns = <NodeList>$All('.drive__stop');

    selectBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.select(e));
    });

    removeBtn.forEach((item) => {
      item.addEventListener('click', (e) => this.remove(e));
    });

    aBtns.forEach((item) => {
      item.addEventListener('click', async (e) => {
        const response = await this.drive(e, 'started');
        this.animation(e, false, response);
        this.drive(e, 'drive');
      });
    });

    bBtns.forEach((item) => {
      item.addEventListener('click', (e) => {
        this.drive(e, 'stopped');
        this.animation(e, true);
      });
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

  async drive(e: Event, status: string) {
    const eventBtn = <HTMLElement>e.target;
    const carBlock = <HTMLElement>eventBtn.closest('.item__block');

    const date = await api.drive(carBlock.id, status);
    return date;
  }

  animation(e: Event, stop = false, response = { velocity: 0, distance: 1000 }, translate = 0) {
    const eventBtn = <HTMLElement>e.target;
    const carBlock = <HTMLElement>eventBtn.closest('.item__block');
    const icon = <SVGSVGElement>$('.drive__img', carBlock);
    const duration = response.distance / response.velocity;
    const distance = carBlock.clientWidth - 150;
    let startAnimation = 0;
    // eslint-disable-next-line no-undef
    let measure: FrameRequestCallback;

    if (stop) {
      const currentId = Number(icon.getAttribute('data-animationId'));
      console.log(currentId);
      cancelAnimationFrame(currentId);
      icon.style.transform = '';
      return;
    }

    this.animationId = requestAnimationFrame(
      (measure = (time) => {
        if (!startAnimation) {
          startAnimation = time;
        }

        const progress = (time - startAnimation) / duration;
        translate = progress * distance;

        icon.style.transform = `translate(${translate}px, 35%)`;

        if (progress < 1) {
          this.animationId = requestAnimationFrame(measure);
          icon.setAttribute('data-animationId', String(this.animationId));
        }
      })
    );
  }
}

export default Car;
