import { useState, useCallback } from 'react';
import { Question, questions } from '@/data/questions';

interface CampaignState {
  currentStage: number;
  stageProgress: number;
  totalScore: number;
  stageScores: number[];
  completed: boolean;
  failed: boolean;
}

const campaignStages = ['soil', 'plant', 'animal', 'human', 'planetary'];

export const useCampaignState = () => {
  const [campaignState, setCampaignState] = useState<CampaignState>({
    currentStage: 0,
    stageProgress: 0,
    totalScore: 0,
    stageScores: [0, 0, 0, 0, 0],
    completed: false,
    failed: false
  });

  const getCurrentStageQuestions = useCallback((difficulty?: string) => {
    const currentCategory = campaignStages[campaignState.currentStage];
    return questions
      .filter(q => q.category === currentCategory && (!difficulty || q.difficulty === difficulty))
      .slice(0, 10); // 10 questions per stage
  }, [campaignState.currentStage]);

  const completeStage = useCallback((score: number, correctAnswers: number) => {
    const percentage = (correctAnswers / 10) * 100;
    const passed = percentage >= 75;
    
    setCampaignState(prev => {
      const newStageScores = [...prev.stageScores];
      newStageScores[prev.currentStage] = score;
      
      if (!passed) {
        return {
          ...prev,
          stageScores: newStageScores,
          failed: true
        };
      }
      
      const nextStage = prev.currentStage + 1;
      const isCompleted = nextStage >= campaignStages.length;
      
      return {
        ...prev,
        currentStage: isCompleted ? prev.currentStage : nextStage,
        stageProgress: 0,
        totalScore: prev.totalScore + score,
        stageScores: newStageScores,
        completed: isCompleted
      };
    });
    
    return { passed, percentage };
  }, []);

  const resetCampaign = useCallback(() => {
    setCampaignState({
      currentStage: 0,
      stageProgress: 0,
      totalScore: 0,
      stageScores: [0, 0, 0, 0, 0],
      completed: false,
      failed: false
    });
  }, []);

  const getCurrentStageName = useCallback(() => {
    return campaignStages[campaignState.currentStage] || 'unknown';
  }, [campaignState.currentStage]);

  const getCurrentStageCategory = useCallback(() => {
    return campaignStages[campaignState.currentStage] || 'soil';
  }, [campaignState.currentStage]);

  return {
    ...campaignState,
    getCurrentStageQuestions,
    completeStage,
    resetCampaign,
    getCurrentStageName,
    getCurrentStageCategory,
    campaignStages
  };
};

export default useCampaignState;