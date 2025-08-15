import React, { useState } from 'react';
import { Recycle as Recycle2 } from 'lucide-react';
import { WasteButton } from './components/WasteButton';
import { QRGenerator } from './components/QRGenerator';
import { InstallButton } from './components/InstallButton';
import { wasteTypes } from './data/wasteTypes';
import { WasteType } from './types';

function App() {
  const [selectedWaste, setSelectedWaste] = useState<WasteType | null>(null);

  const handleWasteClick = (wasteType: WasteType) => {
    setSelectedWaste(wasteType);
  };

  const handleBack = () => {
    setSelectedWaste(null);
  };

  if (selectedWaste) {
    return <QRGenerator wasteType={selectedWaste} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Install Button */}
      <InstallButton />

      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-full">
              <Recycle2 size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              EcoTag
            </h1>
          </div>
          <p className="text-gray-600 text-center text-sm md:text-base">
            Aprenda a descartar corretamente seus resíduos
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Como usar:
          </h2>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <span>Escolha o tipo de resíduo que você quer descartar</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <span>Um QR Code será gerado automaticamente</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <span>Use o QR Code no sistema de coleta seletiva</span>
            </li>
          </ol>
        </div>

        {/* Waste Type Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wasteTypes.map((wasteType) => (
            <WasteButton
              key={wasteType.id}
              wasteType={wasteType}
              onClick={handleWasteClick}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;