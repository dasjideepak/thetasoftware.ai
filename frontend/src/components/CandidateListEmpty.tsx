import React from 'react';

/**
 * CandidateListEmpty component displays message when no candidates are found.
 *
 * @returns {JSX.Element} The empty state component
 */
export const CandidateListEmpty: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-8 text-center text-gray-500">No candidates found</div>
    </div>
  );
};
