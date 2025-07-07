import React from "react";

export const PlaceGridSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-zinc-300">
        Discovering places...
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl border border-zinc-700 animate-pulse space-y-3"
          >
            <div className="h-48 bg-zinc-700"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
              <div className="h-3 bg-zinc-700 rounded w-1/3"></div>
              <div className="h-3 bg-zinc-700 rounded w-2/3"></div>
              <div className="h-3 bg-zinc-700 rounded w-1/4"></div>
              <div className="flex justify-between pt-2">
                <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
