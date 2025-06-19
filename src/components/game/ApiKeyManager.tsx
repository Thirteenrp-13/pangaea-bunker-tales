
import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { setApiKey, clearApiKey } from '../../services/deepseekService';

interface ApiKeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySet: () => void;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  isOpen,
  onClose,
  onKeySet
}) => {
  const [apiKey, setApiKeyValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [hasExistingKey, setHasExistingKey] = useState(false);

  useEffect(() => {
    const existingKey = localStorage.getItem('deepseek_api_key');
    setHasExistingKey(!!existingKey);
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      onKeySet();
      onClose();
    }
  };

  const handleClearKey = () => {
    clearApiKey();
    setApiKeyValue('');
    setHasExistingKey(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Key className="mr-2 h-5 w-5" />
            Configuração da API DeepSeek
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-amber-900/30 border-amber-700">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-amber-200">
              Por segurança, a chave API é armazenada apenas no seu navegador e nunca é enviada para nossos servidores.
            </AlertDescription>
          </Alert>

          {hasExistingKey && (
            <div className="bg-green-900/30 border border-green-700 rounded p-3">
              <p className="text-green-200 text-sm">
                ✓ Chave API já configurada
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-slate-300 text-sm">
              Chave API do DeepSeek:
            </label>
            <div className="relative">
              <Input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKeyValue(e.target.value)}
                placeholder="sk-..."
                className="bg-slate-900 border-slate-600 text-white pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-slate-700"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            <p>Para obter sua chave API:</p>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Acesse <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">platform.deepseek.com</a></li>
              <li>Faça login ou crie uma conta</li>
              <li>Vá para "API Keys" no painel</li>
              <li>Crie uma nova chave API</li>
            </ol>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Salvar Chave
            </Button>
            {hasExistingKey && (
              <Button
                onClick={handleClearKey}
                variant="destructive"
                className="flex-1"
              >
                Limpar
              </Button>
            )}
          </div>

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full text-slate-400 hover:text-white"
          >
            Cancelar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
