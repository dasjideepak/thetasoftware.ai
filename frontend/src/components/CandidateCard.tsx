import React, { useState } from 'react';
import type { Candidate } from '../types/candidate';
import {
  IconArrowUp,
  IconDots,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const hasInterviews =
    candidate?.has_interviews &&
    candidate?.interviews &&
    candidate?.interviews?.length > 0;

  const handleCardClick = () => {
    if (!hasInterviews) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

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
        {/* Name Column */}
        <div className="flex flex-col">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleInnerClick(e);
            }}
            className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 mb-1 cursor-pointer transition-colors select-text"
          >
            {candidate.name}
          </a>

          {getPreviousAffiliation() && (
            <div className="text-xs sm:text-sm text-gray-400 mb-1">
              {getPreviousAffiliation()}
            </div>
          )}

          {!candidate?.has_interviews && (
            <>
              <div className="text-xs sm:text-sm text-[#5d5d5d] mt-3 sm:mt-4 ml-0 sm:ml-2 font-normal">
                {candidate.status}
              </div>
            </>
          )}
        </div>

        {/* Job/Status Column */}
        <div className="flex flex-col ml-0 sm:ml-2 md:ml-2">
          <div className="text-sm sm:text-base font-medium text-[#15372c] mb-1">
            {candidate.job_title}
          </div>

          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-1">
            <IconArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="wrap-break-words">{getStatusText()}</span>
          </div>

          {!candidate?.has_interviews && (
            <>
              <div className="text-xs sm:text-sm mt-3 sm:mt-4 sm:-ml-1">
                <button
                  onClick={handleInnerClick}
                  className="text-[#00A88F] hover:text-[#008f7a] hover:underline font-medium cursor-pointer transition-colors"
                >
                  {candidate.action_link}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="max-w-3xl 2xl:max-w-6xl w-full ml-0 sm:ml-2 md:ml-4">
          {/* Availability Section */}
          {candidate?.availability_status === 'Not Requested' && (
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-medium text-[#15372c]">
                  Availability
                </span>
                <button
                  onClick={handleInnerClick}
                  className="pointer-events-auto text-sm sm:text-base text-[#00A88F] hover:text-[#008f7a] font-normal transition-colors"
                >
                  Not Requested
                </button>
              </div>
              <button
                onClick={handleInnerClick}
                className="cursor-pointer pointer-events-auto text-sm sm:text-base text-[#00A88F] hover:text-[#008f7a] hover:underline font-normal transition-colors"
              >
                Request Availability
              </button>
            </div>
          )}

          {/* Interviews Section */}
          {candidate?.has_interviews &&
            candidate?.interviews &&
            candidate?.interviews?.length > 0 && (
              <div className="mt-4 sm:mt-6 w-full pr-0 sm:pr-4 md:pr-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 w-full gap-2 sm:gap-0">
                  <h3 className="text-sm sm:text-base font-normal text-[#15372c]">
                    Interviews
                  </h3>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 sm:ml-2 bo">
                    <button
                      onClick={handleInnerClick}
                      className="text-md text-[#00A88F] hover:text-[#008f7a] hover:underline font-normal cursor-pointer transition-colors whitespace-nowrap"
                    >
                      Schedule all manually
                    </button>
                    <span className="text-gray-400 hidden sm:inline">|</span>
                    <button
                      onClick={handleInnerClick}
                      className="text-md text-[#00A88F] hover:text-[#008f7a] font-normal cursor-pointer transition-colors whitespace-nowrap underline-offset-2 hover:underline focus:underline"
                      style={{ textDecorationThickness: '2px' }}
                    >
                      Automated scheduling
                    </button>
                  </div>
                </div>

                {/* Individual Interview List */}
                <div className="space-y-2 sm:space-y-3">
                  {candidate?.interviews.map((interview, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                    >
                      <span className="text-md font-light text-gray-500 wrap-break-words">
                        {interview.name}
                      </span>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <button
                          onClick={handleInnerClick}
                          className="text-md text-[#00A88F] hover:text-[#008f7a] hover:underline font-normal cursor-pointer transition-colors whitespace-nowrap"
                        >
                          Schedule manually
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={handleInnerClick}
                          className="text-md text-[#00A88F] hover:text-[#008f7a] hover:underline font-normal cursor-pointer transition-colors whitespace-nowrap"
                        >
                          Automated scheduling
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={handleInnerClick}
                          className="cursor-pointer text-black hover:text-gray-700 transition-colors"
                        >
                          <IconDots className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
