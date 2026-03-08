import { useContext } from 'react';
import { BioContext } from '../context/BioContext';

export default function ThemeControls() {
  // Pull in setBioData directly for bulletproof state updates
  const { bioData, setBioData } = useContext(BioContext);
  const { settings } = bioData;

  // Safely update JUST the color, protecting the rest of your state (like templateId)
  const handleColorChange = (color) => {
    setBioData(prev => ({ ...prev, settings: { ...prev.settings, themeColor: color } }));
  };

  // Safely update JUST the font
  const handleFontChange = (font) => {
    setBioData(prev => ({ ...prev, settings: { ...prev.settings, fontFamily: font } }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 w-full max-w-[210mm] mb-6 flex justify-between items-center">
      
      {/* Font Controls */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500">Font:</span>
        <button type="button" onClick={() => handleFontChange('font-sans')} className={`px-3 py-1 rounded border text-sm ${settings.fontFamily === 'font-sans' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>Sans</button>
        <button type="button" onClick={() => handleFontChange('font-serif')} className={`px-3 py-1 rounded border text-sm font-serif ${settings.fontFamily === 'font-serif' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>Serif</button>
      </div>

      {/* Color Controls */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500">Theme:</span>
        <button type="button" onClick={() => handleColorChange('pink')} className={`w-6 h-6 rounded-full bg-pink-600 border-2 ${settings.themeColor === 'pink' ? 'border-gray-800 scale-110' : 'border-transparent'}`} title="Pink"></button>
        <button type="button" onClick={() => handleColorChange('blue')} className={`w-6 h-6 rounded-full bg-blue-600 border-2 ${settings.themeColor === 'blue' ? 'border-gray-800 scale-110' : 'border-transparent'}`} title="Blue"></button>
        <button type="button" onClick={() => handleColorChange('neutral')} className={`w-6 h-6 rounded-full bg-slate-800 border-2 ${settings.themeColor === 'neutral' ? 'border-gray-400 scale-110' : 'border-transparent'}`} title="Neutral Black"></button>
      </div>

    </div>
  );
}