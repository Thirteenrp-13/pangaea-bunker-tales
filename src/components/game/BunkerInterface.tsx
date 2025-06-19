
import React from 'react';
import { 
  Compass, 
  Users, 
  Package, 
  TrendingUp, 
  Calendar,
  Droplets,
  Utensils,
  Heart,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayerCharacter } from '../../pages/Index';
import { GameView } from './GameInterface';

interface BunkerInterfaceProps {
  playerCharacter: PlayerCharacter;
  gameDay: number;
  resources: {
    water: number;
    food: number;
    medicine: number;
    materials: number;
  };
  onNavigate: (view: GameView) => void;
}

export const BunkerInterface: React.FC<BunkerInterfaceProps> = ({
  playerCharacter,
  gameDay,
  resources,
  onNavigate
}) => {
  return (
    <div className="min-h-screen p-4 max-w-md mx-auto">
      {/* Smartwatch-style circular interface */}
      <div className="relative w-80 h-80 mx-auto mb-6">
        {/* Watch bezel */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 shadow-2xl">
          <div className="absolute inset-2 rounded-full bg-black overflow-hidden">
            
            {/* Digital display header */}
            <div className="bg-slate-900 p-3 text-center border-b border-slate-700">
              <div className="text-green-400 font-mono text-lg font-bold">
                DIA {gameDay}
              </div>
              <div className="text-slate-400 text-xs">
                BUNKER OPERACIONAL
              </div>
            </div>

            {/* Status display */}
            <div className="p-4 space-y-3">
              <div className="text-center mb-4">
                <div className="text-white font-semibold text-sm">
                  {playerCharacter.name.toUpperCase()}
                </div>
                <div className="flex justify-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Heart className="h-3 w-3 text-red-400 mr-1" />
                    <span className="text-xs text-red-400 font-mono">
                      {playerCharacter.stats.health}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 text-blue-400 mr-1" />
                    <span className="text-xs text-blue-400 font-mono">
                      {playerCharacter.stats.stamina}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-yellow-400 font-mono">
                      {playerCharacter.stats.morale}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between bg-slate-800 p-2 rounded">
                  <div className="flex items-center">
                    <Droplets className="h-3 w-3 text-blue-400 mr-1" />
                    <span className="text-blue-400">Água</span>
                  </div>
                  <span className="text-white font-mono">{resources.water}</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800 p-2 rounded">
                  <div className="flex items-center">
                    <Utensils className="h-3 w-3 text-orange-400 mr-1" />
                    <span className="text-orange-400">Food</span>
                  </div>
                  <span className="text-white font-mono">{resources.food}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="space-y-3">
        <Button
          onClick={() => onNavigate('missions')}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-xl"
        >
          <Compass className="mr-3 h-5 w-5" />
          EXPLORAR ILHA
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate('relationships')}
            variant="outline"
            className="h-12 border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
          >
            <Users className="mr-2 h-4 w-4" />
            Grupo
          </Button>
          <Button
            onClick={() => onNavigate('inventory')}
            variant="outline"
            className="h-12 border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
          >
            <Package className="mr-2 h-4 w-4" />
            Items
          </Button>
        </div>

        <Button
          onClick={() => onNavigate('skills')}
          variant="outline"
          className="w-full h-12 border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          DESENVOLVER HABILIDADES
        </Button>
      </div>

      {/* Status alerts */}
      {(resources.water < 5 || resources.food < 5) && (
        <Card className="mt-4 bg-red-900/30 border-red-800">
          <CardContent className="p-3">
            <div className="text-red-400 text-sm font-semibold">
              ⚠️ RECURSOS CRÍTICOS
            </div>
            <div className="text-red-300 text-xs mt-1">
              {resources.water < 5 && "Água em níveis perigosos! "}
              {resources.food < 5 && "Comida acabando! "}
              Tensão no grupo pode aumentar.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
