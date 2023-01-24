class Api {
  paths = {
    garage: 'http://127.0.0.1:3000/garage',
    winners: 'http://127.0.0.1:3000/winners',
    engine: 'http://127.0.0.1:3000/engine'
  };

  async getCars(page?: number, limit?: number) {
    try {
      const url = page ? `${this.paths.garage}?_page=${page}&_limit=${limit}` : this.paths.garage;
      const response = await fetch(url);
      const cars = await response.json();
      return cars;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async createCar(model: string, color: string) {
    if (!model) {
      return false;
    }
    const body = { name: model, color: color };
    try {
      const response = await fetch(this.paths.garage, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return response;
    } catch (e) {
      console.log(e);
      return false;
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
      console.log(e);
      return false;
    }
  }

  async deleteCar(id: string) {
    try {
      const response = await fetch(`${this.paths.garage}/${id}`, { method: 'DELETE' });
      return response.json();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

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
      return false;
    }
  }

  async getWinner(id: number) {
    try {
      const response = await fetch(`${this.paths.winners}/${id}`);
      const winner = await response.json();
      return winner;
    } catch (e) {
      console.log(e);
      return false;
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
      console.log(e);
      return false;
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
      console.log(e);
      return false;
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
      console.log(e);
      return false;
    }
  }

  async getCar(id: number) {
    try {
      const response = await fetch(`${this.paths.garage}/${id}`);
      const car = await response.json();
      return car;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async deleteWinner(id: string) {
    try {
      const response = await fetch(`${this.paths.winners}/${id}`, { method: 'DELETE' });
      return response.json();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

const api = new Api();

export default api;
