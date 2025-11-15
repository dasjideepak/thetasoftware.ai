import {
  IconChevronDown,
  IconPlus,
  IconX,
  IconAdjustmentsHorizontal,
} from '@tabler/icons-react';
import { filterSections } from '../data/filterConfig';

interface ActionBarProps {
  selectedFilters: Record<string, boolean>;
  onRemoveFilter: (key: string) => void;
  onToggleFilters?: () => void;
  candidateCount: number;
}

/**
 * ActionBar component displays candidate count, action buttons, and applied filter chips.
 *
 * @param {ActionBarProps} props - Component props
 * @returns {JSX.Element} The action bar component
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  selectedFilters,
  onRemoveFilter,
  onToggleFilters,
  candidateCount,
}) => {
  /**
   * Gets the display label for a filter key by looking it up in filter sections.
   *
   * @param {string} key - The filter key
   * @returns {string} The filter label or the key itself if not found
   */
  const getFilterLabel = (key: string): string => {
    for (const section of filterSections) {
      const option = section.options.find(
        (opt) => (opt.value || opt.label) === key
      );
      if (option) {
        return option.label;
      }
    }
    return key;
  };

  const appliedFilterKeys = Object.keys(selectedFilters);

  return (
    <div className="mb-4">
      {/* Top Row: Results Count and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
        {/* Results Count and Filter Button (Mobile) */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-900">
            Showing {candidateCount} candidate applications
          </div>
          {/* Filter Toggle Button - Visible on mobile/tablet, hidden on desktop */}
          {onToggleFilters && (
            <button
              onClick={onToggleFilters}
              className="lg:hidden flex items-center gap-1.5 h-8 px-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
            >
              <IconAdjustmentsHorizontal className="w-4 h-4" />
              <span className="font-normal">Filters</span>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Generate Report Button */}
          <button className="flex items-center gap-1.5 h-8 px-4 border border-emerald-500 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">
            <span className="font-normal">Generate Report</span>
            <IconChevronDown className="w-4 h-4" />
          </button>

          {/* Add Candidate Button */}
          <button className="flex items-center gap-1.5 h-8 px-4 border border-emerald-500 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">
            <IconPlus className="w-4 h-4" />
            <span className="font-normal">Add Candidate</span>
          </button>

          {/* Bulk Actions Button */}
          <button className="flex items-center gap-1.5 h-8 px-4 border border-emerald-500 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">
            <span className="font-normal">Bulk Actions</span>
            <IconChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Applied Filter Chips */}
      {appliedFilterKeys.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {appliedFilterKeys.map((key) => (
            <div
              key={key}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-xl text-xs text-gray-700"
            >
              <span>{getFilterLabel(key)}</span>
              <button
                onClick={() => onRemoveFilter(key)}
                className="hover:bg-gray-200 rounded-full p-0.5 transition-colors ml-0.5 cursor-pointer"
                aria-label={`Remove ${getFilterLabel(key)} filter`}
              >
                <IconX className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
