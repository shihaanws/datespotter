import { Mood, Budget } from '../types';

export const MOODS: Mood[] = [
  { emoji: '🥰', label: 'Romantic', value: 'romantic' },
  { emoji: '🍸', label: 'Party', value: 'party' },
  { emoji: '🎵', label: 'Chill', value: 'chill' },
  { emoji: '🎨', label: 'Creative', value: 'creative' },
  { emoji: '🍔', label: 'Foodie', value: 'foodie' },
  { emoji: '🧘', label: 'Relaxed', value: 'relaxed' },
  { emoji: '🏔️', label: 'Adventurous', value: 'adventurous' },
  { emoji: '🎡', label: 'Fun', value: 'fun' },
];

export const BUDGETS: Budget[] = [
  {
    emoji: '🫣',
    label: 'Budget-Friendly',
    value: 'budget-friendly',
    description: 'Save and still impress',
    priceRange: '$0-50 per person',
  },
  {
    emoji: '🙂',
    label: 'Balanced',
    value: 'balanced',
    description: 'A comfortable treat',
    priceRange: '$50-150 per person',
  },
  {
    emoji: '😍',
    label: 'Premium',
    value: 'premium',
    description: 'Go all out in style',
    priceRange: '$150+ per person',
  },
];