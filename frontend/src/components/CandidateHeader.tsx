import React from 'react';
import type { Candidate } from '../types/candidate';

interface CandidateHeaderProps {
  candidate: Candidate;
  onInnerClick: (e: React.MouseEvent) => void;
}

/**
 * CandidateHeader component displays candidate name and previous affiliation.
 *
 * @param {CandidateHeaderProps} props - Component props
 * @param {Candidate} props.candidate - The candidate data
 * @param {(e: React.MouseEvent) => void} props.onInnerClick - Handler to prevent event propagation
 * @returns {JSX.Element} The candidate header component
 */
export const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  candidate,
  onInnerClick,
}) => {
  /**
   * Gets the previous affiliation text (position and/or company).
   *
   * @returns {string} The formatted affiliation string
   */
  const getPreviousAffiliation = () => {
    if (candidate.position && candidate.company) {
      if (candidate.position.toLowerCase().includes('at ')) {
        return candidate.position;
      }
      return `${candidate.position} at ${candidate.company}`;
    }

    if (candidate.company) {
      return candidate.company;
    }

    if (candidate.position) {
      return candidate.position;
    }
    return '';
  };

  return (
    <div className="flex flex-col">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onInnerClick(e);
        }}
        className="text-sm sm:text-base font-medium text-gray-700 hover:text-gray-800 mb-1 cursor-pointer transition-colors select-text"
      >
        {candidate.name}
      </a>

      {getPreviousAffiliation() && (
        <div className="text-xs sm:text-sm text-gray-400 mb-1">
          {getPreviousAffiliation()}
        </div>
      )}

      {!candidate?.has_interviews && (
        <div className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 ml-0 sm:ml-2 font-normal">
          {candidate.status}
        </div>
      )}
    </div>
  );
};
