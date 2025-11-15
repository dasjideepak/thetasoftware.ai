import React from 'react';
import type { SortOption } from './SortDropdown';
import { useCandidates } from '../hooks/useCandidates';
import { CandidateListLoading } from './CandidateListLoading';
import { CandidateListError } from './CandidateListError';
import { CandidateListEmpty } from './CandidateListEmpty';
import { CandidateListContent } from './CandidateListContent';

interface CandidateListProps {
  searchValue: string;
  currentPage: number;
  perPage: number;
  selectedFilters: Record<string, boolean>;
  onTotalCandidatesChange: (total: number) => void;
  fullTextSearch: boolean;
  sort: SortOption;
}

/**
 * CandidateList component fetches and displays a paginated list of candidates.
 * Handles search, filtering, sorting, and client-side pagination.
 *
 * @param {CandidateListProps} props - Component props
 * @returns {JSX.Element} The candidate list component
 */
export const CandidateList: React.FC<CandidateListProps> = ({
  searchValue,
  currentPage,
  perPage,
  selectedFilters,
  onTotalCandidatesChange,
  fullTextSearch,
  sort,
}) => {
  const { candidates, loading, error } = useCandidates({
    searchValue,
    selectedFilters,
    fullTextSearch,
    sort,
    onTotalCandidatesChange,
  });

  // Client-side pagination
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedCandidates = candidates.slice(startIndex, endIndex);

  if (loading) {
    return <CandidateListLoading perPage={perPage} />;
  }

  if (error) {
    return <CandidateListError error={error} />;
  }

  if (candidates.length === 0) {
    return <CandidateListEmpty />;
  }

  return <CandidateListContent candidates={paginatedCandidates} />;
};
