
import React, { useState, useEffect } from 'react';
import { PlayerCharacter } from '../../pages/Index';
import { BunkerInterface } from './BunkerInterface';
import { MissionInterface } from './MissionInterface';
import { RelationshipInterface } from './RelationshipInterface';
import { InventoryInterface } from './InventoryInterface';
import { SkillsInterface } from './SkillsInterface';
import { DailyEventModal } from './DailyEventModal';
import { useGameState } from '../../hooks/useGameState';

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
  const {
    gameState,
    isLoading,
    dailyEvent,
    setDailyEvent,
    updateResources,
    advanceDay,
    updateRelationship,
    completeMission
  } = useGameState(playerCharacter);

  if (isLoading || !gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-green-400 text-lg font-mono">
          Carregando Pangaea I.A...
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    const commonProps = {
      gameState,
      updateResources,
      updateRelationship,
      completeMission
    };

    switch (currentView) {
      case 'bunker':
        return (
          <BunkerInterface
            playerCharacter={playerCharacter}
            gameDay={gameState.day}
            resources={gameState.resources}
            moraleStatus={gameState.moraleStatus}
            onNavigate={setCurrentView}
            onAdvanceDay={advanceDay}
          />
        );
      case 'missions':
        return (
          <MissionInterface
            onBack={() => setCurrentView('bunker')}
            resources={gameState.resources}
            setResources={updateResources}
            playerCharacter={playerCharacter}
          />
        );
      case 'relationships':
        return (
          <RelationshipInterface
            onBack={() => setCurrentView('bunker')}
            relationships={gameState.relationships}
            updateRelationship={updateRelationship}
          />
        );
      case 'inventory':
        return (
          <InventoryInterface
            onBack={() => setCurrentView('bunker')}
            resources={gameState.resources}
            playerCharacter={playerCharacter}
          />
        );
      case 'skills':
        return (
          <SkillsInterface
            onBack={() => setCurrentView('bunker')}
            playerCharacter={playerCharacter}
          />
        );
      default:
        return (
          <BunkerInterface
            playerCharacter={playerCharacter}
            gameDay={gameState.day}
            resources={gameState.resources}
            moraleStatus={gameState.moraleStatus}
            onNavigate={setCurrentView}
            onAdvanceDay={advanceDay}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
      
      <DailyEventModal
        isOpen={!!dailyEvent}
        onClose={() => setDailyEvent(null)}
        event={dailyEvent || ''}
        day={gameState.day}
      />
    </div>
  );
};
