import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Place } from '../types';
import { cardVariants } from '../lib/animation-variants';

interface PlaceCardProps {
  place: Place;
  onViewDetails: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onViewDetails }) => {
  // Safety check for place object
  if (!place) {
    return null;
  }

  // Ensure all required properties exist with fallbacks
  const safeName = place?.name || 'Unknown Place';
  const safeAddress = place?.address || 'Address not available';
  // const safePriceLevel = place?.priceLevel || '$$';
  const safeTags = Array.isArray(place?.tags) ? place?.tags : [];
  const safeRating = typeof place?.rating === 'number' ? place?.rating : 0;
  const safeDescription = place?.description || 'No description available';
  const safeImage = place?.image || `https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`;

  return (
    <motion.div
      className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-zinc-700"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={safeImage}
          alt={safeName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
          }}
        />
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
          {/* {safePriceLevel} */}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-1">
            {safeName}
          </h3>
          <div className="flex items-center gap-1 text-sm text-zinc-400 mb-2">
            <MapPin className="h-3 w-3" />
            <span>{safeAddress}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {safeTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-full"
            >
              {String(tag)}
            </span>
          ))}
        </div>

        {safeDescription && (
          <p className="text-sm text-zinc-400 line-clamp-2">
            {safeDescription}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">
              {safeRating.toFixed(1)}
            </span>
          </div>
          
          <motion.button
            onClick={() => onViewDetails(place)}
            className="flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
            <ExternalLink className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};