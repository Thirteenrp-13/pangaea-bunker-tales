
import { useState, useEffect, useCallback } from 'react';
import { PlayerCharacter } from '../pages/Index';
import { GameState, getGameState, saveGameState, createNewGameState, calculateMoraleStatus } from '../services/gameStateService';
import { useAI } from './useAI';

export const useGameState = (playerCharacter: PlayerCharacter | null) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyEvent, setDailyEvent] = useState<string | null>(null);
  const { getDailyEvent } = useAI();

  useEffect(() => {
    if (playerCharacter) {
      const saved = getGameState();
      if (saved && saved.playerCharacter.name === playerCharacter.name) {
        setGameState(saved);
      } else {
        const newState = createNewGameState(playerCharacter);
        setGameState(newState);
        saveGameState(newState);
      }
    }
    setIsLoading(false);
  }, [playerCharacter]);

  const updateResources = useCallback((newResources: Partial<GameState['resources']>) => {
    if (!gameState) return;

    const updatedState = {
      ...gameState,
      resources: {
        ...gameState.resources,
        ...newResources
      }
    };

    updatedState.moraleStatus = calculateMoraleStatus(updatedState.resources, updatedState.relationships);
    
    setGameState(updatedState);
    saveGameState(updatedState);
  }, [gameState]);

  const advanceDay = useCallback(async () => {
    if (!gameState) return;

    const nextDay = gameState.day + 1;
    
    // Generate daily event
    try {
      const event = await getDailyEvent(gameState, gameState.relationships);
      setDailyEvent(event);

      const updatedState = {
        ...gameState,
        day: nextDay,
        events: [
          ...gameState.events,
          {
            day: nextDay,
            description: event,
            type: 'random' as const
          }
        ]
      };

      setGameState(updatedState);
      saveGameState(updatedState);
    } catch (error) {
      console.error('Erro ao gerar evento diário:', error);
      
      const updatedState = {
        ...gameState,
        day: nextDay
      };

      setGameState(updatedState);
      saveGameState(updatedState);
    }
  }, [gameState, getDailyEvent]);

  const updateRelationship = useCallback((npcId: string, affinityChange: number, newInteraction: string) => {
    if (!gameState) return;

    const updatedRelationships = gameState.relationships.map(rel => 
      rel.npcId === npcId 
        ? {
            ...rel,
            affinity: Math.max(0, Math.min(100, rel.affinity + affinityChange)),
            lastInteraction: newInteraction
          }
        : rel
    );

    const updatedState = {
      ...gameState,
      relationships: updatedRelationships,
      moraleStatus: calculateMoraleStatus(game State.resources, updatedRelationships)
    };

    setGameState(updatedState);
    saveGameState(updatedState);
  }, [gameState]);

  const completeMission = useCallback((missionId: string, rewards: any) => {
    if (!gameState) return;

    const updatedState = {
      ...gameState,
      completedMissions: [...gameState.completedMissions, missionId],
      resources: {
        ...gameState.resources,
        ...rewards
      }
    };

    updatedState.moraleStatus = calculateMoraleStatus(updatedState.resources, updatedState.relationships);

    setGameState(updatedState);
    saveGameState(updatedState);
  }, [gameState]);

  return {
    gameState,
    isLoading,
    dailyEvent,
    setDailyEvent,
    updateResources,
    advanceDay,
    updateRelationship,
    completeMission
  };
};
