import React from 'react';
import type { Candidate } from '../types/candidate';
import { CandidateCard } from './CandidateCard';

interface CandidateListContentProps {
  candidates: Candidate[];
}

/**
 * CandidateListContent component displays the list of candidate cards.
 *
 * @param {CandidateListContentProps} props - Component props
 * @param {Candidate[]} props.candidates - Array of candidates to display
 * @returns {JSX.Element} The candidate list content component
 */
export const CandidateListContent: React.FC<CandidateListContentProps> = ({
  candidates,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
        <div className="text-sm font-medium text-gray-600">Name</div>
        <div className="text-sm font-medium text-gray-600">Job/Status</div>
      </div>

      {/* Candidate Cards */}
      <div>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

