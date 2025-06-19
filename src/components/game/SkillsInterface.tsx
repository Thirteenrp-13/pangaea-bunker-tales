
import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Star, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlayerCharacter } from '../../pages/Index';

interface SkillsInterfaceProps {
  onBack: () => void;
  playerCharacter: PlayerCharacter;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  experience: number;
  experienceToNext: number;
  category: 'survival' | 'social' | 'technical' | 'combat';
  unlocked: boolean;
}

export const SkillsInterface: React.FC<SkillsInterfaceProps> = ({ 
  onBack, 
  playerCharacter 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'survival' | 'social' | 'technical' | 'combat'>('survival');

  const playerSkills: Skill[] = [
    // Survival Skills
    {
      id: 'foraging',
      name: 'Coleta',
      description: 'Habilidade para encontrar comida e recursos na natureza.',
      level: 2,
      maxLevel: 10,
      experience: 150,
      experienceToNext: 200,
      category: 'survival',
      unlocked: true
    },
    {
      id: 'hunting',
      name: 'Caça',
      description: 'Capacidade de rastrear e caçar animais.',
      level: 1,
      maxLevel: 10,
      experience: 50,
      experienceToNext: 100,
      category: 'survival',
      unlocked: true
    },
    {
      id: 'water_purification',
      name: 'Purificação de Água',
      description: 'Técnicas para purificar água contaminada.',
      level: 0,
      maxLevel: 10,
      experience: 0,
      experienceToNext: 100,
      category: 'survival',
      unlocked: false
    },
    // Social Skills
    {
      id: 'leadership',
      name: 'Liderança',
      description: 'Capacidade de liderar e motivar o grupo.',
      level: 1,
      maxLevel: 10,
      experience: 75,
      experienceToNext: 100,
      category: 'social',
      unlocked: true
    },
    {
      id: 'diplomacy',
      name: 'Diplomacia',
      description: 'Habilidade para resolver conflitos pacificamente.',
      level: 1,
      maxLevel: 10,
      experience: 25,
      experienceToNext: 100,
      category: 'social',
      unlocked: true
    },
    // Technical Skills
    {
      id: 'engineering',
      name: 'Engenharia',
      description: 'Conhecimento para construir e reparar equipamentos.',
      level: 0,
      maxLevel: 10,
      experience: 0,
      experienceToNext: 150,
      category: 'technical',
      unlocked: false
    },
    {
      id: 'medicine',
      name: 'Medicina',
      description: 'Habilidades médicas para tratar ferimentos e doenças.',
      level: 2,
      maxLevel: 10,
      experience: 180,
      experienceToNext: 200,
      category: 'technical',
      unlocked: true
    },
    // Combat Skills
    {
      id: 'melee_combat',
      name: 'Combate Corpo a Corpo',
      description: 'Proficiência em combate próximo.',
      level: 1,
      maxLevel: 10,
      experience: 60,
      experienceToNext: 100,
      category: 'combat',
      unlocked: true
    }
  ];

  const categories = [
    { id: 'survival', name: 'Sobrevivência', icon: '🌿', color: 'text-green-400' },
    { id: 'social', name: 'Social', icon: '👥', color: 'text-blue-400' },
    { id: 'technical', name: 'Técnico', icon: '🔧', color: 'text-yellow-400' },
    { id: 'combat', name: 'Combate', icon: '⚔️', color: 'text-red-400' }
  ];

  const filteredSkills = playerSkills.filter(skill => skill.category === selectedCategory);

  const getProgressPercentage = (skill: Skill) => {
    return (skill.experience / (skill.experience + skill.experienceToNext)) * 100;
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
        <h1 className="text-2xl font-bold text-green-400 font-mono mb-2 flex items-center">
          <TrendingUp className="mr-2 h-6 w-6" />
          DESENVOLVIMENTO
        </h1>
        <p className="text-slate-300 text-sm">
          Evolua suas habilidades através da experiência e treinamento.
        </p>
      </div>

      {/* Character Info */}
      <Card className="bg-slate-800/70 border-slate-700 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">{playerCharacter.name}</h3>
              <p className="text-slate-400 text-sm">
                Especialização: {playerCharacter.traits.join(', ')}
              </p>
            </div>
            <div className="text-right">
              <div className="text-green-400 font-mono">Nível Geral: 5</div>
              <div className="text-slate-400 text-sm">XP Total: 540</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`h-16 flex-col ${
              selectedCategory === category.id
                ? 'bg-slate-700 text-white border-2 border-green-500'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <div className="text-lg mb-1">{category.icon}</div>
            <div className="text-xs">{category.name}</div>
          </Button>
        ))}
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {filteredSkills.map((skill) => (
          <Card 
            key={skill.id} 
            className={`bg-slate-800/70 border-slate-700 ${
              skill.unlocked ? 'hover:bg-slate-800' : 'opacity-60'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-white font-semibold mr-2">{skill.name}</h3>
                    {!skill.unlocked && <Lock className="h-4 w-4 text-slate-500" />}
                    {skill.level > 0 && (
                      <div className="flex ml-2">
                        {Array.from({ length: skill.level }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{skill.description}</p>
                  
                  {skill.unlocked && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">
                          Nível {skill.level}/{skill.maxLevel}
                        </span>
                        <span className="text-slate-500">
                          {skill.experience}/{skill.experience + skill.experienceToNext} XP
                        </span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(skill)} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
              </div>

              {skill.unlocked && skill.level < skill.maxLevel && (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled
                >
                  Treinar (Em desenvolvimento)
                </Button>
              )}

              {!skill.unlocked && (
                <div className="text-xs text-slate-500">
                  Desbloqueie através de experiência ou treinamento específico.
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training Info */}
      <Card className="mt-6 bg-blue-900/20 border-blue-800">
        <CardContent className="p-4">
          <div className="text-blue-400 mb-2 font-semibold">💡 Sistema de Treinamento</div>
          <p className="text-blue-300 text-sm">
            Habilidades evoluem através da prática durante missões, interações com NPCs 
            e eventos especiais. Algumas habilidades só podem ser desbloqueadas com 
            treinamento específico ou descobertas na ilha.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
