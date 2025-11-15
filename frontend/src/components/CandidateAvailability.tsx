import React from 'react';
import type { Candidate } from '../types/candidate';

interface CandidateAvailabilityProps {
  candidate: Candidate;
  onInnerClick: (e: React.MouseEvent) => void;
}

/**
 * CandidateAvailability component displays availability status and request button.
 * Only renders if availability status is 'Not Requested'.
 *
 * @param {CandidateAvailabilityProps} props - Component props
 * @param {Candidate} props.candidate - The candidate data
 * @param {(e: React.MouseEvent) => void} props.onInnerClick - Handler to prevent event propagation
 * @returns {JSX.Element | null} The candidate availability component or null
 */
export const CandidateAvailability: React.FC<CandidateAvailabilityProps> = ({
  candidate,
  onInnerClick,
}) => {
  if (candidate?.availability_status !== 'Not Requested') {
    return null;
  }

  return (
    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm sm:text-base font-medium text-gray-900">
          Availability
        </span>
        <button
          onClick={onInnerClick}
          className="pointer-events-auto text-sm sm:text-base text-blue-600 hover:text-blue-700 font-normal transition-colors"
        >
          Not Requested
        </button>
      </div>
      <button
        onClick={onInnerClick}
        className="cursor-pointer pointer-events-auto text-sm sm:text-base text-blue-600 hover:text-blue-700 hover:underline font-normal transition-colors"
      >
        Request Availability
      </button>
    </div>
  );
};

