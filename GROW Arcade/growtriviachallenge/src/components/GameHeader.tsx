import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface GameHeaderProps {
  score: number;
  level: number;
  progress: number;
  category: string;
  timeLeft: number;
  gameMode?: 'simple' | 'campaign' | null;
  currentStage?: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  level,
  progress,
  category,
  timeLeft,
  gameMode,
  currentStage
}) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'soil': return '🌱';
      case 'plant': return '🌿';
      case 'animal': return '🐄';
      case 'human': return '👨‍⚕️';
      case 'planetary': return '🌍';
      default: return '🎯';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'soil': return 'from-amber-400 to-yellow-600';
      case 'plant': return 'from-[#8cb43a] to-green-600';
      case 'animal': return 'from-blue-400 to-cyan-600';
      case 'human': return 'from-purple-400 to-pink-600';
      case 'planetary': return 'from-indigo-400 to-blue-600';
      default: return 'from-[#8cb43a] to-green-600';
    }
  };

  return (
    <Card className="rounded-2xl shadow-xl border-4 border-[#8cb43a] bg-white/95 backdrop-blur-sm px-2 py-2 flex items-center max-w-xs w-full">
      <CardContent className="p-0 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2 justify-between">
            <div className={`bg-gradient-to-r ${getCategoryColor(category)} text-white px-2 py-1 rounded-lg font-bold flex items-center gap-1 text-base`}>
              <span className="text-lg">{getCategoryIcon(category)}</span>
              <span className="capitalize text-sm">{category} Health</span>
            </div>
            {gameMode === 'campaign' && currentStage && (
              <Badge variant="outline" className="text-[#8cb43a] border-[#8cb43a] font-bold text-xs px-2 py-1">
                Stage {currentStage}/5
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="text-center flex-1">
              <div className="text-lg font-bold text-[#8cb43a]">{score}</div>
              <div className="text-xs text-gray-600">Score</div>
            </div>
            <div className="text-center flex-1">
              <div className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-[#8cb43a]'}`}>{timeLeft}s</div>
              <div className="text-xs text-gray-600">Time</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-lg font-bold text-[#8cb43a]">{level}</div>
              <div className="text-xs text-gray-600">Level</div>
            </div>
          </div>
          <div className="mt-1">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameHeader;