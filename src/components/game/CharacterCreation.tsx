
import React, { useState } from 'react';
import { ArrowLeft, Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerCharacter } from '../../pages/Index';

interface CharacterCreationProps {
  onCharacterCreated: (character: PlayerCharacter) => void;
  onBack: () => void;
}

export const CharacterCreation: React.FC<CharacterCreationProps> = ({ 
  onCharacterCreated, 
  onBack 
}) => {
  const [character, setCharacter] = useState<Partial<PlayerCharacter>>({
    name: '',
    backstory: '',
    traits: [],
    stats: {
      health: 100,
      stamina: 100,
      morale: 75
    }
  });

  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const availableTraits = [
    'Sobrevivencialista', 'Líder Natural', 'Médico', 'Engenheiro',
    'Soldado', 'Cientista', 'Caçador', 'Diplomata',
    'Paranóico', 'Otimista', 'Estrategista', 'Impulsivo'
  ];

  const handleTraitToggle = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else if (selectedTraits.length < 3) {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const handleSubmit = () => {
    if (character.name && character.backstory) {
      onCharacterCreated({
        ...character,
        traits: selectedTraits,
        stats: character.stats || { health: 100, stamina: 100, morale: 75 }
      } as PlayerCharacter);
    }
  };

  const isValid = character.name && character.backstory && selectedTraits.length > 0;

  return (
    <div className="min-h-screen p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        <Card className="bg-slate-800/70 border-slate-700">
          <CardHeader>
            <CardTitle className="text-green-400 text-xl font-mono">
              CRIAÇÃO DE PERSONAGEM
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Upload */}
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-600">
                <User className="h-12 w-12 text-slate-400" />
              </div>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                <Upload className="mr-2 h-4 w-4" />
                Adicionar Foto
              </Button>
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Nome do Personagem</label>
              <Input
                value={character.name || ''}
                onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                placeholder="Digite o nome do seu personagem..."
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            {/* Backstory */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">História Pessoal</label>
              <Textarea
                value={character.backstory || ''}
                onChange={(e) => setCharacter({ ...character, backstory: e.target.value })}
                placeholder="Conte a história do seu personagem, sua profissão, personalidade e como chegou até aqui..."
                className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
              />
            </div>

            {/* Traits */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">
                Características (Escolha até 3)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableTraits.map((trait) => (
                  <Button
                    key={trait}
                    onClick={() => handleTraitToggle(trait)}
                    variant={selectedTraits.includes(trait) ? "default" : "outline"}
                    size="sm"
                    className={`text-sm ${
                      selectedTraits.includes(trait)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                    disabled={!selectedTraits.includes(trait) && selectedTraits.length >= 3}
                  >
                    {trait}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-slate-400">
                Selecionados: {selectedTraits.length}/3
              </p>
            </div>

            {/* Status Iniciais */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Status Inicial</label>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-700 p-3 rounded">
                  <div className="text-green-400 font-mono text-lg">100</div>
                  <div className="text-xs text-slate-400">SAÚDE</div>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                  <div className="text-blue-400 font-mono text-lg">100</div>
                  <div className="text-xs text-slate-400">ENERGIA</div>
                </div>
                <div className="bg-slate-700 p-3 rounded">
                  <div className="text-yellow-400 font-mono text-lg">75</div>
                  <div className="text-xs text-slate-400">MORAL</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={!isValid}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              COMEÇAR AVENTURA
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
