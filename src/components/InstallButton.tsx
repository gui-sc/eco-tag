import React from 'react';
import { Download } from 'lucide-react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export const InstallButton: React.FC = () => {
  const { isInstallable, handleInstallClick } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-200 z-50"
      aria-label="Instalar aplicativo"
    >
      <Download size={20} />
      <span className="hidden sm:inline">Instalar App</span>
    </button>
  );
};