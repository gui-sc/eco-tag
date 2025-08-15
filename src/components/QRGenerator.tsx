import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { ArrowLeft, RefreshCw, Download, Share2 } from 'lucide-react';
import { WasteType } from '../types';

interface QRGeneratorProps {
  wasteType: WasteType;
  onBack: () => void;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ wasteType, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      generateQRCode();
    }
  }, [wasteType.qrText]);

  const generateQRCode = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    try {
      await QRCode.toCanvas(canvasRef.current, wasteType.qrText, {
        width: 300,
        margin: 3,
        color: {
          dark: '#1F2937',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `qr-${wasteType.id}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], `qr-${wasteType.id}.png`, { type: 'image/png' });
          await navigator.share({
            title: `QR Code - ${wasteType.name}`,
            text: `QR Code para descarte de ${wasteType.name}`,
            files: [file]
          });
        }
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Voltar"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">QR Code Gerado</h1>
              <p className="text-sm text-gray-600">{wasteType.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Waste Type Badge */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${wasteType.bgColor} ${wasteType.color} mb-6`}>
            <span className="font-semibold text-lg">{wasteType.name}</span>
          </div>

          {/* QR Code Container */}
          <div className="bg-gray-50 p-8 rounded-xl mb-6 relative">
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl">
                <RefreshCw className="animate-spin text-gray-400" size={32} />
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="mx-auto block max-w-full h-auto"
              aria-label={`QR Code para ${wasteType.name}`}
            />
          </div>

          {/* QR Code Info */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Código QR contém:</p>
            <p className="font-mono text-xl font-bold text-gray-800 bg-white px-4 py-2 rounded-lg">
              {wasteType.qrText}
            </p>
          </div>

          {/* Instructions */}
          <div className="text-left bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
              📱 Como usar o QR Code:
            </h3>
            <ol className="text-sm text-blue-700 space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span>Aproxime o leitor de QR Code do sistema de coleta</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span>O sistema identificará automaticamente o tipo de resíduo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span>Descarte o material no compartimento indicado</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={generateQRCode}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <RefreshCw size={18} className={isGenerating ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Gerar Novo</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Baixar</span>
            </button>

            {navigator.share && (
              <button
                onClick={handleShare}
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <Share2 size={18} />
                <span className="hidden sm:inline">Compartilhar</span>
              </button>
            )}
            
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Voltar
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start gap-4">
            <div className="text-2xl">♻️</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Sobre este resíduo:</h4>
              <p className="text-gray-600 text-sm mb-3">{wasteType.description}</p>
              <p className="text-xs text-gray-500">
                Lembre-se: o descarte correto ajuda a preservar o meio ambiente e facilita a reciclagem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};