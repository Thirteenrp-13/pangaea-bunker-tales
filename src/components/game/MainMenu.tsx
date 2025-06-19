
import React from 'react';
import { Play, Book, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainMenuProps {
  onStartNewGame: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartNewGame }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-400 mb-4 font-mono">
            ILHA PERDIDA
          </h1>
          <p className="text-slate-300 text-lg">
            Sobreviva. Explore. Descubra o mistério.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-4"></div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-4">
            <Button 
              onClick={onStartNewGame}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              NOVO JOGO
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-slate-600 text-slate-300 hover:bg-slate-700"
              disabled
            >
              <Book className="mr-2 h-5 w-5" />
              CONTINUAR
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-slate-600 text-slate-300 hover:bg-slate-700"
              disabled
            >
              <Settings className="mr-2 h-5 w-5" />
              CONFIGURAÇÕES
            </Button>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>Um RPG de sobrevivência textual</p>
          <p className="mt-1">Versão Alpha 1.0</p>
        </div>
      </div>
    </div>
  );
};
