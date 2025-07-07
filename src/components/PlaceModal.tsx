import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Clock, Phone, Globe } from 'lucide-react';
import { Place } from '../types';
import { Button } from './ui/Button';

interface PlaceModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceModal: React.FC<PlaceModalProps> = ({ place, isOpen, onClose }) => {
  if (!place) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-zinc-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden rounded-t-xl">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                {place.price}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                  {place.name}
                </h2>
                <div className="flex items-center gap-2 text-zinc-400 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{place.address}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{place.rating}</span>
                  <span className="text-zinc-400 ml-1">rating</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-zinc-700 text-zinc-300 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {place.description && (
                <div>
                  <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                    About this place
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {place.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Open now</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Call for reservations</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  Reserve Now
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};