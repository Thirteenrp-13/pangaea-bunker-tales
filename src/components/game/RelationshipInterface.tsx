
import React, { useState } from 'react';
import { ArrowLeft, User, Heart, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export const RelationshipInterface: React.FC<RelationshipInterfaceProps> = ({ onBack }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

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

  const interactWithCharacter = (character: Character, action: string) => {
    // Simular interação com IA futuramente
    alert(`Você iniciou uma conversa com ${character.name} sobre: ${action}`);
    onBack();
  };

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
        <h1 className="text-2xl font-bold text-green-400 font-mono mb-2">
          RELACIONAMENTOS
        </h1>
        <p className="text-slate-300 text-sm">
          Mantenha boas relações com o grupo. A sobrevivência depende da cooperação.
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
              <div className="text-blue-400 mb-2">💡 Dica de Sobrevivência</div>
              <p className="text-blue-300 text-sm">
                Relacionamentos ruins podem levar a conflitos internos, sabotagem ou até mesmo violência. 
                Converse regularmente com os membros do grupo.
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
                Opções de Interação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => interactWithCharacter(selectedCharacter, 'Conversa casual')}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              >
                Conversar casualmente
              </Button>
              <Button
                onClick={() => interactWithCharacter(selectedCharacter, 'Discutir estratégias')}
                className="w-full justify-start bg-yellow-600 hover:bg-yellow-700"
              >
                Discutir estratégias de sobrevivência
              </Button>
              <Button
                onClick={() => interactWithCharacter(selectedCharacter, 'Oferecer ajuda')}
                className="w-full justify-start bg-green-600 hover:bg-green-700"
              >
                Oferecer ajuda
              </Button>
              <Button
                onClick={() => interactWithCharacter(selectedCharacter, 'Confrontar')}
                className="w-full justify-start bg-red-600 hover:bg-red-700"
                disabled={selectedCharacter.status === 'Amigável'}
              >
                Confrontar sobre algo
              </Button>
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
