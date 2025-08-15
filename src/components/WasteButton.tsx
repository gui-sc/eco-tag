import React from 'react';
import * as LucideIcons from 'lucide-react';
import { WasteType } from '../types';

interface WasteButtonProps {
  wasteType: WasteType;
  onClick: (wasteType: WasteType) => void;
}

export const WasteButton: React.FC<WasteButtonProps> = ({ wasteType, onClick }) => {
  // Obtém o ícone dinamicamente do Lucide React
  const IconComponent = (LucideIcons as any)[wasteType.icon] as React.ComponentType<{size?: number}>;

  return (
    <button
      onClick={() => onClick(wasteType)}
      className={`
        w-full min-h-[100px] h-auto p-4 rounded-xl shadow-lg border-2 border-opacity-20 
        ${wasteType.bgColor} ${wasteType.color}
        transform transition-all duration-200 ease-out
        hover:scale-105 hover:shadow-2xl hover:-translate-y-1
        active:scale-95 active:shadow-md active:translate-y-0
        focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
        flex flex-col items-center justify-center gap-3
        font-semibold text-base sm:text-lg
        relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-200
        hover:before:opacity-100
      `}
      aria-label={`Descartar ${wasteType.name}`}
    >
      {/* Ícone */}
      <div className="relative z-10">
        {IconComponent && <IconComponent size={32} />}
      </div>
      
      {/* Texto Principal */}
      <div className="relative z-10 text-center leading-tight">
        <span className="block">{wasteType.name}</span>
        
        {/* Descrição pequena */}
        <span className="text-xs opacity-80 mt-1 block font-normal">
          {wasteType.description}
        </span>
      </div>

      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
    </button>
  );
};