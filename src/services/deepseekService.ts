
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

// Secure API key management
const getApiKey = (): string | null => {
  // Try to get from localStorage (user-provided key)
  const userKey = localStorage.getItem('deepseek_api_key');
  if (userKey) {
    return userKey;
  }
  
  // If no user key, return null to prompt user
  return null;
};

const validateJSON = (str: string): any => {
  try {
    const parsed = JSON.parse(str);
    // Basic validation - ensure it's an object
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Invalid JSON structure');
    }
    return parsed;
  } catch (error) {
    console.error('JSON validation failed:', error);
    throw new Error('Invalid JSON response from AI');
  }
};

const sanitizeContent = (content: string): string => {
  // Basic sanitization - remove potential harmful content
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
};

export const callDeepSeek = async (messages: DeepSeekMessage[]): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
      if (response.status === 401) {
        throw new Error('INVALID_API_KEY');
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data: DeepSeekResponse = await response.json();
    const content = data.choices[0]?.message?.content || 'Sem resposta da IA';
    
    return sanitizeContent(content);
  } catch (error) {
    console.error('Erro ao chamar DeepSeek:', error);
    if (error instanceof Error) {
      if (error.message === 'API_KEY_MISSING') {
        return 'Por favor, configure sua chave API do DeepSeek.';
      }
      if (error.message === 'INVALID_API_KEY') {
        return 'Chave API inválida. Verifique suas credenciais.';
      }
    }
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
      content: sanitizeContent(playerMessage)
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
      content: `Missão: ${sanitizeContent(missionDescription)}
      Stats do jogador: ${JSON.stringify(playerStats)}
      Dificuldade: ${difficulty}
      
      Gere um resultado realista considerando as chances de sucesso.`
    }
  ];

  try {
    const response = await callDeepSeek(messages);
    return validateJSON(response);
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

// Utility function to set API key
export const setApiKey = (key: string): void => {
  localStorage.setItem('deepseek_api_key', key);
};

// Utility function to clear API key
export const clearApiKey = (): void => {
  localStorage.removeItem('deepseek_api_key');
};
