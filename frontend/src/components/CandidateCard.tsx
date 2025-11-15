import React, { useState } from 'react';
import type { Candidate } from '../types/candidate';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { CandidateHeader } from './CandidateHeader';
import { CandidateJob } from './CandidateJob';
import { CandidateAvailability } from './CandidateAvailability';
import { CandidateInterviews } from './CandidateInterviews';

interface CandidateCardProps {
  candidate: Candidate;
}

/**
 * CandidateCard component displays individual candidate information.
 * Supports expand/collapse functionality for candidates with interviews.
 *
 * @param {CandidateCardProps} props - Component props
 * @param {Candidate} props.candidate - The candidate data to display
 * @returns {JSX.Element} The candidate card component
 */
export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Checks if the candidate has interviews.
   */
  const hasInterviews =
    candidate?.has_interviews &&
    candidate?.interviews &&
    candidate?.interviews?.length > 0;

  /**
   * Handles card click to toggle expand/collapse state for candidates with interviews.
   */
  const handleCardClick = () => {
    if (!hasInterviews) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  /**
   * Prevents event propagation when clicking on inner elements.
   *
   * @param {React.MouseEvent} e - The mouse event
   */
  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`bg-white border-b border-gray-200 py-3 px-3 sm:py-4 sm:px-4 md:py-4 md:px-4 hover:bg-gray-50 transition-colors relative select-none ${
        hasInterviews ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Collapse/Expand Icon - Only show if card has interviews */}
      {hasInterviews && (
        <div className="absolute top-1/2 right-3 sm:right-4 md:right-4 transform -translate-y-1/2 flex items-center justify-center">
          {isExpanded ? (
            <IconChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform" />
          ) : (
            <IconChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform" />
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <CandidateHeader
          candidate={candidate}
          onInnerClick={handleInnerClick}
        />
        <CandidateJob candidate={candidate} onInnerClick={handleInnerClick} />
      </div>

      {isExpanded && (
        <div className="max-w-3xl 2xl:max-w-6xl w-full ml-0 sm:ml-2 md:ml-4">
          <CandidateAvailability
            candidate={candidate}
            onInnerClick={handleInnerClick}
          />
          <CandidateInterviews
            candidate={candidate}
            onInnerClick={handleInnerClick}
          />
        </div>
      )}
    </div>
  );
};
