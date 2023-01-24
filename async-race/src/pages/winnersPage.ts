import { $, changeColor } from '../assets/utils/helpers';
import api from '../components/api';
import { IWinner, ICar } from '../assets/utils/types';
import store from '../components/store';

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
    // eslint-disable-next-line prettier/prettier
    const winnersArr = (await api.getAllWinners(
      store.winnersPage,
      store.sort,
      store.order,
      this.limit
    )) || winners;

    const allWinners = await api.getAllWinners(store.winnersPage, store.sort, store.order);

    const amount = <HTMLElement>$('.amount-cars');
    amount.textContent = ` ${allWinners.length}`;
    const page = <HTMLElement>$('.content__page-number');
    page.textContent = `Page ${String(store.winnersPage)}`;

    if (!winnersArr) {
      return;
    }

    winnersArr.forEach(async (item: IWinner, index: number) => {
      const car: ICar = await api.getCar(item.id);
      const nameCar = car.name.split(' ').join('-');

      list.innerHTML += `
      <li class="chart__winner">
      <span class="winner__number">${index + 1}</span>
      <svg class="drive__img img-winner" xmlns="http://www.w3.org/2000/svg"
      data-model="${nameCar}" xml:space="preserve" width="800" height="800" viewBox="0 0 511 511">
      <path
        d="M127.5 320.712a7.5 7.5 0 0 0-7.5 7.5c0 9.098-7.402 16.5-16.5 16.5S87 337.31 87 328.212s7.402-16.5 16.5-16.5a7.5 7.5 0 0 0 0-15c-17.369 0-31.5 14.131-31.5 31.5s14.131 31.5 31.5 31.5 31.5-14.131 31.5-31.5a7.5 7.5 0 0 0-7.5-7.5zM439.5 320.712a7.5 7.5 0 0 0-7.5 7.5c0 9.098-7.402 16.5-16.5 16.5s-16.5-7.402-16.5-16.5 7.402-16.5 16.5-16.5a7.5 7.5 0 0 0 0-15c-17.369 0-31.5 14.131-31.5 31.5s14.131 31.5 31.5 31.5 31.5-14.131 31.5-31.5a7.5 7.5 0 0 0-7.5-7.5z" />
      <path
        d="M503.5 288.712h-.5v-6.304c0-13.742-5.964-26.747-16.158-35.733a7.473 7.473 0 0 0-1.185-2.746l-.945-1.361c-8.049-11.607-15.651-22.571-38.194-30.307-18.562-6.369-46.213-10.211-87.702-12.046l-35.478-56.262a9.92 9.92 0 0 0-.181-.273c-5.841-8.424-14.649-18.356-31.06-20.409-11.969-1.499-118.593-13.824-175.893 14.205-29.224 14.294-68.653 46.77-94.618 120.44a49.705 49.705 0 0 0-1.835 4.976l-7.945 25.821H7.5a7.5 7.5 0 0 0-7.5 7.5c0 4.04 3.196 7.324 7.196 7.485l-3.679 11.957c-1.462 4.75-.606 9.769 2.347 13.767 2.953 3.999 7.497 6.292 12.468 6.292h22.126c3.724 31.49 30.567 56 63.042 56s59.318-24.51 63.042-56h185.916c3.724 31.49 30.567 56 63.042 56s59.318-24.51 63.042-56H495.5a7.5 7.5 0 0 0 7.5-7.5v-24.5h.5a7.502 7.502 0 0 0 0-15.002zm-162.826-89.147c-3.646-.103-7.385-.194-11.22-.273l-21.52-43.47c1.97-.347 3.386-.37 3.394-.37.493 0 .974-.051 1.44-.141l27.906 44.254zm-217.879-48.616c43.367-21.212 125.655-18.024 167.44-12.795 4.159.52 7.661 1.73 10.886 3.873-2.374.691-4.927 1.683-7.392 3.111a7.5 7.5 0 0 0-2.962 9.817l21.813 44.063c-3.728-.046-7.429-.085-11.092-.11l-16.925-38.489c-3.312-7.531-10.408-12.838-18.521-13.851-12.504-1.56-37.462-3.808-64.121-1.338-33.152 3.072-58.941 12.369-76.65 27.634-12.094 10.424-22.205 27.213-18.541 39.486-3.905.775-7.706 1.58-11.379 2.421-25.06 5.741-38.941 11.867-46.19 16.003 22.955-46.561 51.529-69.012 73.634-79.825zm1.097 58.33c-1.036-.12-2.531-.419-2.779-1.152-1.272-3.746 3.53-14.919 13.951-23.901 36.563-31.513 108.076-25.398 129.122-22.772 2.902.362 5.449 2.279 6.647 5.004l14.25 32.406c-64.817.094-118.783 3.582-161.191 10.415zM103.5 376.712c-26.743 0-48.5-21.757-48.5-48.5s21.757-48.5 48.5-48.5 48.5 21.757 48.5 48.5-21.757 48.5-48.5 48.5zm312 0c-26.743 0-48.5-21.757-48.5-48.5s21.757-48.5 48.5-48.5c26.728 0 48.474 21.733 48.499 48.455l-.002.045.002.045c-.025 26.722-21.771 48.455-48.499 48.455zm72.5-56h-9.458c-3.724-31.49-30.567-56-63.042-56s-59.318 24.51-63.042 56h-17.143a87.537 87.537 0 0 1 7.224-28.304 7.5 7.5 0 0 0-13.715-6.075 102.44 102.44 0 0 0-8.553 34.379H190.719c-1.131-15.599-5.767-30.779-13.593-44.294a7.501 7.501 0 0 0-12.981 7.517c6.505 11.234 10.426 23.82 11.525 36.777h-9.129c-3.724-31.49-30.567-56-63.042-56s-59.318 24.51-63.042 56H18.332c-.082 0-.252 0-.402-.203a.452.452 0 0 1-.076-.444l5.032-16.353H31.5a7.5 7.5 0 0 0 0-15h-3.999l4.395-14.283a346.423 346.423 0 0 1 3.633-10.953c3.13-7.063 8.493-12.692 15.15-15.749 11.583-5.319 23.971-8.016 36.821-8.016 22.668 0 44.229 8.562 60.711 24.107a7.5 7.5 0 0 0 10.292-10.912c-13.82-13.036-30.694-21.871-48.909-25.829 64.644-12.78 153.526-14.067 217.76-12.827 56.226 1.087 92.335 4.883 113.49 11.931a103.766 103.766 0 0 0-17.345-1.471c-30.173 0-58.776 13.127-78.476 36.016a7.5 7.5 0 0 0 11.369 9.785c16.847-19.574 41.307-30.801 67.107-30.801 18.211 0 35.708 5.524 50.602 15.977a32.676 32.676 0 0 1 13.898 26.72v6.304h-.5a7.5 7.5 0 0 0 0 15h.5v17.001z" />
    </svg>
      <span class="winner__name">${car.name}</span>
      <span class="winner__wins">${item.wins}</span>
      <span class="winner__time">${item.time}</span>
    </li>
    `;

      const iconCar = <SVGSVGElement>$(`[data-model=${nameCar}]`);
      changeColor(iconCar, car.color);
    });
  }

  async pagination(direction: string) {
    const allCarsAmount = await api.getAllWinners(store.winnersPage, store.sort, store.order);
    const lastPage = Math.ceil(+allCarsAmount.length / 10);

    if (
      // eslint-disable-next-line operator-linebreak
      (direction === 'next' && store.winnersPage === lastPage) ||
      (direction === 'prev' && store.winnersPage < 2)
    ) {
      return;
    }

    store.winnersPage = direction === 'next' ? store.winnersPage + 1 : store.winnersPage - 1;

    const cars = await api.getCars(store.winnersPage, 7);
    this.cleanWinners();
    this.renderWinners(cars);
  }

  cleanWinners() {
    const winnersList = <HTMLElement>$('.chart__list');
    winnersList.innerHTML = '';
  }
}

export default Winner;
