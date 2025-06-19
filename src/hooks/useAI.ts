
import { useState, useCallback } from 'react';
import { generateNPCResponse, generateMissionOutcome, generateDailyEvent } from '../services/deepseekService';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  const handleApiError = (error: any) => {
    if (error instanceof Error && error.message === 'API_KEY_MISSING') {
      setNeedsApiKey(true);
      return true;
    }
    return false;
  };

  const chatWithNPC = useCallback(async (
    npcName: string,
    npcPersonality: string,
    playerMessage: string,
    context: string
  ) => {
    setIsLoading(true);
    setNeedsApiKey(false);
    
    try {
      const response = await generateNPCResponse(npcName, npcPersonality, playerMessage, context);
      return response;
    } catch (error) {
      if (handleApiError(error)) {
        return 'Configuração da API necessária para interações com IA.';
      }
      throw error;
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
    setNeedsApiKey(false);
    
    try {
      const outcome = await generateMissionOutcome(missionDescription, playerStats, difficulty);
      return outcome;
    } catch (error) {
      if (handleApiError(error)) {
        return {
          success: Math.random() > 0.5,
          description: 'Resultado da missão determinado sem IA - configure a API para resultados mais dinâmicos.'
        };
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDailyEvent = useCallback(async (gameState: any, relationships: any[]) => {
    setIsLoading(true);
    setNeedsApiKey(false);
    
    try {
      const event = await generateDailyEvent(gameState, relationships);
      return event;
    } catch (error) {
      if (handleApiError(error)) {
        return 'Um dia relativamente tranquilo na ilha... (Configure a API para eventos mais dinâmicos)';
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearApiKeyError = useCallback(() => {
    setNeedsApiKey(false);
  }, []);

  return {
    isLoading,
    needsApiKey,
    chatWithNPC,
    executeMissionWithAI,
    getDailyEvent,
    clearApiKeyError
  };
};
