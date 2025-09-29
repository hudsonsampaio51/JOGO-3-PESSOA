import React from 'react';
import { Player } from '../types';
import { predefinedQuestions } from '../questions';
import mapBackground from '../assets/map-background.svg';
import playerAvatar from '../assets/player-avatar.svg';

interface AdventureMapProps {
  players: Player[];
  localPlayerId: string;
  onPhaseClick: (phaseIndex: number) => void;
}

const AdventureMap: React.FC<AdventureMapProps> = ({ players, onPhaseClick, localPlayerId }) => {
  const localPlayer = players.find(p => p.id === localPlayerId);

  return (
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${mapBackground})` }}>
      {/* Renderiza a linha de progresso */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {predefinedQuestions.slice(0, -1).map((q, index) => (
          <line
            key={index}
            x1={`${q.x}%`}
            y1={`${q.y}%`}
            x2={`${predefinedQuestions[index + 1].x}%`}
            y2={`${predefinedQuestions[index + 1].y}%`}
            stroke="#4A5568"
            strokeWidth="3"
            strokeDasharray="5,5"
          />
        ))}
      </svg>
      
      {/* Renderiza os pontos de fase */}
      {predefinedQuestions.map((question, index) => {
        const isActive = localPlayer?.currentPhase === index;
        const isCompleted = localPlayer && localPlayer.currentPhase > index;

        let bgColor = 'bg-gray-600';
        if (isActive) bgColor = 'bg-cyan-400 animate-pulse';
        if (isCompleted) bgColor = 'bg-green-500';
        
        return (
            <div
                key={index}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${bgColor} border-2 border-white`}
                style={{ left: `${question.x}%`, top: `${question.y}%` }}
                onClick={() => onPhaseClick(index)}
            >
                {index + 1}
            </div>
        );
      })}

      {/* Renderiza os avatares dos jogadores */}
      {players.map(player => {
        const phase = predefinedQuestions[player.currentPhase];
        if (!phase) return null;

        return (
            <div key={player.id} className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-500" style={{ left: `${phase.x}%`, top: `${phase.y}%` }}>
                <img src={playerAvatar} alt="Player Avatar" className="w-10 h-10" />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">
                    {player.name.split(' ')[0]}
                </span>
            </div>
        );
      })}
    </div>
  );
};

export default AdventureMap;
