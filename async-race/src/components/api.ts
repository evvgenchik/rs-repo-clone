class Api {
  // pathes = {

  // }

  async getCars(page = '1', limit = '7') {
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`);
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
      const response = await fetch('http://127.0.0.1:3000/garage', {
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
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
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
      const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, { method: 'DELETE' });
      return response.json();
    } catch (e) {
      throw new Error('err');
    }
  }

  async drive(id: string, status: string) {
    try {
      const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
        method: 'PATCH'
      });
      if (response.status === 500) {
        await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, { method: 'PATCH' });
        return 500;
      }
      const date = await response.json();
      return date;
    } catch (e) {
      throw new Error('err');
    }
  }
}

const api = new Api();

export default api;
