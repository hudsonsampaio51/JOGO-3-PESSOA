import React from 'react';
import { Player } from '../types';

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 w-64">
      <h3 className="text-xl font-bold text-amber-300 mb-2">Placar ao Vivo</h3>
      <ul className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <li key={player.id} className="flex justify-between items-center text-lg">
            <span className="font-semibold text-white">
              {index + 1}. {player.name}
            </span>
            <span className="font-bold text-amber-400">{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
