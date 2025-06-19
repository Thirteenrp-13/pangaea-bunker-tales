
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MissionInterfaceProps {
  onBack: () => void;
  resources: {
    water: number;
    food: number;
    medicine: number;
    materials: number;
  };
  setResources: (resources: any) => void;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  region: string;
  difficulty: 'Baixa' | 'Média' | 'Alta';
  duration: string;
  rewards: string[];
  risks: string[];
}

export const MissionInterface: React.FC<MissionInterfaceProps> = ({ 
  onBack, 
  resources, 
  setResources 
}) => {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const availableMissions: Mission[] = [
    {
      id: '1',
      title: 'Explorar Praia Norte',
      description: 'Procurar por destroços do navio e suprimentos que possam ter sido arrastados pela maré.',
      region: 'Praia Norte',
      difficulty: 'Baixa',
      duration: '2 horas',
      rewards: ['Água: +2-4', 'Materiais: +1-3'],
      risks: ['Possível encontro com vida selvagem']
    },
    {
      id: '2',
      title: 'Investigar Floresta Densa',
      description: 'Buscar por fontes de água doce e plantas comestíveis, mas a vegetação é perigosa.',
      region: 'Floresta Central',
      difficulty: 'Alta',
      duration: '4 horas',
      rewards: ['Água: +5-8', 'Comida: +3-6', 'Medicina: +1-2'],
      risks: ['Animais perigosos', 'Plantas venenosas', 'Possibilidade de se perder']
    },
    {
      id: '3',
      title: 'Escalar Colina Rochosa',
      description: 'Subir até o ponto mais alto para ter uma visão geral da ilha e procurar sinais de civilização.',
      region: 'Colinas Rochosas',
      difficulty: 'Média',
      duration: '3 horas',
      rewards: ['Mapa da região', 'Possível sinal de rádio'],
      risks: ['Queda de rochas', 'Fadiga extrema']
    }
  ];

  const executeMission = (mission: Mission) => {
    // Simular resultado da missão
    const success = Math.random() > 0.3; // 70% chance de sucesso
    
    if (success) {
      // Calcular recompensas aleatórias
      const waterGain = Math.floor(Math.random() * 3) + 2;
      const foodGain = Math.floor(Math.random() * 3) + 1;
      
      setResources({
        ...resources,
        water: resources.water + waterGain,
        food: resources.food + foodGain,
        materials: resources.materials + 1
      });
      
      alert(`Missão concluída com sucesso!\n+${waterGain} Água\n+${foodGain} Comida\n+1 Material`);
    } else {
      // Falha na missão
      const energyLoss = Math.floor(Math.random() * 10) + 5;
      alert(`A missão falhou! Você perdeu ${energyLoss} pontos de energia e retornou ao bunker.`);
    }
    
    onBack();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Baixa': return 'text-green-400';
      case 'Média': return 'text-yellow-400';
      case 'Alta': return 'text-red-400';
      default: return 'text-slate-400';
    }
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
          EXPLORAÇÃO DA ILHA
        </h1>
        <p className="text-slate-300 text-sm">
          Escolha cuidadosamente suas missões. Cada região apresenta diferentes riscos e recompensas.
        </p>
      </div>

      {!selectedMission ? (
        <div className="space-y-4">
          {availableMissions.map((mission) => (
            <Card 
              key={mission.id}
              className="bg-slate-800/70 border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={() => setSelectedMission(mission)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-lg">
                    {mission.title}
                  </CardTitle>
                  <div className={`text-sm font-semibold ${getDifficultyColor(mission.difficulty)}`}>
                    {mission.difficulty}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-300 text-sm mb-3">
                  {mission.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {mission.region}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {mission.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-xl">
                {selectedMission.title}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedMission.region}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedMission.duration}
                </div>
                <div className={`font-semibold ${getDifficultyColor(selectedMission.difficulty)}`}>
                  {selectedMission.difficulty}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                {selectedMission.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-green-400 font-semibold mb-2 text-sm">
                    Recompensas Possíveis:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    {selectedMission.rewards.map((reward, index) => (
                      <li key={index}>• {reward}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-red-400 font-semibold mb-2 text-sm flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Riscos:
                  </h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    {selectedMission.risks.map((risk, index) => (
                      <li key={index}>• {risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button
              onClick={() => setSelectedMission(null)}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => executeMission(selectedMission)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Iniciar Missão
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
