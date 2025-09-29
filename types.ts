export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl: string;
  x: number; // Posição X no mapa (percentual)
  y: number; // Posição Y no mapa (percentual)
}

export interface Player {
  id: string;
  name: string;
  score: number;
  currentPhase: number; // A fase/pergunta atual do jogador
}

export interface GameState {
  players: Player[];
  status: 'lobby' | 'playing' | 'finished';
}
