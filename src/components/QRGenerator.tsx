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
          {/* <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Código QR contém:</p>
            <p className="font-mono text-xl font-bold text-gray-800 bg-white px-4 py-2 rounded-lg">
              {wasteType.qrText}
            </p>
          </div> */}


            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Voltar
            </button>
        </div>

      </div>
    </div>
  );
};