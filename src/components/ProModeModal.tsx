import React, { useState, useRef, useEffect } from 'react';
import { Crown, X, Eye, EyeOff } from 'lucide-react';

interface ProModeModalProps {
  onAuthenticate: (success: boolean) => void;
  onCancel: () => void;
}

export const ProModeModal: React.FC<ProModeModalProps> = ({
  onAuthenticate,
  onCancel,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    if (username === 'lollo' && password === 'qyjsu0-vymkyP-zepmuw') {
      onAuthenticate(true);
    } else {
      setError('Username o password non corretti. Riprova.');
      onAuthenticate(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Modalità PRO
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Inserisci le credenziali per attivare la modalità PRO
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(''); // Clear error when user types
              }}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white backdrop-blur-md placeholder-gray-500 dark:placeholder-gray-400"
              style={{ outline: 'none', boxShadow: 'none' }}
              placeholder="Inserisci username..."
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(''); // Clear error when user types
                }}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white backdrop-blur-md placeholder-gray-500 dark:placeholder-gray-400"
                style={{ outline: 'none', boxShadow: 'none' }}
                placeholder="Inserisci password..."
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100/80 dark:bg-red-900/20 border border-red-300 dark:border-red-600 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#ffcc00] hover:bg-[#ffcc00]/90 text-white rounded-lg transition-colors backdrop-blur-md"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <Crown className="w-4 h-4" />
              Attiva PRO
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500/80 hover:bg-gray-600/80 text-white rounded-lg transition-colors backdrop-blur-md"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <X className="w-4 h-4" />
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};