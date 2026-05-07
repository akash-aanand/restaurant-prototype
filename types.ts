
export type PlayerColor = 'red' | 'green' | 'yellow' | 'blue';

export interface Token {
  id: string;
  player: PlayerColor;
  index: number; // 0 to 3
  position: number; // -1 for home, 0-51 for common path, 52-57 for home stretch, 58 for finish
  isFinished: boolean;
}

export interface Player {
  id: PlayerColor;
  name: string;
  color: string;
  tokens: Token[];
  isBot: boolean;
  isActive: boolean;
  score: number;
}

export interface GameState {
  players: Player[];
  activePlayerIndex: number;
  diceValue: number | null;
  isRolling: boolean;
  moveInProgress: boolean;
  gameStatus: 'waiting' | 'rolling' | 'moving' | 'finished';
  winner: PlayerColor | null;
  logs: string[];
  lastDiceRoll: number | null;
}

// Added missing FoodItem interface for restaurant components
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string | any;
}

// Added missing CartItem interface for restaurant components
export interface CartItem extends FoodItem {
  quantity: number;
}
