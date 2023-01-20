import { $ } from '../assets/utils/helpers';

class Winner {
  main: HTMLElement;

  constructor() {
    this.main = <HTMLElement>$('.main');
  }

  render() {
    this.main.innerHTML = `
    <div class="main__content">
    <h1 class="content__title title">Winners<span class="amount-cars">(3)</span></h1>
    <h2 class="content__page-numbe page">Page<span class="page-number">#1</span></h2>
    <div class="content__chart">
      <div class="chart__header">
        <span>Number</span>
        <span>Car</span>
        <span>Name</span>
        <span>Wins</span>
        <span>Best time</span>
      </div>
      <ul class="chart__list">
        <li class="chart__winner">
          <span class="winner__number">1</span>
          <span><img src="./img/car.svg" class="winner__img"></img></span>
          <span class="winner__name">Tesla</span>
          <span class="winner__wins">2</span>
          <span class="winner__time">12</span>
        </li>
      </ul>
    </div>
  </div>
  `;
  }
}

export default Winner;
