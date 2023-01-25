import api from './api';

class Winner {
  async addWinner(id: number, winTime: number) {
    const winner = await api.getWinner(id);

    if (winner) {
      if (!winner.id) {
        const newWinner = await api.createWinner(id, winTime);

        if (newWinner !== 201) {
          console.log('Error: Insert failed, duplicate id');
        }
        return;
      }

      const updateWinner = await api.updateWinner(id, winTime, winner.wins);
      if (updateWinner !== 200) {
        console.log('Code: 404 NOT FOUND');
      }
    }
  }
}

export default Winner;
