import { $, changeColor } from '../assets/utils/helpers';
import api from '../components/api';
import { IWinner } from '../assets/utils/types';
import store from '../components/store';
import { pathsSvg } from '../assets/utils/consts';

class Winner {
  main: HTMLElement;

  page: number;

  limit: number;

  sort: string;

  order: string;

  footer: HTMLElement;

  constructor() {
    this.main = <HTMLElement>$('.main');
    this.footer = <HTMLElement>$('.footer');
    this.page = 1;
    this.limit = 10;
    this.sort = 'time';
    this.order = 'ASC';
  }

  render() {
    this.main.innerHTML = `
    <div class="main__content">
    <h1 class="content__title title">Winners<span class="amount-cars"></span></h1>
    <h2 class="content__page-number page">Page<span class="page-number"></span></h2>
    <div class="content__chart">
      <div class="chart__header">
        <span>Number</span>
        <span>Car</span>
        <span>Name</span>
        <span class="wins-sort">Wins</span>
        <span class="time-sort active">Best time</span>
      </div>
      <ul class="chart__list">
      </ul>
    </div>
  </div>
  `;

    this.footer.innerHTML = `
  <div class="footer__btns">
      <button class="footer__prev button">PREV</button>
      <button class="footer__next button">NEXT</button>
    </div>
  `;

    this.renderWinners();
    this.eventliteners();
  }

  eventliteners() {
    const nextBtn = <HTMLButtonElement>$('.footer__next');
    const prevBtn = <HTMLButtonElement>$('.footer__prev');
    const winsBtn = <HTMLElement>$('.wins-sort');
    const timeBtn = <HTMLButtonElement>$('.time-sort');

    nextBtn.addEventListener('click', () => {
      this.pagination('next');
    });

    prevBtn.addEventListener('click', () => {
      this.pagination('prev');
    });

    winsBtn.addEventListener('click', () => {
      timeBtn.classList.remove('active');
      winsBtn.classList.add('active');
      store.sort = 'wins';
      store.order = store.order === 'ASC' ? 'DESC' : 'ASC';
      this.cleanWinners();
      this.renderWinners();
    });

    timeBtn.addEventListener('click', () => {
      winsBtn.classList.remove('active');
      timeBtn.classList.add('active');
      store.sort = 'time';
      store.order = store.order === 'ASC' ? 'DESC' : 'ASC';
      this.cleanWinners();
      this.renderWinners();
    });
  }

  async renderWinners(winners?: IWinner[]) {
    const list = <HTMLElement>$('.chart__list');
    const winnersArr =
      (await api.getAllWinners(store.winnersPage, store.sort, store.order, this.limit)) || winners;

    const allWinners = (await api.getAllWinners(
      store.winnersPage,
      store.sort,
      store.order
    )) as IWinner[];

    const amount = <HTMLElement>$('.amount-cars');
    amount.textContent = ` ${allWinners.length}`;
    const page = <HTMLElement>$('.content__page-number');
    page.textContent = `Page ${String(store.winnersPage)}`;

    if (!winnersArr) {
      return;
    }

    winnersArr.forEach(async (item: IWinner, index: number) => {
      const car = await api.getCar(item.id);
      if (car) {
        const nameCar = car.name.split(' ').join('-');

        list.innerHTML += `
      <li class="chart__winner">
      <span class="winner__number">${index + 1}</span>
      <svg class="drive__img img-winner" xmlns="http://www.w3.org/2000/svg"
      data-model="${nameCar}" xml:space="preserve" width="800" height="800" viewBox="0 0 511 511">
     ${pathsSvg}
    </svg>
      <span class="winner__name">${car.name}</span>
      <span class="winner__wins">${item.wins}</span>
      <span class="winner__time">${item.time}</span>
    </li>
    `;

        const iconCar = <SVGSVGElement>$(`[data-model="${nameCar}"]`);
        changeColor(iconCar, car.color);
      }
    });
  }

  async pagination(direction: string) {
    const allCarsAmount = await api.getAllWinners(store.winnersPage, store.sort, store.order);

    if (allCarsAmount) {
      const lastPage = Math.ceil(+allCarsAmount.length / 10);

      if (
        (direction === 'next' && store.winnersPage === lastPage) ||
        (direction === 'prev' && store.winnersPage < 2)
      ) {
        return;
      }

      store.winnersPage = direction === 'next' ? store.winnersPage + 1 : store.winnersPage - 1;

      this.cleanWinners();
      this.renderWinners();
    }
  }

  cleanWinners() {
    const winnersList = <HTMLElement>$('.chart__list');
    winnersList.innerHTML = '';
  }
}

export default Winner;
