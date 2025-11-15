import React from 'react';
import { IconDots } from '@tabler/icons-react';
import type { Candidate } from '../types/candidate';

interface CandidateInterviewsProps {
  candidate: Candidate;
  onInnerClick: (e: React.MouseEvent) => void;
}

/**
 * CandidateInterviews component displays interview list with scheduling options.
 * Only renders if candidate has interviews.
 *
 * @param {CandidateInterviewsProps} props - Component props
 * @param {Candidate} props.candidate - The candidate data
 * @param {(e: React.MouseEvent) => void} props.onInnerClick - Handler to prevent event propagation
 * @returns {JSX.Element | null} The candidate interviews component or null
 */
export const CandidateInterviews: React.FC<CandidateInterviewsProps> = ({
  candidate,
  onInnerClick,
}) => {
  if (
    !candidate?.has_interviews ||
    !candidate?.interviews ||
    candidate?.interviews?.length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-4 sm:mt-6 w-full pr-0 sm:pr-4 md:pr-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 w-full gap-2 sm:gap-0">
        <h3 className="text-sm sm:text-base font-normal text-gray-900">
          Interviews
        </h3>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 sm:ml-2">
          <button
            onClick={onInnerClick}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-normal cursor-pointer transition-colors whitespace-nowrap"
          >
            Schedule all manually
          </button>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <button
            onClick={onInnerClick}
            className="text-sm text-blue-600 hover:text-blue-700 font-normal cursor-pointer transition-colors whitespace-nowrap hover:underline"
          >
            Automated scheduling
          </button>
        </div>
      </div>

      {/* Individual Interview List */}
      <div className="space-y-2 sm:space-y-3">
        {candidate.interviews.map((interview, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          >
            <span className="text-sm font-light text-gray-500 wrap-break-words">
              {interview.name}
            </span>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <button
                onClick={onInnerClick}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-normal cursor-pointer transition-colors whitespace-nowrap"
              >
                Schedule manually
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={onInnerClick}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-normal cursor-pointer transition-colors whitespace-nowrap"
              >
                Automated scheduling
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={onInnerClick}
                className="cursor-pointer text-black hover:text-gray-700 transition-colors"
              >
                <IconDots className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

