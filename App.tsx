import React, { useState } from 'react';
import Lobby from './components/Lobby';
import Game from './components/Game';

function App() {
  const [playerInfo, setPlayerInfo] = useState<{ name: string; gameId: string } | null>(null);

  const handleJoinGame = (name: string, gameId: string) => {
    setPlayerInfo({ name, gameId });
  };

  return (
    <div className="bg-slate-900 text-white h-screen w-screen overflow-hidden font-sans">
      {!playerInfo ? (
        <Lobby onJoin={handleJoinGame} />
      ) : (
        <Game name={playerInfo.name} gameId={playerInfo.gameId} />
      )}
    </div>
  );
}

export default App;
