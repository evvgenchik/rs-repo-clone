import { $, changeColor } from '../assets/utils/helpers';
import Car from '../components/car';
import api from '../components/api';
import { ICar } from '../assets/utils/types';
import store from '../components/store';
import { pathsSvg } from '../assets/utils/consts';

class Garage {
  main: HTMLElement;

  car: Car;

  page: number;

  footer: HTMLElement;

  constructor() {
    this.main = <HTMLElement>$('.main');
    this.footer = <HTMLElement>$('.footer');
    this.car = new Car(this);
    this.page = 1;
  }

  eventliteners() {
    const nextBtn = <HTMLButtonElement>$('.footer__next');
    const prevBtn = <HTMLButtonElement>$('.footer__prev');

    nextBtn.addEventListener('click', () => {
      this.pagination('next');
    });

    prevBtn.addEventListener('click', () => {
      this.pagination('prev');
    });
  }

  render() {
    this.main.innerHTML = `
<div class="main__menu">
<div class="menu__create">
  <input type="text" name="inputNameCreate" class="input__create input">
  <input type='color' name="inputColorCreate" value="#e66465" class="btn__create color input"></ш>
  <button class="create__confirm button">CREATE</button>
</div>
<div class="menu__update">
  <input type="text" name="inputNameUpdate" class="input__update input">
  <input type='color' name="inputColorUpdate" value="#e66465" class="btn__update color input"></ш>
  <button class="update__confirm button ">UPDATE</button>
</div>
<div class="menu__btns">
  <button class="btns__race button">RACE</button>
  <button disabled class="btns__reset button">RESET</button>
  <button class="btns__generate button">GENERATE CARS</button>
</div>
</div>
<div class="main__content">
<h1 class="content__title title">Garage<span class="amount-cars"></span></h1>
<h2 class="content__page-number page">Page 
</div>
<div class="content__items">
</div>
  `;

    this.footer.innerHTML = `
  <div class="footer__btns">
      <button class="footer__prev button">PREV</button>
      <button class="footer__next button">NEXT</button>
    </div>
  `;
    this.renderCars();
    this.car.eventlitenersMenu();
    this.eventliteners();
  }

  async renderCars() {
    const carsBlock = <HTMLElement>$('.content__items');
    const allCars = await api.getCars();
    const carsArr = await api.getCars(store.carsPage, 7);

    if (allCars && carsArr) {
      const amount = <HTMLElement>$('.amount-cars');
      amount.textContent = ` ${allCars.length || '0'}`;
      const page = <HTMLElement>$('.content__page-number');
      page.textContent = `Page ${String(store.carsPage)}`;

      const inputNameCreate = <HTMLButtonElement>$('.input__create');
      inputNameCreate.value = store.inputNameCreate;
      const inputNameUpdate = <HTMLButtonElement>$('.input__update');
      inputNameUpdate.value = store.inputNameUpdate;
      const inputColorUpdate = <HTMLButtonElement>$('.btn__update,color');
      inputColorUpdate.value = store.inputColorUpdate || '#e66465';
      const inputColorCreate = <HTMLButtonElement>$('.btn__create,color');
      inputColorCreate.value = store.inputColorCreate || '#e66465';

      if (!carsArr) {
        return;
      }

      carsArr.forEach((item: ICar) => {
        const nameCar = item.name.split(' ').join('-');

        carsBlock.innerHTML += `
    <div class="item__block" id = "${item.id}">
 <div class ="item__container">
      <div class="items__car">
        <div class="car__control">
          <button class="control__select button">SELECT</button>
          <button class="control__remove button">REMOVE</button>
          <p class="control__model">${item.name}</p>
        </div>
        <div class="car__drive">
          <div class="drive__btns">
            <button class="drive__go">A</button>
            <button class="drive__stop" disabled>B</button>
          </div>
          <div class="drive__icon">
          <svg  data-color="${item.color}" data-model="${nameCar}" class="drive__img" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="800" height="800" viewBox="0 0 511 511">
         ${pathsSvg}
        </svg>
          </div>
        </div>
      </div>
    <div class="item__flag">
      <img src="./img/flag.png" alt="flag" class="flag__img">
    </div>
 </div>
  </div>
    `;

        const carBlock = <HTMLElement>document.getElementById(item.id.toString());
        const iconCar = <SVGSVGElement>$(`[data-model="${nameCar}"]`, carBlock);
        changeColor(iconCar, item.color);
      });

      this.car.eventliteners();
    }
  }

  cleanCars() {
    const carsBlock = <HTMLElement>$('.content__items');

    if (carsBlock) {
      carsBlock.innerHTML = '';
    }
  }

  async pagination(direction: string) {
    const allCarsAmount = await api.getCars();
    if (allCarsAmount) {
      const lastPage = Math.ceil(+allCarsAmount.length / 7);

      if (
        (direction === 'next' && store.carsPage === lastPage) ||
        (direction === 'prev' && store.carsPage < 2)
      ) {
        return;
      }

      store.carsPage = direction === 'next' ? store.carsPage + 1 : store.carsPage - 1;

      this.cleanCars();
      this.renderCars();
    }
  }
}

export default Garage;
