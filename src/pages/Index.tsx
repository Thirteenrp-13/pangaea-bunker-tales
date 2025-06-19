
import React, { useState } from 'react';
import { MainMenu } from '../components/game/MainMenu';
import { CharacterCreation } from '../components/game/CharacterCreation';
import { GameInterface } from '../components/game/GameInterface';

export type GameState = 'menu' | 'character-creation' | 'playing';

export interface PlayerCharacter {
  name: string;
  avatar?: string;
  backstory: string;
  traits: string[];
  stats: {
    health: number;
    stamina: number;
    morale: number;
  };
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [playerCharacter, setPlayerCharacter] = useState<PlayerCharacter | null>(null);

  const handleStartNewGame = () => {
    setGameState('character-creation');
  };

  const handleCharacterCreated = (character: PlayerCharacter) => {
    setPlayerCharacter(character);
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setPlayerCharacter(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {gameState === 'menu' && (
        <MainMenu onStartNewGame={handleStartNewGame} />
      )}
      
      {gameState === 'character-creation' && (
        <CharacterCreation 
          onCharacterCreated={handleCharacterCreated}
          onBack={() => setGameState('menu')}
        />
      )}
      
      {gameState === 'playing' && playerCharacter && (
        <GameInterface 
          playerCharacter={playerCharacter}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
};

export default Index;
