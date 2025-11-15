import React from 'react';
import { IconArrowUp } from '@tabler/icons-react';
import type { Candidate } from '../types/candidate';

interface CandidateJobProps {
  candidate: Candidate;
  onInnerClick: (e: React.MouseEvent) => void;
}

/**
 * CandidateJob component displays job title, status text, and action link.
 *
 * @param {CandidateJobProps} props - Component props
 * @param {Candidate} props.candidate - The candidate data
 * @param {(e: React.MouseEvent) => void} props.onInnerClick - Handler to prevent event propagation
 * @returns {JSX.Element} The candidate job component
 */
export const CandidateJob: React.FC<CandidateJobProps> = ({
  candidate,
  onInnerClick,
}) => {
  /**
   * Generates the status text based on the candidate's action link and interview status.
   *
   * @returns {string} The formatted status text
   */
  const getStatusText = () => {
    const actionLink = candidate?.action_link;
    const interviewCount = candidate?.interviews?.length || 0;

    if (actionLink === 'Schedule Interview' && interviewCount > 0) {
      const interviewName = candidate?.interviews?.[0]?.name;
      return `Interview${
        interviewCount > 1 ? 's' : ''
      } to schedule for ${interviewName}`;
    }

    const statusTextMap: Record<string, (c: Candidate) => string> = {
      'Collect Feedback': (c) =>
        c.status === 'Former Manager'
          ? 'Collect feedback in Reference Check'
          : `Collect feedback in ${c.status}`,
      'Review Submission': (c) => `Review submission for ${c.status}`,
      'Review Resume': (c) => `Review resume of ${c.name}`,
      'Review Application': (c) => `Review application of ${c.name}`,
      'Review Portfolio': (c) => `Review portfolio of ${c.name}`,
      'Send Offer': (c) => `Send offer to ${c.name}`,
      'Schedule Call': (c) => `Schedule call with ${c.name}`,
      'Schedule Phone Screen': (c) => `Schedule phone screen with ${c.name}`,
      'Schedule Final Interview': (c) =>
        `Schedule final interview with ${c.name}`,
      'Follow Up': (c) => `Follow up with ${c.name}`,
      'Send Test': (c) => `Send test to ${c.name}`,
      'Request References': (c) => `Request references from ${c.name}`,
      'View Profile': (c) => `View profile of ${c.name}`,
    };

    const statusTextHandler = statusTextMap[actionLink];
    if (statusTextHandler) {
      return statusTextHandler(candidate);
    }

    return `${actionLink} for ${candidate.name}`;
  };

  return (
    <div className="flex flex-col ml-0 sm:ml-2 md:ml-2">
      <div className="text-sm sm:text-base font-medium text-gray-900 mb-1">
        {candidate.job_title}
      </div>

      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-1">
        <IconArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="wrap-break-words">{getStatusText()}</span>
      </div>

      {!candidate?.has_interviews && (
        <div className="text-xs sm:text-sm mt-3 sm:mt-4 sm:-ml-1">
          <button
            onClick={onInnerClick}
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium cursor-pointer transition-colors"
          >
            {candidate.action_link}
          </button>
        </div>
      )}
    </div>
  );
};

