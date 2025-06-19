
interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const DEEPSEEK_API_URL = 'https://llm.chutes.ai/v1/chat/completions';
const DEEPSEEK_API_KEY = 'cpk_7c825b2df8f24f50a5ec80da06c4f012.8b8d6155c7fe5b3d9d31397e5e77d8f6.1fSVOKU70ZK28yUOKeLThlBJrgpVB7eT';

export const callDeepSeek = async (messages: DeepSeekMessage[]): Promise<string> => {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3-0324',
        messages,
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0]?.message?.content || 'Sem resposta da IA';
  } catch (error) {
    console.error('Erro ao chamar DeepSeek:', error);
    return 'Erro na comunicação com IA';
  }
};

export const generateNPCResponse = async (
  npcName: string,
  npcPersonality: string,
  playerMessage: string,
  context: string
): Promise<string> => {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: `Você é ${npcName}, um sobrevivente na Ilha Perdida. Personalidade: ${npcPersonality}. 
      Contexto da situação: ${context}
      Responda como esse personagem responderia, mantendo a personalidade e considerando o contexto de sobrevivência.
      Mantenha respostas concisas (máximo 3 frases) e realistas para a situação.`
    },
    {
      role: 'user',
      content: playerMessage
    }
  ];

  return await callDeepSeek(messages);
};

export const generateMissionOutcome = async (
  missionDescription: string,
  playerStats: any,
  difficulty: string
): Promise<{
  success: boolean;
  description: string;
  rewards?: any;
  consequences?: string;
}> => {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: `Você é o narrador de um RPG de sobrevivência na Ilha Perdida. 
      Gere o resultado de uma missão baseado na descrição, stats do jogador e dificuldade.
      Responda APENAS em formato JSON válido com: success (boolean), description (string), rewards (objeto opcional), consequences (string opcional).`
    },
    {
      role: 'user',
      content: `Missão: ${missionDescription}
      Stats do jogador: ${JSON.stringify(playerStats)}
      Dificuldade: ${difficulty}
      
      Gere um resultado realista considerando as chances de sucesso.`
    }
  ];

  try {
    const response = await callDeepSeek(messages);
    return JSON.parse(response);
  } catch (error) {
    console.error('Erro ao gerar resultado da missão:', error);
    return {
      success: Math.random() > 0.5,
      description: 'A missão teve um resultado inesperado...'
    };
  }
};

export const generateDailyEvent = async (
  gameState: any,
  relationships: any[]
): Promise<string> => {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: `Você é o narrador de um RPG de sobrevivência. Gere um evento diário baseado no estado atual do jogo e relacionamentos.
      O evento deve ser realista, considerando recursos, moral do grupo e relacionamentos.
      Mantenha o evento em 2-3 frases, focando em sobrevivência e drama humano.`
    },
    {
      role: 'user',
      content: `Estado do jogo: ${JSON.stringify(gameState)}
      Relacionamentos: ${JSON.stringify(relationships)}
      
      Gere um evento interessante para hoje.`
    }
  ];

  return await callDeepSeek(messages);
};
