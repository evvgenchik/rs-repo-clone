/* eslint-disable prettier/prettier */
import {
  $,
  $All,
  mixCars,
  randomHexColor,
  getTranslateX,
  convertTime,
  addDisabled
} from '../assets/utils/helpers';
import Garage from '../pages/garagePage';
import api from './api';
import Winner from './winner';

class Car {
  updateBtn: HTMLButtonElement;

  createBtn: HTMLButtonElement;

  selectBtn: HTMLButtonElement;

  removeBtn: HTMLButtonElement;

  currentId = '0';

  animationId = 0;

  garage;

  winner: Winner;

  constructor(garage: Garage) {
    this.createBtn = <HTMLButtonElement>$('.create__confirm');
    this.updateBtn = <HTMLButtonElement>$('.create__confirm');
    this.selectBtn = <HTMLButtonElement>$('.create__confirm');
    this.removeBtn = <HTMLButtonElement>$('.create__confirm');
    this.garage = garage;

    this.winner = new Winner();
  }

  eventlitenersMenu() {
    const createBtn = <HTMLButtonElement>$('.create__confirm');
    const updateBtn = <HTMLButtonElement>$('.update__confirm');
    const generateBtn = <HTMLButtonElement>$('.btns__generate');
    const raceBtn = <HTMLButtonElement>$('.btns__race');
    const resetBtn = <HTMLButtonElement>$('.btns__reset');

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

    raceBtn.addEventListener('click', (e) => {
      this.race(e);
    });

    resetBtn.addEventListener('click', (e) => {
      const allCarsIcons = <NodeList>$All('.drive__img');

      allCarsIcons.forEach(async (item) => {
        const carIcon = <SVGSVGElement>item;
        const carBlock = <HTMLElement>carIcon.closest('.item__block');

        await this.drive(e, 'stopped', carBlock);
        this.animation(e, true, false, carIcon);
      });
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
        this.animation(e, false, false, null, response);

        const responseDrive = await this.drive(e, 'drive');
        if (responseDrive === 500) {
          this.animation(e, true, true);
          this.drive(e, 'stopped');
        }
      });
    });

    bBtns.forEach((item) => {
      item.addEventListener('click', async (e) => {
        await this.drive(e, 'stopped');
        this.animation(e, true);
      });
    });
  }

  create() {
    const modelInput = <HTMLInputElement>$('.input__create.input');
    const colorInput = <HTMLInputElement>$('.btn__create.color');

    api.createCar(modelInput.value, colorInput.value);
    modelInput.value = '';
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
    modelInput.value = '';
  }

  remove(e: Event) {
    const eventBtn = <HTMLElement>e.target;
    const carBlock = <HTMLElement>eventBtn.closest('.item__block');

    api.deleteCar(carBlock.id);
    api.deleteWinner(carBlock.id);

    this.garage.cleanCars();
    this.garage.renderCars();
  }

  generateCars() {
    const arrayAuto = <string[]>mixCars();
    arrayAuto.forEach((item) => {
      api.createCar(item, randomHexColor());
    });
  }

  async drive(e: Event, status: string, carBlock?: HTMLElement) {
    const eventBtn = <HTMLElement>e.target;

    addDisabled(eventBtn);

    carBlock = carBlock || <HTMLElement>eventBtn.closest('.item__block');

    const date = await api.drive(carBlock.id, status);
    return date;
  }

  animation(
    e: Event,
    stop = false,
    broke = false,
    icon: null | SVGSVGElement = null,
    response = { velocity: 0, distance: 1000 }
  ) {
    const eventBtn = <HTMLElement>e.target;
    const carBlock = <HTMLElement>eventBtn.closest('.item__block') || icon?.closest('.item__block');
    icon = icon || <SVGSVGElement>$('.drive__img', carBlock);
    const duration = response.distance / response.velocity;
    const distance = carBlock.clientWidth - 150;
    let startAnimation = 0;
    // eslint-disable-next-line no-undef
    let measure: FrameRequestCallback;

    if (icon !== null) {
      if (stop) {
        const currentId = Number(icon.getAttribute('data-animationId'));
        cancelAnimationFrame(currentId);
        icon.style.transform = broke ? getTranslateX(icon.style.transform) : '';
        return;
      }

      this.animationId = requestAnimationFrame(
        (measure = (time) => {
          if (!startAnimation) {
            startAnimation = time;
          }

          const progress = (time - startAnimation) / duration;
          const translate = progress * distance;

          if (icon !== null) {
            icon.style.transform = `translate(${translate}px, 35%)`;

            if (progress < 1) {
              this.animationId = requestAnimationFrame(measure);
              icon.setAttribute('data-animationId', String(this.animationId));
            }
          }
        })
      );
    }
  }

  race(e: Event) {
    const allCarsIcons = <NodeList>$All('.drive__img');
    let firstWin = true;

    allCarsIcons.forEach(async (item) => {
      const carIcon = <SVGSVGElement>item;
      const modelCar = <string>carIcon.getAttribute('data-model');
      const carBlock = <HTMLElement>carIcon.closest('.item__block');
      const idCar = <number>Number(carBlock.getAttribute('id'));

      const response = await this.drive(e, 'started', carBlock);
      const time = response.distance / response.velocity;
      const winTime = convertTime(time);
      this.animation(e, false, false, carIcon, response);

      const responseDrive = await this.drive(e, 'drive', carBlock);

      if (responseDrive === 500) {
        console.log(carIcon);
        this.animation(e, true, true, carIcon);
        this.drive(e, 'stopped', carBlock);
        return;
      }

      if (responseDrive.success && firstWin) {
        firstWin = false;

        this.createWinner(modelCar, winTime, idCar);
      }

      const eventBtn = <HTMLButtonElement>e.target;
      const nearElem = <HTMLElement>eventBtn.nextElementSibling;
      nearElem.removeAttribute('disabled');
    });
  }

  createWinner(modelCar: string, winTime: number, id: number) {
    this.winner.addWinner(id, winTime);
    this.showWinner(modelCar, winTime);
  }

  showWinner(model: string, winTime: number) {
    const modalWinner = document.createElement('div');
    modalWinner.classList.add('modal-block');
    const textWinner = document.createElement('h2');
    textWinner.classList.add('modal-text');
    textWinner.textContent = `${model} won this race (${winTime}s.)`;

    modalWinner.append(textWinner);
    document.body.append(modalWinner);

    setTimeout(() => {
      modalWinner.remove();
    }, 2000);
  }
}
export default Car;
