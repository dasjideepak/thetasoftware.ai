import React from 'react';
import { CandidateCardSkeleton } from './CandidateCardSkeleton';

interface CandidateListLoadingProps {
  perPage: number;
}

/**
 * CandidateListLoading component displays skeleton loaders while fetching candidates.
 *
 * @param {CandidateListLoadingProps} props - Component props
 * @param {number} props.perPage - Number of skeleton loaders to display
 * @returns {JSX.Element} The loading state component
 */
export const CandidateListLoading: React.FC<CandidateListLoadingProps> = ({
  perPage,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
        <div className="text-sm font-medium text-gray-600">Name</div>
        <div className="text-sm font-medium text-gray-600">Job/Status</div>
      </div>

      {/* Skeleton Loaders */}
      <div>
        {Array.from({ length: perPage }).map((_, index) => (
          <CandidateCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
