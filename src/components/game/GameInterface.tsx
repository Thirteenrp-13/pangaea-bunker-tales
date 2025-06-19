
import React, { useState } from 'react';
import { PlayerCharacter } from '../../pages/Index';
import { BunkerInterface } from './BunkerInterface';
import { MissionInterface } from './MissionInterface';
import { RelationshipInterface } from './RelationshipInterface';

interface GameInterfaceProps {
  playerCharacter: PlayerCharacter;
  onBackToMenu: () => void;
}

export type GameView = 'bunker' | 'missions' | 'relationships' | 'inventory' | 'skills';

export const GameInterface: React.FC<GameInterfaceProps> = ({ 
  playerCharacter, 
  onBackToMenu 
}) => {
  const [currentView, setCurrentView] = useState<GameView>('bunker');
  const [gameDay, setGameDay] = useState(1);
  const [resources, setResources] = useState({
    water: 15,
    food: 12,
    medicine: 3,
    materials: 8
  });

  const renderCurrentView = () => {
    switch (currentView) {
      case 'bunker':
        return (
          <BunkerInterface
            playerCharacter={playerCharacter}
            gameDay={gameDay}
            resources={resources}
            onNavigate={setCurrentView}
          />
        );
      case 'missions':
        return (
          <MissionInterface
            onBack={() => setCurrentView('bunker')}
            resources={resources}
            setResources={setResources}
            playerCharacter={playerCharacter}
          />
        );
      case 'relationships':
        return (
          <RelationshipInterface
            onBack={() => setCurrentView('bunker')}
          />
        );
      default:
        return (
          <BunkerInterface
            playerCharacter={playerCharacter}
            gameDay={gameDay}
            resources={resources}
            onNavigate={setCurrentView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
    </div>
  );
};
