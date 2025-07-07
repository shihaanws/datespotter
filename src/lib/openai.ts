import { Mistral } from "@mistralai/mistralai";
import { jsonrepair } from "jsonrepair";
import type { AIRecommendation, SearchFilters } from "../types";

const mistralClient = new Mistral({
  apiKey: import.meta.env.VITE_MISTRAL_API_KEY!,
});

export async function getAIRecommendations(
  filters: SearchFilters
): Promise<AIRecommendation> {
  try {
    // Defensive defaulting with proper null checks
    const {
      mood = "",
      budget = "",
      query = "",
      location = "Mumbai",
    } = {
      ...filters,
      mood: filters.mood ?? "",
      budget: filters.budget ?? "",
      query: filters.query ?? "",
      location: filters.location || "Mumbai",
    };

    const moodPart = mood ? `The user is in a "${mood}" mood.` : "";
    const budgetPart = budget ? `They prefer a "${budget}" price range.` : "";
    const queryPart = query ? `The user is looking for "${query}".` : "";
    const locationPart = location
      ? `Focus on venues near "${location}".`
      : `Focus on venues in Mumbai.`;

    const prompt = `
You are a dating experience expert. Suggest 6 real or realistic date venues. ${locationPart}
${moodPart}
${budgetPart}
${queryPart}

Return the data in STRICT JSON format with:
- "name": string
- "address": string
- "priceLevel": "$" | "$$" | "$$$"
- "tags": string[]
- "rating": number
- "description": string
- "whyItMatches": string

For alternativeOptions, return an array of objects with the same structure as places (without whyItMatches).

Wrap the entire response in a single JSON object like:
{
  "places": [ ... ],
  "explanation": "...",
  "alternativeOptions": [ ... ]
}

DO NOT use markdown code fences. DO NOT add commentary. Only return valid JSON with double-quoted keys and string values.
`;

    const chatResponse = await mistralClient.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: "You are an expert dating venue recommender. Always return valid JSON without markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawContent = chatResponse.choices[0].message.content ?? "";
    console.log("Mistral raw response:", rawContent);

    // Clean up the response
    const cleaned = rawContent
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Repair and parse JSON
    const repaired = jsonrepair(cleaned);
    const recommendation = JSON.parse(repaired);
    console.log("Parsed recommendation:", recommendation);

    // Validate the structure
    if (!recommendation || typeof recommendation !== 'object') {
      throw new Error('Invalid recommendation structure');
    }

    // Ensure places is an array
    const places = Array.isArray(recommendation.places) ? recommendation.places : [];
    
    // Ensure alternativeOptions is an array
    const alternativeOptions = Array.isArray(recommendation.alternativeOptions) 
      ? recommendation.alternativeOptions 
      : [];

    // Add images and IDs to places
    const placesWithImages = places.map((place: any, index: number) => {
      // Validate place structure
      if (!place || typeof place !== 'object') {
        return null;
      }

      return {
        ...place,
        id: `mistral_place_${Date.now()}_${index}`,
        image: `https://images.pexels.com/photos/${getRandomPexelsId()}/pexels-photo-${getRandomPexelsId()}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`,
        name: place.name || 'Unknown Place',
        address: place.address || 'Address not available',
        // priceLevel: place.priceLevel || '$$',
        tags: Array.isArray(place.tags) ? place.tags : [],
        rating: typeof place.rating === 'number' ? place.rating : 4.0,
        description: place.description || 'No description available',
        whyItMatches: place.whyItMatches || 'Great choice for your preferences',
      };
    }).filter(Boolean); // Remove any null entries

    // Process alternative options
    const processedAlternatives = alternativeOptions.map((option: any, index: number) => {
      if (!option || typeof option !== 'object') {
        return null;
      }

      return {
        ...option,
        name: option.name || 'Unknown Place',
        address: option.address || 'Address not available',
        // priceLevel: option.priceLevel || '$$',
        tags: Array.isArray(option.tags) ? option.tags : [],
        rating: typeof option.rating === 'number' ? option.rating : 4.0,
        description: option.description || 'No description available',
      };
    }).filter(Boolean);

    return {
      places: placesWithImages,
      explanation: recommendation.explanation || 'Here are some great date spot recommendations for you.',
      alternativeOptions: processedAlternatives,
    };
  } catch (error) {
    console.error("Error from Mistral AI:", error);
    return getFallbackRecommendations(filters);
  }
}

function getRandomPexelsId(): number {
  const pexelsIds = [
    1581384, 1581554, 1581739, 1640777, 1640856, 1640945, 1655166, 1655506,
    1655677, 1655754, 1655834, 1655865, 2253643, 2253731, 2253832, 2253963,
    2254010, 2254069, 2254140, 2254200, 2254264, 2254330, 2254395, 2254456,
  ];
  return pexelsIds[Math.floor(Math.random() * pexelsIds.length)];
}

function getFallbackRecommendations(filters: SearchFilters): AIRecommendation {
  const location = filters.location || "Mumbai";
  
  return {
    places: [
      {
        id: "fallback_1",
        name: "Cafe Romance",
        // priceLevel: "$$" as const,
        tags: ["Romantic", "Cafe", "Cozy"],
        address: `123 Love Lane, ${location}`,
        rating: 4.5,
        image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        description: "A cozy spot perfect for intimate dates with warm ambiance.",
        whyItMatches: "Ideal fallback for romantic experiences.",
      },
      {
        id: "fallback_2",
        name: "Sunset Lounge",
        // priceLevel: "$$" as const,
        tags: ["Rooftop", "Drinks", "Sunset"],
        address: `456 Sky High, ${location}`,
        rating: 4.3,
        image: "https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        description: "Beautiful rooftop venue with stunning sunset views.",
        whyItMatches: "Perfect for romantic sunset dates.",
      },
      {
        id: "fallback_3",
        name: "Garden Bistro",
        // priceLevel: "$" as const,
        tags: ["Outdoor", "Garden", "Casual"],
        address: `789 Green Street, ${location}`,
        rating: 4.2,
        image: "https://images.pexels.com/photos/1581739/pexels-photo-1581739.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        description: "Charming garden setting with fresh, local cuisine.",
        whyItMatches: "Great for nature-loving couples.",
      },
    ],
    explanation: `We've provided some fallback recommendations for ${location}. These venues offer a variety of atmospheres and price points to suit different preferences.`,
    alternativeOptions: [{
        name: "Beachside Cafe",
        address: `Ocean Drive, ${location}`,
        // priceLevel: "$" as const,
        tags: ["Beach", "Casual", "Scenic"],
        rating: 4.4,
        description: "Relaxed beachside dining with ocean views.",
      },
      {
        name: "Heritage Restaurant",
        address: `Old City, ${location}`,
        // priceLevel: "$$$" as const,
        tags: ["Heritage", "Fine Dining", "Historic"],
        rating: 4.6,
        description: "Elegant dining in a historic setting.",
      },
    ],
  };
}