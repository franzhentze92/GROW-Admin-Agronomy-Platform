import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameStatsProps {
  totalQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
}

const GameStats: React.FC<GameStatsProps> = ({
  totalQuestions,
  correctAnswers,
  currentStreak,
  bestStreak
}) => {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const getCategoryIcon = (category: string) => {
    const icons = {
      soil: '🌱',
      plant: '🌿',
      animal: '🐾',
      human: '👤',
      planetary: '🌍'
    };
    return icons[category as keyof typeof icons] || '❓';
  };

  return (
    <div className="flex justify-center mb-2 w-full">
      <Card className="rounded-2xl shadow-xl border-4 border-[#8cb43a] bg-white/95 backdrop-blur-sm px-2 py-2 flex items-center max-w-md w-full">
        <CardContent className="p-0 w-full">
          <div className="grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-1 w-full text-xs font-bold text-center">
            <div className="flex flex-col items-center min-w-[30px]">
              <span className="text-lg">❓</span>
              <span>Answered</span>
              <span className="text-[#7ed957]">{totalQuestions}</span>
            </div>
            <div className="flex flex-col items-center min-w-[30px]">
              <span className="text-lg">✅</span>
              <span>Correct</span>
              <span className="text-green-600">{correctAnswers}</span>
            </div>
            <div className="flex flex-col items-center min-w-[30px]">
              <span className="text-lg">🎯</span>
              <span>Accuracy</span>
              <span className="text-blue-600">{accuracy}%</span>
            </div>
            <div className="flex flex-col items-center min-w-[30px]">
              <span className="text-lg">🔥</span>
              <span>Streak</span>
              <span className="text-orange-500">{currentStreak}</span>
            </div>
            <div className="flex flex-col items-center min-w-[30px]">
              <span className="text-lg">🏆</span>
              <span>Best</span>
              <span className="text-yellow-600">{bestStreak}</span>
            </div>
            <div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameStats;