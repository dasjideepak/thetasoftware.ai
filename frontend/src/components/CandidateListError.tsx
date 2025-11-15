import React from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';

interface CandidateListErrorProps {
  error: string;
}

/**
 * CandidateListError component displays error message when API call fails.
 *
 * @param {CandidateListErrorProps} props - Component props
 * @param {string} props.error - The error message to display
 * @returns {JSX.Element} The error state component
 */
export const CandidateListError: React.FC<CandidateListErrorProps> = ({
  error,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-8 text-center">
        <div className="flex items-center justify-center text-red-600 font-medium mb-2 gap-2">
          <span>
            <IconAlertTriangle
              className="w-5 h-5 text-red-500"
              aria-hidden="true"
            />
          </span>
          Connection Error
        </div>
        <div className="text-gray-700 text-sm">{error}</div>
      </div>
    </div>
  );
};
