import './assets/style/style.scss';
import { $ } from './assets/utils/helpers';
import Garage from './pages/garagePage';
import Winner from './pages/winnersPage';

class Server {
  render() {
    document.body.innerHTML = `
  <div class="container">
  <div class="header">
    <div class="header__btns">
      <button class="garage button">GARAGE</button>
      <button class="winners button">WINNERS</button>
    </div>
  </div>
  <main class="main">
  </main>
  <footer class="footer">
    <div class="footer__btns">
      <button class="footer__prev button">PREV</button>
      <button class="footer__next button">NEXT</button>
    </div>
  </footer>
</div>
  `;
  }

  eventlisteners() {
    const garageBtn = <HTMLButtonElement>$('.garage.button');
    const winnersBtn = <HTMLButtonElement>$('.winners.button');

    garageBtn.addEventListener('click', () => {
      this.changeContent('garage');
    });
    winnersBtn.addEventListener('click', () => {
      this.changeContent('winners');
    });
  }

  changeContent(page = 'garage') {
    const cls = page === 'garage' ? new Garage() : new Winner();
    cls.render();
  }
}

const server = new Server();
server.render();
server.eventlisteners();
server.changeContent();
