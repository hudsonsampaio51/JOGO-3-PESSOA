import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { GameState, Player } from '../types';
import AdventureMap from './AdventureMap';
import Leaderboard from './Leaderboard';
import QuestionModal from './QuestionModal';
import { predefinedQuestions } from '../questions';

interface GameProps {
  name: string;
  gameId: string;
}

const Game: React.FC<GameProps> = ({ name, gameId }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [localPlayer, setLocalPlayer] = useState<Player | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);

  const playerId = React.useMemo(() => `${name.replace(/\s+/g, '-')}-${Date.now()}`, [name]);

  useEffect(() => {
    const gameRef = doc(db, 'games', gameId);

    // Adiciona o jogador ao jogo no Firestore
    const joinGame = async () => {
        const newPlayer: Player = { id: playerId, name, score: 0, currentPhase: 0 };
        // Usamos set com merge para criar o documento se não existir
        await setDoc(gameRef, { 
            players: arrayUnion(newPlayer),
            status: 'playing' 
        }, { merge: true });
    };
    joinGame();

    // Ouve as atualizações do estado do jogo
    const unsubscribe = onSnapshot(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as GameState;
        setGameState(data);
        const currentPlayer = data.players.find(p => p.id === playerId);
        if (currentPlayer) {
            setLocalPlayer(currentPlayer);
        }
      } else {
        // O professor pode criar este documento
        console.log("Jogo não encontrado, esperando o professor iniciar.");
      }
    });

    return () => unsubscribe();
  }, [gameId, name, playerId]);

  const handlePhaseClick = (phaseIndex: number) => {
    if (localPlayer?.currentPhase === phaseIndex) {
      setShowQuestion(true);
    }
  };
  
  const handleAnswer = async (isCorrect: boolean) => {
    setShowQuestion(false);
    if (!localPlayer || !gameState) return;

    const gameRef = doc(db, 'games', gameId);
    const updatedPlayers = gameState.players.map(p => {
        if (p.id === playerId) {
            const newScore = isCorrect ? p.score + 10 : p.score;
            const newPhase = isCorrect ? p.currentPhase + 1 : p.currentPhase;
            return { ...p, score: newScore, currentPhase: newPhase };
        }
        return p;
    });

    await updateDoc(gameRef, { players: updatedPlayers });
  };


  if (!gameState || !localPlayer) {
    return <div className="flex items-center justify-center h-full">Carregando aventura...</div>;
  }

  return (
    <div className="relative h-full w-full">
      <Leaderboard players={gameState.players} />
      <AdventureMap 
        players={gameState.players} 
        onPhaseClick={handlePhaseClick} 
        localPlayerId={playerId}
      />
      {showQuestion && (
        <QuestionModal 
            question={predefinedQuestions[localPlayer.currentPhase]}
            onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Game;
