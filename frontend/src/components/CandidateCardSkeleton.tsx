import React from 'react';

export const CandidateCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-3 px-3 sm:py-4 sm:px-4 md:py-4 md:px-4 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Name Column */}
        <div className="flex flex-col">
          <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-40 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-24 mt-3 sm:mt-4 ml-0 sm:ml-2" />
        </div>

        {/* Job/Status Column */}
        <div className="flex flex-col ml-0 sm:ml-2 md:ml-2">
          <div className="h-5 bg-gray-200 rounded w-36 mb-2" />
          <div className="flex items-center gap-1 mb-1">
            <div className="h-3 w-3 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-48" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-28 mt-3 sm:mt-4 sm:-ml-1" />
        </div>
      </div>
    </div>
  );
};
