
import React, { useState } from 'react';
import { ArrowLeft, Package, Droplets, Utensils, Heart, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerCharacter } from '../../pages/Index';

interface InventoryInterfaceProps {
  onBack: () => void;
  resources: {
    water: number;
    food: number;
    medicine: number;
    materials: number;
  };
  playerCharacter: PlayerCharacter;
}

interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'tool' | 'equipment' | 'consumable';
  description: string;
  quantity: number;
  rarity: 'common' | 'rare' | 'legendary';
}

export const InventoryInterface: React.FC<InventoryInterfaceProps> = ({ 
  onBack, 
  resources, 
  playerCharacter 
}) => {
  const [selectedTab, setSelectedTab] = useState<'resources' | 'items' | 'equipment'>('resources');

  const playerItems: Item[] = [
    {
      id: '1',
      name: 'Faca de Sobrevivência',
      type: 'weapon',
      description: 'Uma faca resistente, útil para caça e defesa.',
      quantity: 1,
      rarity: 'common'
    },
    {
      id: '2',
      name: 'Kit Médico',
      type: 'equipment',
      description: 'Suprimentos médicos básicos para primeiros socorros.',
      quantity: 2,
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Purificador Portátil',
      type: 'tool',
      description: 'Dispositivo para purificar água encontrada na ilha.',
      quantity: 1,
      rarity: 'legendary'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-slate-400 border-slate-600';
      case 'rare': return 'text-blue-400 border-blue-600';
      case 'legendary': return 'text-yellow-400 border-yellow-600';
      default: return 'text-slate-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon': return '⚔️';
      case 'tool': return '🔧';
      case 'equipment': return '🎒';
      case 'consumable': return '💊';
      default: return '📦';
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
        <h1 className="text-2xl font-bold text-green-400 font-mono mb-2 flex items-center">
          <Package className="mr-2 h-6 w-6" />
          INVENTÁRIO
        </h1>
        <p className="text-slate-300 text-sm">
          Gerencie seus recursos e equipamentos de sobrevivência.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800 rounded-lg p-1">
        {[
          { id: 'resources', label: 'Recursos' },
          { id: 'items', label: 'Itens' },
          { id: 'equipment', label: 'Equipamentos' }
        ].map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`flex-1 ${
              selectedTab === tab.id
                ? 'bg-green-600 text-white'
                : 'bg-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Resources Tab */}
      {selectedTab === 'resources' && (
        <div className="space-y-4">
          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recursos Básicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 text-blue-400 mr-2" />
                      <span className="text-blue-400 font-semibold">Água</span>
                    </div>
                    <span className="text-white font-mono text-lg">{resources.water}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {resources.water < 5 ? 'CRÍTICO - Riscos de desidratação' : 
                     resources.water < 10 ? 'BAIXO - Economize água' : 'ESTÁVEL'}
                  </div>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Utensils className="h-5 w-5 text-orange-400 mr-2" />
                      <span className="text-orange-400 font-semibold">Comida</span>
                    </div>
                    <span className="text-white font-mono text-lg">{resources.food}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {resources.food < 5 ? 'CRÍTICO - Risco de fome' : 
                     resources.food < 10 ? 'BAIXO - Busque mais alimentos' : 'ESTÁVEL'}
                  </div>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-red-400 mr-2" />
                      <span className="text-red-400 font-semibold">Medicina</span>
                    </div>
                    <span className="text-white font-mono text-lg">{resources.medicine}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Suprimentos médicos para emergências
                  </div>
                </div>

                <div className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Wrench className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-400 font-semibold">Materiais</span>
                    </div>
                    <span className="text-white font-mono text-lg">{resources.materials}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Para reparos e construções
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {(resources.water < 5 || resources.food < 5) && (
            <Card className="bg-red-900/30 border-red-800">
              <CardContent className="p-4">
                <div className="text-red-400 font-semibold mb-2">⚠️ SITUAÇÃO CRÍTICA</div>
                <p className="text-red-300 text-sm">
                  Recursos essenciais em níveis perigosos. O moral do grupo pode desabar e 
                  conflitos internos podem emergir. Priorize missões de coleta!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Items Tab */}
      {selectedTab === 'items' && (
        <div className="space-y-4">
          {playerItems.map((item) => (
            <Card key={item.id} className={`bg-slate-800/70 border-2 ${getRarityColor(item.rarity)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getTypeIcon(item.type)}</div>
                    <div>
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-slate-500">Tipo: {item.type}</span>
                        <span className={getRarityColor(item.rarity)}>
                          {item.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-mono text-lg">x{item.quantity}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Equipment Tab */}
      {selectedTab === 'equipment' && (
        <div className="space-y-4">
          <Card className="bg-slate-800/70 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Status de Equipamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-300 text-center py-8">
                <Package className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                <p>Sistema de equipamentos em desenvolvimento.</p>
                <p className="text-sm text-slate-500 mt-2">
                  Em breve você poderá equipar e gerenciar seus itens.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
