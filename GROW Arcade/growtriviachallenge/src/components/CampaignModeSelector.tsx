import React from 'react';
import { Button } from '@/components/ui/button';
import { useCampaignState } from '@/hooks/useCampaignState';

interface CampaignModeSelectorProps {
  onStartCampaign: () => void;
  onBack: () => void;
}

const stages = [
  { icon: '🌱', label: 'Soil Health', x: 100, y: 320 },
  { icon: '🌿', label: 'Plant Health', x: 350, y: 180 },
  { icon: '🐄', label: 'Animal Health', x: 600, y: 260 },
  { icon: '👨‍⚕️', label: 'Human Health', x: 900, y: 180 },
  { icon: '🌍', label: 'Planetary Health', x: 1150, y: 320 },
];

const CampaignModeSelector: React.FC<CampaignModeSelectorProps> = ({ onStartCampaign, onBack }) => {
  const { currentStage } = useCampaignState();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eaf7d1] p-4">
      <div className="w-full max-w-[1400px] mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center border-4 border-[#e2c275] relative">
        <h1 className="text-4xl font-extrabold text-[#7b4a12] text-center mb-2 mt-2 drop-shadow-lg font-serif tracking-wider" style={{letterSpacing:'0.04em'}}>🏆 Campaign Journey: Farm Adventure Map 🏆</h1>
        <p className="text-lg text-[#7b4a12] opacity-90 mb-8 text-center font-serif">Score 75% or higher in each category to advance!</p>
        <div className="relative w-full flex justify-center items-center" style={{height: 440}}>
          {/* Farm-style SVG background */}
          <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none" className="rounded-2xl shadow-lg" style={{background:'linear-gradient(180deg, #eaf7d1 0%, #c6e6a6 100%)'}}>
            {/* Patchwork fields */}
            <polygon points="0,400 0,300 200,320 400,340 600,320 800,350 1000,330 1200,350 1200,400" fill="#d6eabf" />
            <polygon points="0,320 100,250 300,270 500,250 700,270 900,250 1200,320 1200,350 1000,330 800,350 600,320 400,340 200,320 0,300" fill="#f7e8b2" />
            <ellipse cx="200" cy="200" rx="90" ry="40" fill="#e0f7b2" />
            <ellipse cx="800" cy="300" rx="100" ry="30" fill="#e0d7c2" />
            <ellipse cx="1000" cy="200" rx="60" ry="25" fill="#e6cfa7" />
            <ellipse cx="400" cy="120" rx="80" ry="30" fill="#b7dba7" />
            {/* Small pond */}
            <ellipse cx="1050" cy="370" rx="25" ry="10" fill="#b2f7ef" />
            {/* Hay bales */}
            <ellipse cx="300" cy="370" rx="18" ry="8" fill="#ffe066" />
            <ellipse cx="330" cy="380" rx="12" ry="6" fill="#ffe066" />
            {/* Crops */}
            <rect x="700" y="340" width="30" height="10" rx="5" fill="#8cb43a" />
            <rect x="740" y="350" width="30" height="10" rx="5" fill="#b7dba7" />
            {/* Winding dirt path */}
            <path d="M100,320 Q250,200 350,180 Q500,160 600,260 Q750,360 900,180 Q1050,100 1150,320" stroke="#e2c275" strokeWidth="18" fill="none" />
            <path d={`M100,320 Q250,200 350,180 Q500,160 600,260 Q750,360 900,180 Q1050,100 1150,320`} stroke="#b97a56" strokeWidth="10" fill="none" style={{strokeDasharray: `${(currentStage)/(stages.length-1)*1200} 1200`}} />
            {/* Sun and clouds */}
            <circle cx="1150" cy="60" r="40" fill="#ffe066" />
            <ellipse cx="300" cy="80" rx="60" ry="18" fill="#fff" opacity="0.7"/>
            <ellipse cx="900" cy="60" rx="40" ry="12" fill="#fff" opacity="0.7"/>
            {/* Barn, silo, windmill, tractor at edges */}
            <rect x="60" y="340" width="40" height="30" fill="#d35400" stroke="#fff" strokeWidth="4"/>
            <polygon points="60,340 80,320 100,340" fill="#c0392b" stroke="#fff" strokeWidth="4"/>
            <rect x="120" y="330" width="18" height="30" fill="#e6e6e6" stroke="#b0b0b0" strokeWidth="2"/>
            <rect x="160" y="350" width="10" height="20" fill="#b0b0b0" stroke="#fff" strokeWidth="2"/>
            <rect x="1120" y="340" width="20" height="30" rx="8" fill="#b97a56"/>
            <ellipse cx="1180" cy="370" rx="18" ry="8" fill="#8cb43a"/>
            {/* Windmill */}
            <rect x="180" y="320" width="8" height="30" fill="#e6e6e6" stroke="#b0b0b0" strokeWidth="2"/>
            <circle cx="184" cy="320" r="6" fill="#fff" stroke="#b0b0b0" strokeWidth="2"/>
            {/* Tractor */}
            <rect x="1050" y="350" width="30" height="14" fill="#f7c873" stroke="#b97a56" strokeWidth="2"/>
            <circle cx="1060" cy="364" r="6" fill="#b97a56" />
            <circle cx="1075" cy="364" r="6" fill="#b97a56" />
            {/* X for final stage */}
            <text x="1170" y="340" fontSize="36" fontWeight="bold" fill="#c0392b" stroke="#fff" strokeWidth="3">X</text>
          </svg>
          {/* Stage nodes */}
          {stages.map((stage, idx) => (
            <div
              key={stage.label}
              className="absolute flex flex-col items-center"
              style={{ left: stage.x, top: stage.y, width: 140 }}
            >
              {idx === currentStage && (
                <div className="mb-2 px-4 py-1 rounded-full bg-[#fffbe6] border-2 border-[#8cb43a] shadow-lg text-[#8cb43a] font-bold text-base animate-pulse">You are here!</div>
              )}
              <div className={`rounded-full border-4 shadow-lg flex items-center justify-center mb-2 bg-white ${idx === currentStage ? 'border-[#8cb43a] scale-110' : idx < currentStage ? 'border-[#8cb43a] opacity-90' : 'border-gray-300 opacity-60'} w-24 h-24`} style={{fontSize:'2.2rem'}}>
                <span>{stage.icon}</span>
              </div>
              <div className={`text-center font-bold text-lg font-sans ${idx === currentStage ? 'text-[#7b4a12]' : idx < currentStage ? 'text-[#8cb43a]' : 'text-[#bfa76a]'}`}>{stage.label}</div>
              <div className={`text-xs font-sans ${idx === currentStage ? 'text-[#8cb43a]' : 'text-[#bfa76a]'}`}>Stage {idx+1}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center w-full">
          <Button 
            onClick={onStartCampaign}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 text-2xl mb-4 rounded-full shadow-lg font-sans tracking-wider"
            size="lg"
          >
            Begin Campaign Journey 🚜
          </Button>
          <Button 
            onClick={onBack}
            variant="outline"
            className="bg-white/20 border-[#c2a15a] text-[#7b4a12] hover:bg-[#f7e8b2] hover:text-[#7b4a12] rounded-full font-sans px-8 py-3"
          >
            ← Back to Mode Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignModeSelector;