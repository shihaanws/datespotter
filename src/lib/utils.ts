import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePlaceId(): string {
  return `place_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function formatPrice(priceLevel: string): string {
  const priceMap = {
    'budget-friendly': '$',
    'balanced': '$$',
    'premium': '$$$',
  };
  return priceMap[priceLevel as keyof typeof priceMap] || '$';
}

export function getMoodEmoji(mood: string): string {
  const moodMap = {
    romantic: '🥰',
    party: '🍸',
    chill: '🎵',
    creative: '🎨',
    foodie: '🍔',
    relaxed: '🧘',
    adventurous: '🏔️',
    fun: '🎡',
  };
  return moodMap[mood as keyof typeof moodMap] || '✨';
}