import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { MoodSelector } from "./components/MoodSelector";
import { BudgetSelector } from "./components/BudgetSelector";
import { PlaceGrid } from "./components/PlaceGrid";
import { AIInsights } from "./components/AIInsights";
import { PlaceModal } from "./components/PlaceModal";
import { Skeleton } from "./components/ui/Skeleton";
import { Button } from "./components/ui/Button";
import { containerVariants, itemVariants } from "./lib/animation-variants";
import { getAIRecommendations } from "./lib/openai";
import { useGeolocation } from "./hooks/useGeolocation";
import { Place, SearchFilters, AIRecommendation } from "./types";
import { Map, Sparkles } from "lucide-react";
import Particles from "./components/ui/Particles";
import { PlaceGridSkeleton } from "./components/PlaceGridSkeleton";

function App() {
  const [filters, setFilters] = useState<SearchFilters>({
    mood: null,
    budget: null,
    location: "",
    query: "",
  });
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const {
    getCurrentLocation,
    location,
    error: locationError,
  } = useGeolocation();

  const [suggestionSeed, setSuggestionSeed] = useState<number>(Date.now());

  const handleSearch = async () => {
    if (!filters.mood && !filters.budget && !filters.query) return;

    setLoading(true);
    try {
      const result = await getAIRecommendations({
        ...filters,
        seed: suggestionSeed,
      });

      if (result && typeof result === "object") {
        setRecommendation(result);
      } else {
        console.error("Invalid recommendation structure received");
        setRecommendation(null);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    getCurrentLocation();
    if (location) {
      setFilters((prev) => ({
        ...prev,
        location: `${location.latitude},${location.longitude}`,
      }));
    }
  };

  const handleViewDetails = (place: Place) => {
    if (place && typeof place === "object") {
      setSelectedPlace(place);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNewSuggestions = () => {
    setSuggestionSeed(Date.now());
    handleSearch();
  };

  useEffect(() => {
    if (filters.mood || filters.budget || filters.query) {
      const timeoutId = setTimeout(handleSearch, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [filters.mood, filters.budget, filters.query, suggestionSeed]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
      {/* Particles in the background */}
      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#FF3F33"}
        refresh
        className="absolute inset-0 z-0"
      />

      {/* App content above particles */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            className="flex w-full max-w-4xl mx-auto flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Header />

            <motion.div className="space-y-6" variants={itemVariants}>
              <SearchBar
                query={filters.query || ""}
                onQueryChange={(query) => handleFilterChange("query", query)}
                onLocationClick={handleLocationClick}
              />

              <MoodSelector
                selectedMood={filters.mood}
                onMoodChange={(mood) => handleFilterChange("mood", mood)}
              />

              <BudgetSelector
                selectedBudget={filters.budget}
                onBudgetChange={(budget) => handleFilterChange("budget", budget)}
              />

              {locationError && (
                <motion.div
                  className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  variants={itemVariants}
                >
                  Location error: {locationError}
                </motion.div>
              )}
            </motion.div>

            {loading && (
  <motion.div variants={itemVariants}>
    <PlaceGridSkeleton />
  </motion.div>
)}

            {recommendation && !loading && (
              <motion.div className="space-y-6" variants={itemVariants}>
                <AIInsights
                  explanation={recommendation?.explanation || "Here are some great recommendations for you!"}
                  alternativeOptions={recommendation?.alternativeOptions || []}
                />

                <PlaceGrid
                  places={recommendation.places || []}
                  onViewDetails={handleViewDetails}
                />

                <motion.div className="flex justify-center gap-4" variants={itemVariants}>
                  <Button
                    variant="outline"
                    onClick={() => setShowMap(!showMap)}
                    className="flex items-center gap-2"
                  >
                    <Map className="h-4 w-4" />
                    {showMap ? "Hide Map" : "Show Map"}
                  </Button>
                  <Button
                    onClick={handleNewSuggestions}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Get New Suggestions
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {!recommendation && !loading && (
              <motion.div className="text-center py-12" variants={itemVariants}>
                <div className="text-zinc-400 text-lg">
                  Select your mood and budget to discover amazing date spots! 💝
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <PlaceModal
        place={selectedPlace}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
