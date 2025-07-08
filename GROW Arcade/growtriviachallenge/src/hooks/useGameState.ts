import { useState, useEffect, useCallback } from 'react';
import { Question, questions } from '@/data/questions';
import { toast } from '@/components/ui/use-toast';
import { shuffle } from '@/lib/utils';

interface GameState {
  currentQuestion: Question | null;
  questionIndex: number;
  score: number;
  level: number;
  timeLeft: number;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean;
  totalQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  categories: Record<string, number>;
  gameStarted: boolean;
  gameEnded: boolean;
  selectedCategory: string | null;
  selectedDifficulty: string | null;
  gameMode: 'simple' | 'campaign' | null;
  availableQuestions: Question[];
  usedQuestionIds: Set<string>;
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    questionIndex: 0,
    score: 0,
    level: 1,
    timeLeft: 30,
    selectedAnswer: null,
    showResult: false,
    isCorrect: false,
    totalQuestions: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: 0,
    categories: {},
    gameStarted: false,
    gameEnded: false,
    selectedCategory: null,
    selectedDifficulty: null,
    gameMode: null,
    availableQuestions: [],
    usedQuestionIds: new Set()
  });

  const startGame = useCallback((category?: string, difficulty?: string, mode: 'simple' | 'campaign' = 'simple', customQuestions?: Question[]) => {
    const allQuestions = questions;
    let filteredQuestions = customQuestions || allQuestions;

    if (category && !customQuestions) {
      filteredQuestions = allQuestions.filter(q => q.category === category);
    }

    if (difficulty && !customQuestions) {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty);
    }

    // Filter out recently used questions
    const unusedQuestions = filteredQuestions.filter(q => !gameState.usedQuestionIds.has(q.id));
    
    // If we don't have enough unused questions, reset the used questions set
    if (unusedQuestions.length < 10) {
      setGameState(prev => ({
        ...prev,
        usedQuestionIds: new Set()
      }));
      filteredQuestions = filteredQuestions;
    } else {
      filteredQuestions = unusedQuestions;
    }

    // Shuffle questions before limiting and shuffling options
    filteredQuestions = shuffle(filteredQuestions);

    // Limit to 10 questions
    filteredQuestions = filteredQuestions.slice(0, 10);

    if (filteredQuestions.length === 0) {
      filteredQuestions = shuffle(allQuestions).slice(0, 10);
    }

    // Shuffle options for each question
    const shuffledQuestions = filteredQuestions.map(q => {
      const options = shuffle([...q.options]);
      const correctAnswer = options.indexOf(q.options[q.correctAnswer]);
      return { ...q, options, correctAnswer };
    });

    // Add used questions to the set
    setGameState(prev => ({
      ...prev,
      usedQuestionIds: new Set([...prev.usedQuestionIds, ...shuffledQuestions.map(q => q.id)])
    }));

    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      gameEnded: false,
      currentQuestion: shuffledQuestions[0],
      questionIndex: 0,
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      currentStreak: 0,
      timeLeft: 30,
      selectedCategory: category || null,
      selectedDifficulty: difficulty || null,
      gameMode: mode,
      availableQuestions: shuffledQuestions,
      selectedAnswer: null,
      showResult: false
    }));
  }, [gameState.usedQuestionIds]);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (gameState.showResult) return;
    
    const isCorrect = answerIndex === gameState.currentQuestion?.correctAnswer;
    const timeBonus = gameState.timeLeft > 20 ? 5 : 0;
    const points = isCorrect ? 10 + timeBonus : 0;
    
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      showResult: true,
      isCorrect,
      score: prev.score + points,
      totalQuestions: prev.totalQuestions + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      currentStreak: isCorrect ? prev.currentStreak + 1 : 0,
      bestStreak: isCorrect ? Math.max(prev.bestStreak, prev.currentStreak + 1) : prev.bestStreak,
      categories: {
        ...prev.categories,
        [prev.currentQuestion?.category || 'unknown']: (prev.categories[prev.currentQuestion?.category || 'unknown'] || 0) + 1
      }
    }));

    toast({
      title: isCorrect ? 'Correct!' : 'Incorrect',
      description: isCorrect ? `+${points} points` : 'Better luck next time!',
      variant: isCorrect ? 'default' : 'destructive'
    });
  }, [gameState.showResult, gameState.currentQuestion, gameState.timeLeft]);

  const nextQuestion = useCallback(() => {
    const nextIndex = gameState.questionIndex + 1;
    if (nextIndex >= gameState.availableQuestions.length) {
      setGameState(prev => ({ ...prev, gameEnded: true }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      questionIndex: nextIndex,
      currentQuestion: prev.availableQuestions[nextIndex],
      selectedAnswer: null,
      showResult: false,
      timeLeft: 30,
      level: Math.floor(nextIndex / 3) + 1
    }));
  }, [gameState.questionIndex, gameState.availableQuestions]);

  const resetGame = useCallback(() => {
    setGameState({
      currentQuestion: null,
      questionIndex: 0,
      score: 0,
      level: 1,
      timeLeft: 30,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false,
      totalQuestions: 0,
      correctAnswers: 0,
      currentStreak: 0,
      bestStreak: 0,
      categories: {},
      gameStarted: false,
      gameEnded: false,
      selectedCategory: null,
      selectedDifficulty: null,
      gameMode: null,
      availableQuestions: [],
      usedQuestionIds: new Set()
    });
  }, []);

  // Timer effect
  useEffect(() => {
    if (!gameState.gameStarted || gameState.showResult || gameState.timeLeft <= 0) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          const wrongAnswer = prev.currentQuestion?.correctAnswer === 0 ? 1 : 0;
          setTimeout(() => selectAnswer(wrongAnswer), 100);
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.gameStarted, gameState.showResult, gameState.timeLeft, selectAnswer]);

  return {
    ...gameState,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame
  };
};