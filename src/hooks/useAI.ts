
import { useState, useCallback } from 'react';
import { generateNPCResponse, generateMissionOutcome, generateDailyEvent } from '../services/deepseekService';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const chatWithNPC = useCallback(async (
    npcName: string,
    npcPersonality: string,
    playerMessage: string,
    context: string
  ) => {
    setIsLoading(true);
    try {
      const response = await generateNPCResponse(npcName, npcPersonality, playerMessage, context);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const executeMissionWithAI = useCallback(async (
    missionDescription: string,
    playerStats: any,
    difficulty: string
  ) => {
    setIsLoading(true);
    try {
      const outcome = await generateMissionOutcome(missionDescription, playerStats, difficulty);
      return outcome;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDailyEvent = useCallback(async (gameState: any, relationships: any[]) => {
    setIsLoading(true);
    try {
      const event = await generateDailyEvent(gameState, relationships);
      return event;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    chatWithNPC,
    executeMissionWithAI,
    getDailyEvent
  };
};
