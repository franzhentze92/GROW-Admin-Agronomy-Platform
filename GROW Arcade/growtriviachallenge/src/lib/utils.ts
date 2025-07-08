import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { plantHealthData, animalHealthData, soilHealthData, humanHealthData, planetaryHealthData } from '@/data/nutrients';
import type { Question } from '@/data/questions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const nutrientSources = [
  { data: plantHealthData, category: 'plant' },
  { data: animalHealthData, category: 'animal' },
  { data: soilHealthData, category: 'soil' },
  { data: humanHealthData, category: 'human' },
  { data: planetaryHealthData, category: 'planetary' },
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(array: T[]): T[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function generateNutrientQuestions(): Question[] {
  const questions: Question[] = [];
  let idCounter = 1000;

  for (const { data, category } of nutrientSources) {
    for (const nutrient of data) {
      // Pick a question type
      const types = [];
      if (nutrient.role && nutrient.role.length > 0) types.push('role');
      if (nutrient.sources && nutrient.sources.length > 0) types.push('sources');
      if (nutrient.deficiencySymptoms && nutrient.deficiencySymptoms.length > 0) types.push('deficiency');
      if (nutrient.interactions && nutrient.interactions.length > 0) types.push('interactions');
      if (types.length === 0) continue;
      const type = getRandomElement(types);

      let text = '';
      let correct = '';
      let distractors: string[] = [];
      let explanation = nutrient.overview || nutrient.impact || '';

      // Gather all possible options from other nutrients in the same category
      let pool: string[] = [];
      if (type === 'role') {
        text = `What is a main role of ${nutrient.name}?`;
        correct = getRandomElement(nutrient.role);
        pool = data.flatMap(n => n.role || []).filter(r => r !== correct);
      } else if (type === 'sources') {
        text = `Which is a source of ${nutrient.name}?`;
        correct = getRandomElement(nutrient.sources);
        pool = data.flatMap(n => n.sources || []).filter(s => s !== correct);
      } else if (type === 'deficiency') {
        text = `What is a deficiency symptom of ${nutrient.name}?`;
        correct = getRandomElement(nutrient.deficiencySymptoms);
        pool = data.flatMap(n => n.deficiencySymptoms || []).filter(d => d !== correct);
      } else if (type === 'interactions') {
        text = `Which is an interaction of ${nutrient.name}?`;
        correct = getRandomElement(nutrient.interactions);
        pool = data.flatMap(n => n.interactions || []).filter(i => i !== correct);
      }
      // Fallback if pool is too small
      if (pool.length < 3) pool = pool.concat(['(none)', '(unknown)', '(not applicable)']);
      distractors = shuffle(pool).slice(0, 3);
      const options = shuffle([correct, ...distractors]);
      const correctAnswer = options.indexOf(correct);

      questions.push({
        id: `${idCounter++}`,
        text,
        options,
        correctAnswer,
        category: category as Question['category'],
        difficulty: 'medium',
        explanation,
      });
    }
  }
  return questions;
}
