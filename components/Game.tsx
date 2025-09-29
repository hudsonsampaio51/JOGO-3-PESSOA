import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, runTransaction, arrayUnion, updateDoc } from 'firebase/firestore';
import { GameState, Player, Question } from '../types';
import { predefinedQuestions } from '../questions';
import AdventureMap from './AdventureMap';
import QuestionModal from './QuestionModal';
import Leaderboard from './Leaderboard';

interface GameProps {
  name: string;
  gameId: string;
}

const Game: React.FC<GameProps> = ({ name, gameId }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  // Create a stable player ID for the duration of the component's life
  const [localPlayerId] = useState(() => `${name.replace(/\s+/g, '-')}-${Date.now()}`);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const gameRef = doc(db, 'games', gameId);

    const joinGame = async () => {
      try {
        await runTransaction(db, async (transaction) => {
          const gameSnap = await transaction.get(gameRef);
          
          if (!gameSnap.exists()) {
            // Game doesn't exist, create it with the current player
            const newPlayer: Player = { id: localPlayerId, name, score: 0, currentPhase: 0 };
            transaction.set(gameRef, { players: [newPlayer], status: 'playing' });
          } else {
            // Game exists, add player if not already in
            const players = gameSnap.data().players as Player[];
            if (!players.some(p => p.id === localPlayerId)) {
                const newPlayer: Player = { id: localPlayerId, name, score: 0, currentPhase: 0 };
                transaction.update(gameRef, { players: arrayUnion(newPlayer) });
            }
          }
        });
      } catch (e) {
        console.error("Failed to join game:", e);
      }
    };

    joinGame();

    const unsubscribe = onSnapshot(gameRef, (doc) => {
      if (doc.exists()) {
        setGameState(doc.data() as GameState);
      } else {
        console.log(`Game ${gameId} does not exist.`);
        setGameState(null);
      }
    });

    return () => unsubscribe();
  }, [gameId, name, localPlayerId]);

  const handlePhaseClick = (phaseIndex: number) => {
    const localPlayer = gameState?.players.find(p => p.id === localPlayerId);
    if (localPlayer && localPlayer.currentPhase === phaseIndex && gameState?.status === 'playing') {
      setActiveQuestion(predefinedQuestions[phaseIndex]);
      setShowModal(true);
    }
  };

  const handleAnswer = async (isCorrect: boolean) => {
    setShowModal(false);
    setActiveQuestion(null);

    const localPlayer = gameState?.players.find(p => p.id === localPlayerId);
    if (!localPlayer || !gameState) return;

    if (isCorrect) {
      const updatedPlayers = gameState.players.map(p =>
        p.id === localPlayerId
          ? { ...p, score: p.score + 10, currentPhase: p.currentPhase + 1 }
          : p
      );
      
      const gameRef = doc(db, 'games', gameId);
      await updateDoc(gameRef, { players: updatedPlayers });
    }
  };

  if (!gameState || !gameState.players.some(p => p.id === localPlayerId)) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-2xl animate-pulse">Entrando na aventura...</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-slate-700">
      <AdventureMap
        players={gameState.players}
        localPlayerId={localPlayerId}
        onPhaseClick={handlePhaseClick}
      />
      <Leaderboard players={gameState.players} />
      {showModal && activeQuestion && (
        <QuestionModal
          question={activeQuestion}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Game;
