
import { PlayerCharacter } from '../pages/Index';

export interface GameState {
  day: number;
  resources: {
    water: number;
    food: number;
    medicine: number;
    materials: number;
  };
  playerCharacter: PlayerCharacter;
  relationships: Array<{
    npcId: string;
    npcName: string;
    affinity: number;
    status: string;
    lastInteraction: string;
  }>;
  completedMissions: string[];
  events: Array<{
    day: number;
    description: string;
    type: 'mission' | 'social' | 'random' | 'critical';
  }>;
  moraleStatus: 'high' | 'normal' | 'low' | 'critical';
}

const validateGameState = (data: any): data is GameState => {
  if (!data || typeof data !== 'object') return false;
  
  // Check required properties
  if (typeof data.day !== 'number' || data.day < 1) return false;
  
  // Validate resources
  if (!data.resources || typeof data.resources !== 'object') return false;
  const requiredResources = ['water', 'food', 'medicine', 'materials'];
  for (const resource of requiredResources) {
    if (typeof data.resources[resource] !== 'number' || data.resources[resource] < 0) {
      return false;
    }
  }
  
  // Validate player character
  if (!data.playerCharacter || typeof data.playerCharacter.name !== 'string') return false;
  
  // Validate relationships array
  if (!Array.isArray(data.relationships)) return false;
  
  // Validate completed missions array
  if (!Array.isArray(data.completedMissions)) return false;
  
  // Validate events array
  if (!Array.isArray(data.events)) return false;
  
  // Validate morale status
  const validMoraleStatuses = ['high', 'normal', 'low', 'critical'];
  if (!validMoraleStatuses.includes(data.moraleStatus)) return false;
  
  return true;
};

export const getGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem('isla-pangaea-gamestate');
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    
    // Validate the parsed data
    if (!validateGameState(parsed)) {
      console.warn('Invalid game state found in localStorage, clearing...');
      localStorage.removeItem('isla-pangaea-gamestate');
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading game state:', error);
    // Clear corrupted data
    localStorage.removeItem('isla-pangaea-gamestate');
    return null;
  }
};

export const saveGameState = (gameState: GameState): void => {
  try {
    // Validate before saving
    if (!validateGameState(gameState)) {
      console.error('Attempted to save invalid game state');
      return;
    }
    
    localStorage.setItem('isla-pangaea-gamestate', JSON.stringify(gameState));
  } catch (error) {
    console.error('Erro ao salvar estado do jogo:', error);
  }
};

export const createNewGameState = (playerCharacter: PlayerCharacter): GameState => {
  return {
    day: 1,
    resources: {
      water: 15,
      food: 12,
      medicine: 3,
      materials: 8
    },
    playerCharacter,
    relationships: [
      {
        npcId: '1',
        npcName: 'Dr. Sarah Chen',
        affinity: 75,
        status: 'Amigável',
        lastInteraction: 'Primeira conversa no bunker'
      },
      {
        npcId: '2',
        npcName: 'Marcus Rodriguez',
        affinity: 60,
        status: 'Neutro',
        lastInteraction: 'Discussão sobre estratégias'
      },
      {
        npcId: '3',
        npcName: 'Elena Volkov',
        affinity: 45,
        status: 'Desconfiado',
        lastInteraction: 'Questionou suas decisões'
      }
    ],
    completedMissions: [],
    events: [],
    moraleStatus: 'normal'
  };
};

export const calculateMoraleStatus = (resources: GameState['resources'], relationships: GameState['relationships']): GameState['moraleStatus'] => {
  let moraleScore = 50; // Base score

  // Resource impact
  if (resources.water < 5 || resources.food < 5) moraleScore -= 30;
  else if (resources.water < 10 || resources.food < 10) moraleScore -= 15;

  // Relationship impact
  const avgAffinity = relationships.reduce((sum, rel) => sum + rel.affinity, 0) / relationships.length;
  moraleScore += (avgAffinity - 50) / 2;

  // Determine status
  if (moraleScore >= 75) return 'high';
  if (moraleScore >= 50) return 'normal';
  if (moraleScore >= 25) return 'low';
  return 'critical';
};
