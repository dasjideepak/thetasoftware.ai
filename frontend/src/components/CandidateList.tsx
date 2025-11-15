import React, { useState, useEffect, useRef } from 'react';
import type { Candidate } from '../types/candidate';
import { CandidateCard } from './CandidateCard';
import { filterSections } from '../data/filterConfig';
import type { SortOption } from './SortDropdown';

interface CandidateListProps {
  searchValue: string;
  currentPage: number;
  perPage: number;
  selectedFilters: Record<string, boolean>;
  onTotalCandidatesChange: (total: number) => void;
  fullTextSearch: boolean;
  sort: SortOption;
}

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
    const getSourceNames = () => {
      const sourceSection = filterSections.find(
        (section) => section.title === 'Source'
      );
      return (
        sourceSection?.options.map((option) => option.value || option.label) ||
        []
      );
    };

    const mapFiltersToApiParams = () => {
      const activeFilters = Object.keys(selectedFilters).filter(
        (key) => selectedFilters[key]
      );
      const params: Record<string, string[] | string> = {};
      const sourceNames = getSourceNames();

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

    const buildUrlParams = () => {
      const params = new URLSearchParams();

      if (searchValue) {
        params.append('search', searchValue);
        // Only include full_text_search if there's a search value
        if (fullTextSearch) {
          params.append('full_text_search', 'true');
        }
      }
      params.append('page', currentPage.toString());
      params.append('per_page', perPage.toString());

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
        setError(err instanceof Error ? err.message : 'An error occurred');
        setCandidates([]);
        onTotalCandidatesChange?.(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [
    searchValue,
    currentPage,
    perPage,
    selectedFilters,
    onTotalCandidatesChange,
    fullTextSearch,
    sort,
  ]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-8 text-center text-gray-500">
          Loading candidates...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-8 text-center text-red-500">Error: {error}</div>
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
        {candidates?.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};
