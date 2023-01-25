interface ICar {
  name: string;
  color: string;
  id: number;
}

interface IWinner {
  id: number;
  wins: number;
  time: number;
}

interface IStore {
  carsPage: number;
  winnersPage: number;
  sort: string;
  order: string;
  inputNameCreate: string;
  inputNameUpdate: string;
  inputColorUpdate: string;
  inputColorCreate: string;
}

type engineDriveResponse = {
  success: boolean;
};
type engineStartResponse = {
  velocity: number;
  distance: number;
};

// type renderWinnerParam = ICar | IWinner;
// interface IWinnersResponse {
//   id: number;
//   wins: number;
//   time: number;
// }

export { ICar, IWinner, IStore, engineDriveResponse, engineStartResponse };
