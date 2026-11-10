export const constants = {
  defaultLength: 4,
  defaultBase: 10,
};

export type PreviousGame = {
  id: string;
  secret: string;
  length: number;
  base: number;
  attempt: number;
  duration: number;
  completedAt: number;
};

export type State = {
  id: string;
  secret: string;
  length: number | undefined;
  base: number | undefined;
  bulls: number;
  cows: number;
  attempt: number;
  possibleSecrets: number;
  startTime: number | undefined;
  previousGames: PreviousGame[];
};

const initialGameState: State = {
  id: '',
  secret: '',
  length: constants.defaultLength,
  base: constants.defaultBase,
  bulls: 0,
  cows: 0,
  possibleSecrets: 0,
  attempt: 0,
  startTime: undefined,
  previousGames: [],
};

let gameState: State;

const savedGameState = localStorage.getItem('gameState');

if (savedGameState) {
  gameState = JSON.parse(savedGameState);
} else {
  gameState = structuredClone(initialGameState);
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function getGameState() {
  return gameState;
}

export function setGameState(obj: Partial<State>) {
  Object.assign(gameState, obj);

  localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function resetGameState() {
  const savedGames = structuredClone(getGameState().previousGames);

  setGameState({ ...initialGameState, previousGames: savedGames });
}
