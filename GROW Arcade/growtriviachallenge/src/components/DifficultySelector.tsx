import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DifficultySelectorProps {
  selectedDifficulty: 'easy' | 'medium' | 'hard' | null;
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelect
}) => {
  const difficulties = [
    {
      level: 'easy' as const,
      title: 'Seedling',
      icon: '🌱',
      color: 'bg-green-500',
      description: 'Perfect for beginners'
    },
    {
      level: 'medium' as const,
      title: 'Growing',
      icon: '🌿',
      color: 'bg-yellow-500',
      description: 'Ready for a challenge'
    },
    {
      level: 'hard' as const,
      title: 'Expert',
      icon: '🌳',
      color: 'bg-red-500',
      description: 'For true masters'
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Choose Your Difficulty</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          {difficulties.map((diff) => (
            <div
              key={diff.level}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 shadow-md flex flex-col items-center border-2
                ${selectedDifficulty === diff.level
                  ? 'bg-[#8cb43a] text-white font-extrabold border-[#8cb43a]'
                  : 'bg-[#f7e8b2] text-[#263c2a] border-[#f7c873] font-bold hover:bg-[#8cb43a] hover:text-white hover:font-extrabold hover:border-[#8cb43a]'}
              `}
              onClick={() => onSelect(diff.level)}
            >
              <div className="text-3xl mb-2 animate-pulse">{diff.icon}</div>
              <h4 className="text-lg mb-1">{diff.title}</h4>
              <p className="text-xs opacity-80">{diff.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DifficultySelector;