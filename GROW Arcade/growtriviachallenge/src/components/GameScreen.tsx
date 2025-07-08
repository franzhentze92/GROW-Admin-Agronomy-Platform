import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GameHeader from './GameHeader';
import QuestionCard from './QuestionCard';
import GameStats from './GameStats';
import GameDashboard from './GameDashboard';
import GameModeSelector from './GameModeSelector';
import CampaignModeSelector from './CampaignModeSelector';
import { useGameState } from '@/hooks/useGameState';
import { useCampaignState } from '@/hooks/useCampaignState';
import CategoryCard from './CategoryCard';
import DifficultySelector from './DifficultySelector';

type GameFlow = 'mode-select' | 'simple-setup' | 'campaign-difficulty' | 'campaign-setup' | 'playing' | 'campaign-playing' | 'ended';

const GameScreen: React.FC = () => {
  const [gameFlow, setGameFlow] = useState<GameFlow>('mode-select');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [campaignDifficulty, setCampaignDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const {
    currentQuestion,
    questionIndex,
    score,
    level,
    timeLeft,
    selectedAnswer,
    showResult,
    isCorrect,
    totalQuestions,
    correctAnswers,
    currentStreak,
    bestStreak,
    categories,
    gameStarted,
    gameEnded,
    gameMode,
    availableQuestions,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame
  } = useGameState();

  const {
    currentStage,
    completed: campaignCompleted,
    failed: campaignFailed,
    getCurrentStageQuestions,
    completeStage,
    resetCampaign,
    getCurrentStageCategory
  } = useCampaignState();

  const [showStageComplete, setShowStageComplete] = useState(false);
  const [lastStageResult, setLastStageResult] = useState<{stage: string, score: number, accuracy: number} | null>(null);

  const handleModeSelect = (mode: 'simple' | 'campaign') => {
    if (mode === 'simple') {
      setGameFlow('simple-setup');
    } else {
      setGameFlow('campaign-difficulty');
    }
  };

  const handleStartSimpleGame = (category: string, difficulty: string) => {
    startGame(category, difficulty, 'simple');
    setGameFlow('playing');
  };

  const handleCampaignDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    setCampaignDifficulty(difficulty);
    setGameFlow('campaign-setup');
  };

  const handleStartCampaign = () => {
    resetCampaign();
    const stageQuestions = getCurrentStageQuestions(campaignDifficulty || 'easy');
    startGame(getCurrentStageCategory(), campaignDifficulty || 'easy', 'campaign', stageQuestions);
    setGameFlow('campaign-playing');
  };

  const handleGameEnd = () => {
    if (gameMode === 'campaign') {
      const result = completeStage(score, correctAnswers);
      if (result.passed && !campaignCompleted) {
        setLastStageResult({
          stage: getCurrentStageCategory(),
          score,
          accuracy: Math.round((correctAnswers / 10) * 100)
        });
        setShowStageComplete(true);
      } else {
        setGameFlow('ended');
      }
    } else {
      setGameFlow('ended');
    }
  };

  const handleReset = () => {
    resetGame();
    resetCampaign();
    setGameFlow('mode-select');
  };

  React.useEffect(() => {
    if (gameEnded) {
      handleGameEnd();
    }
  }, [gameEnded]);

  const getCategoryTriviaBg = (category: string) => {
    switch (category) {
      case 'soil':
        return (
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1400" height="800" fill="#e8d7b2"/>
            <ellipse cx="700" cy="900" rx="900" ry="300" fill="#a67c52"/>
            <ellipse cx="700" cy="700" rx="600" ry="120" fill="#8b5e3c"/>
            <ellipse cx="200" cy="700" rx="300" ry="80" fill="#c2b280"/>
            <ellipse cx="1200" cy="700" rx="200" ry="60" fill="#c2b280"/>
            <rect x="500" y="600" width="400" height="40" rx="20" fill="#b97a56"/>
            <ellipse cx="150" cy="500" rx="40" ry="60" fill="#e8d7b2"/>
            <rect x="130" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <ellipse cx="1250" cy="500" rx="40" ry="60" fill="#e8d7b2"/>
            <rect x="1230" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <circle cx="310" cy="470" r="18" fill="#fff"/>
            <ellipse cx="900" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="950" cy="670" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="1000" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="600" cy="700" rx="30" ry="20" fill="#fff"/>
            <ellipse cx="650" cy="700" rx="30" ry="20" fill="#fff"/>
            <circle cx="1300" cy="180" r="90" fill="#ffe066"/>
          </svg>
        );
      case 'plant':
        return (
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1400" height="800" fill="#e8f7b2"/>
            <ellipse cx="700" cy="900" rx="900" ry="300" fill="#8cb43a"/>
            <ellipse cx="700" cy="700" rx="600" ry="120" fill="#b2f7ef"/>
            <ellipse cx="200" cy="700" rx="300" ry="80" fill="#f7c873"/>
            <ellipse cx="1200" cy="700" rx="200" ry="60" fill="#f7c873"/>
            <rect x="500" y="600" width="400" height="40" rx="20" fill="#f7c873"/>
            <ellipse cx="150" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="130" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <ellipse cx="1250" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="1230" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <circle cx="310" cy="470" r="18" fill="#fff"/>
            <ellipse cx="900" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="950" cy="670" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="1000" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="600" cy="700" rx="30" ry="20" fill="#fff"/>
            <ellipse cx="650" cy="700" rx="30" ry="20" fill="#fff"/>
            <circle cx="1300" cy="180" r="90" fill="#ffe066"/>
            <ellipse cx="700" cy="400" rx="200" ry="60" fill="#8cb43a"/>
            <ellipse cx="700" cy="350" rx="100" ry="30" fill="#4ecb4b"/>
          </svg>
        );
      case 'animal':
        return (
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1400" height="800" fill="#d0f0fd"/>
            <ellipse cx="700" cy="900" rx="900" ry="300" fill="#8cb43a"/>
            <ellipse cx="700" cy="700" rx="600" ry="120" fill="#b2f7ef"/>
            <ellipse cx="200" cy="700" rx="300" ry="80" fill="#f7c873"/>
            <ellipse cx="1200" cy="700" rx="200" ry="60" fill="#f7c873"/>
            <rect x="500" y="600" width="400" height="40" rx="20" fill="#f7c873"/>
            <ellipse cx="150" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="130" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <ellipse cx="1250" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="1230" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <circle cx="310" cy="470" r="18" fill="#fff"/>
            <ellipse cx="900" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="950" cy="670" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="1000" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="600" cy="700" rx="30" ry="20" fill="#fff"/>
            <ellipse cx="650" cy="700" rx="30" ry="20" fill="#fff"/>
            <circle cx="1300" cy="180" r="90" fill="#ffe066"/>
            <rect x="1100" y="550" width="120" height="60" fill="#fff" stroke="#e74c3c" strokeWidth="6"/>
            <rect x="1100" y="540" width="120" height="20" fill="#e74c3c"/>
          </svg>
        );
      case 'human':
        return (
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1400" height="800" fill="#f7e8b2"/>
            <ellipse cx="700" cy="900" rx="900" ry="300" fill="#e8f7b2"/>
            <ellipse cx="700" cy="700" rx="600" ry="120" fill="#b2f7ef"/>
            <ellipse cx="200" cy="700" rx="300" ry="80" fill="#f7c873"/>
            <ellipse cx="1200" cy="700" rx="200" ry="60" fill="#f7c873"/>
            <rect x="500" y="600" width="400" height="40" rx="20" fill="#f7c873"/>
            <ellipse cx="150" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="130" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <ellipse cx="1250" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="1230" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <circle cx="310" cy="470" r="18" fill="#fff"/>
            <ellipse cx="900" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="950" cy="670" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="1000" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="600" cy="700" rx="30" ry="20" fill="#fff"/>
            <ellipse cx="650" cy="700" rx="30" ry="20" fill="#fff"/>
            <circle cx="1300" cy="180" r="90" fill="#ffe066"/>
            <rect x="600" y="400" width="200" height="100" fill="#d35400" stroke="#fff" strokeWidth="8"/>
            <polygon points="600,400 700,350 800,400" fill="#c0392b" stroke="#fff" strokeWidth="8"/>
          </svg>
        );
      case 'planetary':
        return (
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1400" height="800" fill="#b2e0f7"/>
            <ellipse cx="700" cy="900" rx="900" ry="300" fill="#8cb43a"/>
            <ellipse cx="700" cy="700" rx="600" ry="120" fill="#b2f7ef"/>
            <ellipse cx="200" cy="700" rx="300" ry="80" fill="#f7c873"/>
            <ellipse cx="1200" cy="700" rx="200" ry="60" fill="#f7c873"/>
            <rect x="500" y="600" width="400" height="40" rx="20" fill="#f7c873"/>
            <ellipse cx="150" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="130" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <ellipse cx="1250" cy="500" rx="40" ry="60" fill="#b2f7ef"/>
            <rect x="1230" y="560" width="40" height="60" rx="20" fill="#b97a56"/>
            <circle cx="310" cy="470" r="18" fill="#fff"/>
            <ellipse cx="900" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="950" cy="670" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="1000" cy="650" rx="30" ry="15" fill="#ffe066"/>
            <ellipse cx="600" cy="700" rx="30" ry="20" fill="#fff"/>
            <ellipse cx="650" cy="700" rx="30" ry="20" fill="#fff"/>
            <circle cx="1300" cy="180" r="90" fill="#ffe066"/>
            <circle cx="700" cy="400" r="120" fill="#87ceeb"/>
            <ellipse cx="700" cy="400" rx="100" ry="30" fill="#228b22"/>
          </svg>
        );
      default:
        return (
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1400" height="800" fill="#e8f7b2"/>
          </svg>
        );
    }
  };

  if (gameFlow === 'mode-select') {
    return <GameModeSelector onSelectMode={handleModeSelect} />;
  }

  if (gameFlow === 'simple-setup') {
    const categories = [
      { key: 'soil', icon: '🌱', title: 'Soil Health', description: 'The foundation of all life', bgGradient: 'bg-gradient-to-br from-amber-400 to-yellow-600' },
      { key: 'plant', icon: '🌿', title: 'Plant Health', description: 'Green and growing', bgGradient: 'bg-gradient-to-br from-[#8cb43a] to-green-600' },
      { key: 'animal', icon: '🐄', title: 'Animal Health', description: 'Our farm friends', bgGradient: 'bg-gradient-to-br from-blue-400 to-cyan-600' },
      { key: 'human', icon: '👨‍⚕️', title: 'Human Health', description: 'People and wellness', bgGradient: 'bg-gradient-to-br from-purple-400 to-pink-600' },
      { key: 'planetary', icon: '🌍', title: 'Planetary Health', description: 'Earth and beyond', bgGradient: 'bg-gradient-to-br from-indigo-400 to-blue-600' },
    ];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8f7b2] via-[#f7e8b2] to-[#b2f7ef] relative overflow-hidden p-4">
        {getCategoryTriviaBg(currentQuestion?.category || (gameMode === 'campaign' ? getCurrentStageCategory() : 'soil'))}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-[#263c2a] text-center mb-10 drop-shadow-lg">Choose Category & Difficulty</h2>
          <div className="bg-white/90 rounded-3xl shadow-2xl p-8 w-full flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 w-full">
              {categories.map(cat => (
                <CategoryCard
                  key={cat.key}
                  category={cat.key as any}
                  icon={cat.icon}
                  title={cat.title}
                  description={cat.description}
                  bgGradient={cat.bgGradient}
                  onClick={() => setSelectedCategory(cat.key)}
                  isSelected={selectedCategory === cat.key}
                />
              ))}
            </div>
            <div className="mb-10 w-full">
              <DifficultySelector selectedDifficulty={selectedDifficulty} onSelect={setSelectedDifficulty} />
            </div>
            <div className="flex justify-center w-full">
              <Button
                className="bg-[#8cb43a] text-white font-bold px-8 py-4 text-xl rounded-full shadow-lg disabled:opacity-50"
                disabled={!selectedCategory || !selectedDifficulty}
                onClick={() => {
                  if (selectedCategory && selectedDifficulty) {
                    handleStartSimpleGame(selectedCategory, selectedDifficulty);
                  }
                }}
              >
                Start Game
              </Button>
            </div>
            <div className="flex justify-center w-full mt-4">
              <Button
                variant="outline"
                className="border-[#8cb43a] text-[#8cb43a] hover:bg-[#8cb43a] hover:text-white rounded-full font-bold px-8 py-3"
                onClick={handleReset}
              >
                Back to Menu 🏠
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameFlow === 'campaign-difficulty') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8f7b2] via-[#f7e8b2] to-[#b2f7ef] relative overflow-hidden p-4">
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-[#263c2a] text-center mb-10 drop-shadow-lg">Choose Campaign Difficulty</h2>
          <div className="bg-white/90 rounded-3xl shadow-2xl p-8 w-full flex flex-col items-center">
            <DifficultySelector selectedDifficulty={campaignDifficulty} onSelect={handleCampaignDifficultySelect} />
            <Button className="mt-8 bg-[#8cb43a] text-white font-bold px-8 py-4 text-xl rounded-full shadow-lg disabled:opacity-50" disabled={!campaignDifficulty} onClick={() => setGameFlow('campaign-setup')}>
              Next
            </Button>
            <Button className="mt-4 border-[#8cb43a] text-[#8cb43a] hover:bg-[#8cb43a] hover:text-white rounded-full font-bold px-8 py-3" variant="outline" onClick={() => setGameFlow('mode-select')}>
              ← Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameFlow === 'campaign-setup') {
    return (
      <CampaignModeSelector 
        onStartCampaign={handleStartCampaign}
        onBack={() => setGameFlow('mode-select')}
      />
    );
  }

  if (gameFlow === 'ended') {
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8cb43a] to-green-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center animate-bounce-in border-4 border-white">
          <CardHeader className="bg-white">
            <CardTitle className="text-3xl font-bold text-[#8cb43a]">
              {gameMode === 'campaign' ? (campaignCompleted ? '🏆 Campaign Complete!' : '❌ Campaign Failed') : '🎉 Quest Complete!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="space-y-4">
              <div className="text-lg text-gray-700">
                <p>Final Score: <span className="font-bold text-[#8cb43a]">{score}</span></p>
                <p>Accuracy: <span className="font-bold">{accuracy}%</span></p>
                <p>Best Streak: <span className="font-bold">{bestStreak}</span></p>
              </div>
              {gameMode === 'campaign' && campaignFailed && (
                <p className="text-red-600 font-semibold">Need 75% to advance to next stage</p>
              )}
              <div className="flex gap-2 justify-center">
                <Button onClick={handleReset} size="lg" className="bg-[#8cb43a] hover:bg-green-600 text-white">
                  New Game 🔄
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showStageComplete && lastStageResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8f7b2] via-[#f7e8b2] to-[#b2f7ef] relative overflow-hidden p-4">
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
          <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full flex flex-col items-center border-4 border-[#8cb43a]">
            <h2 className="text-4xl font-extrabold text-[#263c2a] text-center mb-4 drop-shadow-lg">🎉 Stage Complete!</h2>
            <p className="text-2xl text-[#263c2a] text-center mb-6 font-semibold">You mastered <span className="text-[#8cb43a] font-extrabold">{lastStageResult.stage}</span>!</p>
            <div className="text-lg text-[#263c2a] mb-6">
              <p>Score: <span className="font-bold">{lastStageResult.score}</span></p>
              <p>Accuracy: <span className="font-bold">{lastStageResult.accuracy}%</span></p>
            </div>
            <Button className="bg-[#8cb43a] text-white font-bold px-8 py-4 text-xl rounded-full shadow-lg" onClick={() => {
              setShowStageComplete(false);
              const nextStageQuestions = getCurrentStageQuestions(campaignDifficulty || 'easy');
              startGame(getCurrentStageCategory(), campaignDifficulty || 'easy', 'campaign', nextStageQuestions);
              setGameFlow('campaign-playing');
            }}>
              Continue to Next Stage ➡️
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryFarmBg = (category: string) => {
    switch (category) {
      case 'soil': return 'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M0 80h100v20H0z\' fill=\'%23654321\'/%3E%3Cpath d=\'M0 70h100v10H0z\' fill=\'%238B4513\'/%3E%3Cpath d=\'M0 0h100v70H0z\' fill=\'%2387CEEB\'/%3E%3C/svg%3E")] bg-cover';
      case 'plant': return 'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M0 90h100v10H0z\' fill=\'%23228B22\'/%3E%3Cpath d=\'M10 70v20M30 65v25M50 60v30M70 68v22M90 72v18\' stroke=\'%238cb43a\' stroke-width=\'2\'/%3E%3Cpath d=\'M0 0h100v60H0z\' fill=\'%2387CEEB\'/%3E%3C/svg%3E")] bg-cover';
      case 'animal': return 'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M0 80h100v20H0z\' fill=\'%23228B22\'/%3E%3Crect x=\'20\' y=\'50\' width=\'60\' height=\'30\' fill=\'%23D2691E\'/%3E%3Cpath d=\'M0 0h100v50H0z\' fill=\'%2387CEEB\'/%3E%3C/svg%3E")] bg-cover';
      case 'human': return 'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M0 85h100v15H0z\' fill=\'%23228B22\'/%3E%3Crect x=\'30\' y=\'40\' width=\'40\' height=\'45\' fill=\'%23D2691E\'/%3E%3Cpath d=\'M0 0h100v40H0z\' fill=\'%2387CEEB\'/%3E%3C/svg%3E")] bg-cover';
      case 'planetary': return 'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'40\' fill=\'%2387CEEB\'/%3E%3Cpath d=\'M20 40c10-5 20 5 30-2s15 8 25 3\' fill=\'%23228B22\'/%3E%3C/svg%3E")] bg-cover';
      default: return 'bg-gradient-to-br from-[#8cb43a] to-green-600';
    }
  };

  const progress = availableQuestions.length > 0 ? ((questionIndex + 1) / availableQuestions.length) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8f7b2] via-[#f7e8b2] to-[#b2f7ef] relative overflow-hidden p-4">
      {getCategoryTriviaBg(currentQuestion?.category || (gameMode === 'campaign' ? getCurrentStageCategory() : 'soil'))}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex flex-row justify-center items-start gap-6 mb-8 w-full max-w-3xl mx-auto">
          <GameHeader
            score={score}
            level={level}
            progress={progress}
            category={currentQuestion?.category || ''}
            timeLeft={timeLeft}
            gameMode={gameMode}
            currentStage={gameMode === 'campaign' ? currentStage + 1 : undefined}
          />
          <GameStats
            totalQuestions={totalQuestions}
            correctAnswers={correctAnswers}
            currentStreak={currentStreak}
            bestStreak={bestStreak}
          />
        </div>
        
        <div className="w-full flex flex-col items-center">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={selectAnswer}
              showResult={showResult}
              isCorrect={isCorrect}
            />
          )}
          {showResult && (
            <div className="text-center mt-6 animate-bounce-in">
              <Button onClick={nextQuestion} size="lg" className="bg-[#8cb43a] hover:bg-green-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg">
                Next Question ➡️
              </Button>
            </div>
          )}
          <div className="text-center mt-6">
            <Button onClick={handleReset} variant="outline" size="lg" className="border-[#8cb43a] text-[#8cb43a] hover:bg-[#8cb43a] hover:text-white rounded-full font-bold px-8 py-3 mt-2">
              Back to Menu 🏠
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;