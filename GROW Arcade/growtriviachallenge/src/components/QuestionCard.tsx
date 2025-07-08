import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  showResult: boolean;
  isCorrect: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  isCorrect
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'soil': return 'border-amber-400';
      case 'plant': return 'border-[#8cb43a]';
      case 'animal': return 'border-blue-400';
      case 'human': return 'border-purple-400';
      case 'planetary': return 'border-indigo-400';
      default: return 'border-[#8cb43a]';
    }
  };

  const getButtonStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'bg-[#8cb43a] text-white hover:bg-[#7ba034]' 
        : 'bg-white border-2 border-[#8cb43a] text-[#8cb43a] hover:bg-[#f0f8e8]';
    }
    
    if (index === question.correctAnswer) {
      return 'bg-[#8cb43a] text-white';
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'bg-red-500 text-white';
    }
    
    return 'bg-gray-200 text-gray-500';
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Removed SVG background, now handled by parent */}
      <Card className={`mb-4 border-4 ${getCategoryColor(question.category)} shadow-xl animate-slide-up bg-white/95 backdrop-blur-sm rounded-2xl relative z-10 w-full`}>
        <CardHeader className="bg-gradient-to-r from-[#8cb43a] to-[#7ba034] text-white rounded-t-2xl p-4">
          <CardTitle className="text-xl text-center font-extrabold">
            {question.text}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 bg-white rounded-b-2xl">
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => !showResult && onAnswerSelect(index)}
                disabled={showResult}
                className={`${getButtonStyle(index)} py-2 px-4 h-auto text-left justify-start transition-all duration-200 transform hover:scale-105 font-bold text-base rounded-full shadow-md animate-farm-bounce`}
                variant="outline"
              >
                <span className="font-bold mr-3 text-base">{String.fromCharCode(65 + index)}.</span>
                <span className="text-base">{option}</span>
              </Button>
            ))}
          </div>
          {showResult && (
            <div className={`mt-4 p-4 rounded-xl animate-bounce-in ${
              isCorrect ? 'bg-[#8cb43a]/10 border-[#8cb43a]' : 'bg-red-100 border-red-400'
            } border-2 shadow-lg`}>
              <div className={`font-extrabold text-lg mb-2 ${
                isCorrect ? 'text-[#8cb43a]' : 'text-red-700'
              }`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              {question.explanation && (
                <p className="text-gray-700 text-base">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;