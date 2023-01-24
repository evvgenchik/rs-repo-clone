class Api {
  paths = {
    garage: 'http://127.0.0.1:3000/garage',
    winners: 'http://127.0.0.1:3000/winners',
    engine: 'http://127.0.0.1:3000/engine'
  };

  async getCars(page?: number, limit?: number) {
    try {
      // eslint-disable-next-line prettier/prettier
      const url = page ? `${this.paths.garage}?_page=${page}&_limit=${limit}`
        : this.paths.garage;
      const response = await fetch(url);
      const cars = await response.json();
      return cars;
    } catch (e) {
      throw new Error('err');
    }
  }

  async createCar(model: string, color: string) {
    if (!model) {
      return;
    }
    const body = { name: model, color: color };
    try {
      const response = await fetch(this.paths.garage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      console.log(response);
    } catch (e) {
      throw new Error('err');
    }
  }

  async updateCar(model: string, color: string, id: string) {
    if (!model) {
      return 'no method';
    }
    const body = { name: model, color: color };
    try {
      const response = await fetch(`${this.paths.garage}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return response.json();
    } catch (e) {
      throw new Error('err');
    }
  }

  async deleteCar(id: string) {
    try {
      const response = await fetch(`${this.paths.garage}/${id}`, { method: 'DELETE' });
      return response.json();
    } catch (e) {
      throw new Error('err');
    }
  }

  // eslint-disable-next-line consistent-return
  async drive(id: string, status: string) {
    try {
      const response = await fetch(`${this.paths.engine}?id=${id}&status=${status}`, {
        method: 'PATCH'
      });
      if (response.status === 500) {
        return 500;
      }
      const date = await response.json();
      return date;
    } catch (e) {
      console.log(e);
    }
  }

  async getWinner(id: number) {
    try {
      const response = await fetch(`${this.paths.winners}/${id}`);
      const winner = await response.json();
      return winner;
    } catch (e) {
      throw new Error('err');
    }
  }

  async createWinner(id: number, time: number) {
    const body = { id: id, wins: 1, time: time };
    try {
      const response = await fetch(this.paths.winners, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      return response.status;
    } catch (e) {
      throw new Error('err');
    }
  }

  async updateWinner(id: number, time: number, wins: number) {
    const body = { id: id, wins: wins + 1, time: time };
    try {
      const response = await fetch(`${this.paths.winners}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      return response.status;
    } catch (e) {
      throw new Error('err');
    }
  }

  async getAllWinners(page: number, sort: string, order: string, limit?: number) {
    try {
      const url = limit
        ? `${this.paths.winners}?_page=${page}&_sort=${sort}&_order=${order}&_limit=${limit}`
        : 'http://127.0.0.1:3000/winners';
      const response = await fetch(url);
      const winners = await response.json();
      return winners;
    } catch (e) {
      throw new Error('err');
    }
  }

  async getCar(id: number) {
    try {
      const response = await fetch(`${this.paths.garage}/${id}`);
      const car = await response.json();
      return car;
    } catch (e) {
      throw new Error('err');
    }
  }

  async deleteWinner(id: string) {
    try {
      const response = await fetch(`${this.paths.winners}/${id}`, { method: 'DELETE' });
      return response.json();
    } catch (e) {
      throw new Error('err');
    }
  }
}

const api = new Api();

export default api;
