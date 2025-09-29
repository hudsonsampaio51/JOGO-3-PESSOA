import React, { useState } from 'react';

interface LobbyProps {
  onJoin: (name: string, gameId: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && gameId.trim()) {
      onJoin(name.trim(), gameId.trim().toUpperCase());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-800">
      <div className="text-center p-8 bg-slate-900 rounded-xl shadow-2xl border border-cyan-500">
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">A Conquista do Conhecimento</h1>
        <p className="text-xl text-gray-300 mb-8">Entre na aventura com sua turma!</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="text"
            placeholder="Código da Partida"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <button type="submit" className="p-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-bold text-lg transition-colors">
            Entrar na Aventura
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;
