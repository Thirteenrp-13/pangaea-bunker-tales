
import React from 'react';
import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DailyEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: string;
  day: number;
}

export const DailyEventModal: React.FC<DailyEventModalProps> = ({
  isOpen,
  onClose,
  event,
  day
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-green-400 flex items-center">
            <Bot className="mr-2 h-5 w-5" />
            Evento do Dia {day}
          </CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
            <p className="text-slate-200 leading-relaxed">
              {event}
            </p>
          </div>
          <div className="text-xs text-slate-500 mb-4">
            * Este evento foi gerado pela Pangaea I.A. baseado em suas ações anteriores.
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
