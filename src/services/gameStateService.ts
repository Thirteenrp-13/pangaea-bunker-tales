
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

export const getGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem('isla-pangaea-gamestate');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const saveGameState = (gameState: GameState): void => {
  try {
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
