export interface Place {
  id: string;
  name: string;
  price: '$' | '$$' | '$$$';
  tags: string[];
  address: string;
  rating: number;
  image: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Mood {
  emoji: string;
  label: string;
  value: string;
}

export interface Budget {
  emoji: string;
  label: string;
  value: string;
  description: string;
  priceRange: string;
}

export interface SearchFilters {
  mood: string | null;
  budget: string | null;
  location: string;
  query: string;
}

export interface AIRecommendation {
  places: Place[];
  explanation: string;
  alternativeOptions?: string[];
}