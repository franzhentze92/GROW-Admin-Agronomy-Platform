import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoryCardProps {
  category: 'soil' | 'plant' | 'animal' | 'human' | 'planetary';
  icon: string;
  title: string;
  description: string;
  bgGradient: string;
  onClick: () => void;
  isSelected: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  icon,
  title,
  description,
  bgGradient,
  onClick,
  isSelected
}) => {
  return (
    <Card 
      className={`rounded-2xl transition-all duration-300 transform shadow-lg border-2 cursor-pointer hover:scale-105
        ${isSelected ? 'bg-[#8cb43a] text-white font-extrabold border-[#8cb43a]' : 'bg-white/90 text-[#263c2a] border-[#f7c873] hover:bg-[#8cb43a] hover:text-white hover:font-extrabold hover:border-[#8cb43a]'}
      `}
      onClick={onClick}
    >
      <CardContent className="p-6 rounded-2xl relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#f7c873]/10 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#8cb43a]/10 rounded-full -ml-8 -mb-8"></div>
        <div className="relative z-10">
          <div className="text-4xl mb-3 animate-bounce">{icon}</div>
          <h3 className="text-xl font-extrabold mb-2">{title}</h3>
          <p className="text-sm opacity-80 mb-3 font-medium">{description}</p>
          <Badge variant="secondary" className={`border-none font-bold ${isSelected ? 'bg-white/30 text-white' : 'bg-[#f7c873] text-[#263c2a]'}`}>{category.toUpperCase()}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;