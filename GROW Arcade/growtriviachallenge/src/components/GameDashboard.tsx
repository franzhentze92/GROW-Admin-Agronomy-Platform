import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GameDashboardProps {
  onStartGame: (category: string, difficulty: string, mode: 'simple' | 'campaign') => void;
}

const avatars = [
  { id: 1, src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=User1', alt: 'User 1' },
  { id: 2, src: 'https://api.dicebear.com/7.x/adventurer/svg?seed=User2', alt: 'User 2' },
];

const stats = [
  { id: 1, label: '8018', icon: '●' },
  { id: 2, label: '1023', icon: '●' },
];

const navIcons = [
  { id: 1, icon: '⚙️', label: 'Settings' },
  { id: 2, icon: '🏆', label: 'Leaderboard' },
  { id: 3, icon: '🎯', label: 'Achievements' },
  { id: 4, icon: '❓', label: 'Help' },
];

const GameDashboard: React.FC<GameDashboardProps> = ({ onStartGame }) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<'simple' | 'campaign' | null>(null);

  const handleModeSelect = (selectedMode: 'simple' | 'campaign') => {
    setMode(selectedMode);
    setShowModal(true);
  };

  const handleStart = () => {
    if (mode) {
      // For demo, always use soil/easy for quick play, campaign for career
      onStartGame('soil', 'easy', mode);
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8f7b2] via-[#f7e8b2] to-[#b2f7ef] relative overflow-hidden p-4">
      {/* Playful SVG farm background */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1400" height="800" fill="#e8f7b2"/>
        <ellipse cx="700" cy="900" rx="900" ry="300" fill="#8cb43a"/>
        <ellipse cx="200" cy="700" rx="300" ry="80" fill="#f7c873"/>
        <ellipse cx="1200" cy="700" rx="200" ry="60" fill="#f7c873"/>
        <rect x="500" y="600" width="400" height="40" rx="20" fill="#f7c873"/>
        <ellipse cx="150" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
        <rect x="130" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
        <ellipse cx="1250" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
        <rect x="1230" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
        <rect x="250" y="400" width="120" height="100" fill="#d35400" stroke="#fff" strokeWidth="8"/>
        <polygon points="250,400 310,350 370,400" fill="#c0392b" stroke="#fff" strokeWidth="8"/>
        <circle cx="310" cy="470" r="18" fill="#fff"/>
        <rect x="1100" y="550" width="120" height="60" fill="#fff" stroke="#e74c3c" strokeWidth="6"/>
        <rect x="1100" y="540" width="120" height="20" fill="#e74c3c"/>
        <ellipse cx="900" cy="650" rx="30" ry="15" fill="#ffe066"/>
        <ellipse cx="950" cy="670" rx="30" ry="15" fill="#ffe066"/>
        <ellipse cx="1000" cy="650" rx="30" ry="15" fill="#ffe066"/>
        <ellipse cx="600" cy="700" rx="30" ry="20" fill="#fff"/>
        <ellipse cx="620" cy="720" rx="10" ry="8" fill="#333"/>
        <ellipse cx="650" cy="700" rx="30" ry="20" fill="#fff"/>
        <circle cx="1300" cy="180" r="90" fill="#ffe066"/>
        <ellipse cx="400" cy="200" rx="120" ry="40" fill="#fff" opacity="0.8"/>
        <ellipse cx="600" cy="150" rx="80" ry="30" fill="#fff" opacity="0.7"/>
        <ellipse cx="1000" cy="220" rx="100" ry="35" fill="#fff" opacity="0.8"/>
      </svg>
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-12 w-full flex flex-col items-center border-4 border-[#8cb43a]">
          <h1 className="text-5xl font-extrabold text-[#263c2a] text-center mb-4 tracking-tight drop-shadow-lg">G.R.O.W Trivia Challenge</h1>
          <p className="text-xl text-[#263c2a] text-center mb-8 font-semibold">Cultivate your knowledge on a playful farm adventure!</p>
          <div className="flex flex-row gap-8 w-full justify-center">
            <Button onClick={() => handleModeSelect('simple')} className="flex flex-col items-center justify-center bg-[#8cb43a] hover:bg-[#7ba034] text-white font-bold text-2xl rounded-2xl shadow-lg px-10 py-8 gap-2 transition-all border-4 border-[#263c2a] w-56 h-48">
              <span className="text-5xl mb-2">⏱️</span>
              Start Game
              <span className="text-base font-semibold mt-2">Quick Play</span>
            </Button>
            <Button onClick={() => handleModeSelect('campaign')} className="flex flex-col items-center justify-center bg-[#f7c873] hover:bg-[#f7b23b] text-[#263c2a] font-bold text-2xl rounded-2xl shadow-lg px-10 py-8 gap-2 transition-all border-4 border-[#263c2a] w-56 h-48">
              <span className="text-5xl mb-2">🌱</span>
              Campaign Mode
              <span className="text-base font-semibold mt-2">Farm Quest</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Modal for mode selection (difficulty, etc.) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative animate-bounce-in">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
            <h2 className="text-2xl font-bold text-[#8cb43a] mb-4 text-center">Ready to Start?</h2>
            <div className="flex flex-col gap-4 mb-6">
              <Button onClick={handleStart} className="bg-[#8cb43a] text-white hover:bg-green-600 font-bold py-4 px-8 text-xl rounded-full shadow-md">
                Start {mode === 'simple' ? 'Quick Play' : 'Career Mode'}!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDashboard;