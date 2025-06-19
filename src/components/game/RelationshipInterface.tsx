import React, { useState } from 'react';
import { ArrowLeft, User, Heart, MessageSquare, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAI } from '../../hooks/useAI';

interface RelationshipInterfaceProps {
  onBack: () => void;
}

interface Character {
  id: string;
  name: string;
  role: string;
  personality: string;
  relationship: number;
  status: 'Amigável' | 'Neutro' | 'Desconfiado' | 'Hostil';
  lastInteraction: string;
  backstory: string;
}

interface ChatMessage {
  sender: 'player' | 'npc';
  content: string;
  timestamp: Date;
}

export const RelationshipInterface: React.FC<RelationshipInterfaceProps> = ({ onBack }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [playerMessage, setPlayerMessage] = useState('');
  const { isLoading, chatWithNPC } = useAI();

  const characters: Character[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Médica',
      personality: 'Pragmática e cuidadosa',
      relationship: 75,
      status: 'Amigável',
      lastInteraction: 'Ajudou você a tratar um ferimento ontem',
      backstory: 'Médica experiente que estava voltando de uma conferência médica quando o navio naufragou.'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Ex-Militar',
      personality: 'Disciplinado e protetor',
      relationship: 60,
      status: 'Neutro',
      lastInteraction: 'Discordou sobre as prioridades de exploração',
      backstory: 'Veterano de guerra que trabalha como instrutor de sobrevivência.'
    },
    {
      id: '3',
      name: 'Elena Volkov',
      role: 'Engenheira',
      personality: 'Inteligente mas reservada',
      relationship: 45,
      status: 'Desconfiado',
      lastInteraction: 'Questionou suas decisões sobre recursos',
      backstory: 'Engenheira de sistemas que suspeita que o naufrágio não foi acidental.'
    }
  ];

  const getRelationshipColor = (relationship: number) => {
    if (relationship >= 70) return 'text-green-400';
    if (relationship >= 50) return 'text-yellow-400';
    if (relationship >= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Amigável': return 'bg-green-900/30 text-green-400 border-green-800';
      case 'Neutro': return 'bg-yellow-900/30 text-yellow-400 border-yellow-800';
      case 'Desconfiado': return 'bg-orange-900/30 text-orange-400 border-orange-800';
      case 'Hostil': return 'bg-red-900/30 text-red-400 border-red-800';
      default: return 'bg-slate-900/30 text-slate-400 border-slate-800';
    }
  };

  const sendMessage = async () => {
    if (!playerMessage.trim() || !selectedCharacter || isLoading) return;

    const newPlayerMessage: ChatMessage = {
      sender: 'player',
      content: playerMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newPlayerMessage]);
    setPlayerMessage('');

    try {
      const context = `Situação: Sobreviventes em uma ilha misteriosa. Relacionamento atual: ${selectedCharacter.relationship}%. Status: ${selectedCharacter.status}`;
      const npcResponse = await chatWithNPC(
        selectedCharacter.name,
        selectedCharacter.personality,
        playerMessage,
        context
      );

      const npcMessage: ChatMessage = {
        sender: 'npc',
        content: npcResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, npcMessage]);
    } catch (error) {
      console.error('Erro no chat:', error);
    }
  };

  const startChat = (character: Character) => {
    setSelectedCharacter(character);
    setChatMode(true);
    setChatMessages([
      {
        sender: 'npc',
        content: `Olá! Como posso ajudar você hoje?`,
        timestamp: new Date()
      }
    ]);
  };

  if (chatMode && selectedCharacter) {
    return (
      <div className="min-h-screen p-4 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={() => setChatMode(false)}
            variant="ghost" 
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        <Card className="bg-slate-800/70 border-slate-700 mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <CardTitle className="text-white flex items-center">
                  <Bot className="mr-2 h-4 w-4 text-green-400" />
                  {selectedCharacter.name}
                </CardTitle>
                <p className="text-slate-400 text-sm">{selectedCharacter.role}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="bg-slate-800/70 border-slate-700 mb-4">
          <CardContent className="p-4">
            <div className="h-64 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.sender === 'player'
                      ? 'bg-blue-600/20 text-blue-100 ml-8'
                      : 'bg-slate-700/50 text-slate-200 mr-8'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
              {isLoading && (
                <div className="bg-slate-700/50 text-slate-200 mr-8 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Pensando...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Textarea
                value={playerMessage}
                onChange={(e) => setPlayerMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-slate-700 border-slate-600 text-white min-h-[80px]"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !playerMessage.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="text-slate-300 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Bunker
        </Button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-400 font-mono mb-2 flex items-center">
          <Bot className="mr-2 h-6 w-6" />
          RELACIONAMENTOS
        </h1>
        <p className="text-slate-300 text-sm">
          Converse com NPCs usando IA. A sobrevivência depende da cooperação.
        </p>
      </div>

      {!selectedCharacter ? (
        <div className="space-y-4">
          {characters.map((character) => (
            <Card 
              key={character.id}
              className="bg-slate-800/70 border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={() => setSelectedCharacter(character)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{character.name}</h3>
                      <p className="text-slate-400 text-sm">{character.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-mono ${getRelationshipColor(character.relationship)}`}>
                      {character.relationship}%
                    </div>
                    <div className={`text-xs px-2 py-1 rounded border ${getStatusColor(character.status)}`}>
                      {character.status}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-2">
                  {character.personality}
                </p>
                
                <p className="text-slate-400 text-xs">
                  Última interação: {character.lastInteraction}
                </p>
              </CardContent>
            </Card>
          ))}
          
          <Card className="bg-blue-900/20 border-blue-800">
            <CardContent className="p-4 text-center">
              <div className="text-blue-400 mb-2 flex items-center justify-center">
                <Bot className="mr-2 h-4 w-4" />
                💡 IA Integrada
              </div>
              <p className="text-blue-300 text-sm">
                Converse naturalmente com os NPCs. A IA interpretará suas personalidades e lembrará das interações.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-slate-400" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-white text-xl">
                    {selectedCharacter.name}
                  </CardTitle>
                  <p className="text-slate-400">{selectedCharacter.role}</p>
                  <div className="flex items-center mt-2">
                    <Heart className="h-4 w-4 mr-1 text-red-400" />
                    <span className={`font-mono ${getRelationshipColor(selectedCharacter.relationship)}`}>
                      {selectedCharacter.relationship}% 
                    </span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded border ${getStatusColor(selectedCharacter.status)}`}>
                      {selectedCharacter.status}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-slate-300 font-semibold mb-2">Personalidade:</h4>
                  <p className="text-slate-400 text-sm">{selectedCharacter.personality}</p>
                </div>
                
                <div>
                  <h4 className="text-slate-300 font-semibold mb-2">História:</h4>
                  <p className="text-slate-400 text-sm">{selectedCharacter.backstory}</p>
                </div>
                
                <div>
                  <h4 className="text-slate-300 font-semibold mb-2">Última Interação:</h4>
                  <p className="text-slate-400 text-sm">{selectedCharacter.lastInteraction}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Interações com IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => startChat(selectedCharacter)}
                className="w-full justify-start bg-green-600 hover:bg-green-700"
              >
                <Bot className="mr-2 h-4 w-4" />
                Conversar com IA
              </Button>
              <p className="text-slate-400 text-xs">
                A IA interpretará a personalidade de {selectedCharacter.name} baseada em sua história e relacionamento atual.
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={() => setSelectedCharacter(null)}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Voltar à Lista
          </Button>
        </div>
      )}
    </div>
  );
};
