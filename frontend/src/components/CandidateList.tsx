import React, { useState, useEffect, useRef } from 'react';
import type { Candidate } from '../types/candidate';
import { CandidateCard } from './CandidateCard';
import { CandidateCardSkeleton } from './CandidateCardSkeleton';
import { filterSections } from '../data/filterConfig';
import type { SortOption } from './SortDropdown';
import { IconAlertTriangle } from '@tabler/icons-react';

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
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevFullTextSearchRef = useRef(fullTextSearch);
  const prevSearchValueRef = useRef(searchValue);

  // client-side pagination
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedCandidates = candidates.slice(startIndex, endIndex);

  useEffect(() => {
    // Skip API call if only fullTextSearch changed and there's no search value
    const onlyFullTextSearchChanged =
      prevFullTextSearchRef.current !== fullTextSearch &&
      prevSearchValueRef.current === searchValue &&
      !searchValue;

    if (onlyFullTextSearchChanged) {
      prevFullTextSearchRef.current = fullTextSearch;
      return;
    }

    // Update refs
    prevFullTextSearchRef.current = fullTextSearch;
    prevSearchValueRef.current = searchValue;

    /**
     * Gets all source names from the filter configuration.
     *
     * @returns {string[]} Array of source names
     */
    const getSourceNames = () => {
      const sourceSection = filterSections.find(
        (section) => section.title === 'Source'
      );
      return (
        sourceSection?.options.map((option) => option.value || option.label) ||
        []
      );
    };

    /**
     * Maps selected filters to API parameters.
     *
     * @returns {Record<string, string[] | string>} Object containing API filter parameters
     */
    const mapFiltersToApiParams = () => {
      const activeFilters = Object.keys(selectedFilters).filter(
        (key) => selectedFilters[key]
      );
      const params: Record<string, string[] | string> = {};
      const sourceNames = getSourceNames();

      /**
       * Helper function to add a value to an array parameter.
       *
       * @param {string} key - The parameter key
       * @param {string} value - The value to add
       */
      const addToArray = (key: string, value: string) => {
        if (!params[key]) {
          params[key] = [];
        }
        (params[key] as string[]).push(value);
      };

      activeFilters.forEach((key) => {
        if (key === 'active' || key === 'archived') {
          addToArray('application_type', key);
        } else if (key.startsWith('job-')) {
          addToArray('job_id', key);
        } else if (sourceNames.includes(key)) {
          addToArray('source', key);
        }
      });

      if (activeFilters.includes('Has Availability')) {
        params.has_availability = 'true';
      } else if (activeFilters.includes('No Availability')) {
        params.has_availability = 'false';
      }

      if (activeFilters.includes('Has Interviews')) {
        params.has_interviews = 'true';
      }

      return params;
    };

    /**
     * Builds URL search parameters from search, sort, and filter values.
     *
     * @returns {string} URL-encoded query string
     */
    const buildUrlParams = () => {
      const params = new URLSearchParams();

      if (searchValue) {
        params.append('search', searchValue);
        // Only include full_text_search if there's a search value
        if (fullTextSearch) {
          params.append('full_text_search', 'true');
        }
      }

      if (sort) {
        params.append('sort', sort);
      }

      const filterParams = mapFiltersToApiParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });

      return params.toString();
    };

    /**
     * Fetches candidates from the API with current search, filter, and sort parameters.
     */
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8000/api/candidates?${buildUrlParams()}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch candidates');
        }

        const data = await response.json();
        setCandidates(data.candidates || []);
        onTotalCandidatesChange?.(data.total || 0);
      } catch (err) {
        let errorMessage = 'An error occurred while fetching candidates';

        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          errorMessage =
            'Unable to connect to the backend server. Please make sure the backend is running on http://localhost:8000';
        } else if (err instanceof Error) {
          if (
            err.message.includes('Failed to fetch') ||
            err.message.includes('NetworkError')
          ) {
            errorMessage =
              'Unable to connect to the backend server. Please make sure the backend is running on http://localhost:8000';
          } else {
            errorMessage = err.message;
          }
        }

        setError(errorMessage);
        setCandidates([]);
        onTotalCandidatesChange?.(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [
    searchValue,
    selectedFilters,
    onTotalCandidatesChange,
    fullTextSearch,
    sort,
  ]);

  if (loading) {
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
  }

  if (error) {
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
  }

  if (candidates.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-8 text-center text-gray-500">No candidates found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
        <div className="text-sm font-medium text-gray-600">Name</div>
        <div className="text-sm font-medium text-gray-600">Job/Status</div>
      </div>

      {/* Candidate Cards */}
      <div>
        {paginatedCandidates?.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};
