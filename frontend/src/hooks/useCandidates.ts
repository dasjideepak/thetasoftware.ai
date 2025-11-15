import { useState, useEffect, useRef } from 'react';
import type { Candidate } from '../types/candidate';
import { filterSections } from '../data/filterConfig';
import type { SortOption } from '../components/SortDropdown';

interface UseCandidatesParams {
  searchValue: string;
  selectedFilters: Record<string, boolean>;
  fullTextSearch: boolean;
  sort: SortOption;
  onTotalCandidatesChange?: (total: number) => void;
}

/**
 * Custom hook for fetching and managing candidates data.
 *
 * @param {UseCandidatesParams} params - Hook parameters
 * @returns {{ candidates: Candidate[]; loading: boolean; error: string | null }} Candidates data and state
 */
export const useCandidates = ({
  searchValue,
  selectedFilters,
  fullTextSearch,
  sort,
  onTotalCandidatesChange,
}: UseCandidatesParams) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prevFullTextSearchRef = useRef(fullTextSearch);
  const prevSearchValueRef = useRef(searchValue);

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
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${apiBaseUrl}/api/candidates?${buildUrlParams()}`
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
          errorMessage = `Unable to connect to the backend server. Please make sure the backend is running on ${apiBaseUrl}`;
        } else if (err instanceof Error) {
          if (
            err.message.includes('Failed to fetch') ||
            err.message.includes('NetworkError')
          ) {
            errorMessage = `Unable to connect to the backend server. Please make sure the backend is running on ${apiBaseUrl}`;
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

  return { candidates, loading, error };
};
