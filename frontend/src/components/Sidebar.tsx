import { useCallback } from 'react';
import { SearchInput } from './SearchInput';
import { FilterSection } from './FilterSection';
import { filterSections } from '../data/filterConfig';
import { IconX } from '@tabler/icons-react';
import { SortDropdown, type SortOption } from './SortDropdown';

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedFilters: Record<string, boolean>;
  onFilterChange: (key: string, checked: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
  fullTextSearch: boolean;
  onFullTextSearchChange: (value: boolean) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

/**
 * Sidebar component displays search, filters, and sort options.
 * Responsive: overlay on mobile/tablet, always visible on desktop.
 *
 * @param {SidebarProps} props - Component props
 * @returns {JSX.Element} The sidebar component
 */
export const Sidebar: React.FC<SidebarProps> = ({
  searchValue,
  onSearchChange,
  selectedFilters,
  onFilterChange,
  isOpen = false,
  onClose,
  fullTextSearch,
  onFullTextSearchChange,
  sort,
  onSortChange,
}) => {
  /**
   * Resets all selected filters by unchecking them.
   */
  const handleResetFilters = useCallback(() => {
    Object.keys(selectedFilters).forEach((key) => {
      onFilterChange(key, false);
    });
  }, [selectedFilters, onFilterChange]);

  return (
    <>
      {/* Mobile/Tablet Sidebar - Overlay */}
      <aside
        className={`fixed top-0 left-0 h-dvh w-[280px] max-w-[85vw] bg-gray-50 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:translate-x-0 lg:w-[248px] lg:h-full flex flex-col shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Close Button - Only visible on mobile/tablet */}
        {onClose && (
          <div className="lg:hidden flex items-center justify-between px-6 pt-4 pb-2 border-b border-gray-200 shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-colors cursor-pointer touch-manipulation"
              aria-label="Close filters"
            >
              <IconX className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        <div className="px-6 pt-2 pb-6 flex-1 overflow-y-auto lg:overflow-y-auto min-h-0 -webkit-overflow-scrolling-touch">
          {/* Search Input */}
          <SearchInput value={searchValue} onChange={onSearchChange} />

          {/* Full Text Search Toggle */}
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="fullTextSearch"
                  checked={fullTextSearch}
                  onChange={(e) => onFullTextSearchChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-[50px] h-[25px] bg-gray-300 rounded-full peer peer-checked:bg-emerald-600 peer-focus:ring-2 peer-focus:ring-emerald-600/20 transition-colors duration-200 ease-in-out">
                  <div
                    className={`absolute left-0 top-0 w-[25px] h-[25px] bg-white border-[3px] rounded-full transition-transform duration-200 ease-in-out ${
                      fullTextSearch
                        ? 'translate-x-[25px] border-emerald-600'
                        : 'translate-x-0 border-gray-300'
                    }`}
                  ></div>
                </div>
              </label>
              <label
                htmlFor="fullTextSearch"
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                Full Text Search
              </label>
            </div>
            <p className="text-xs text-gray-500 font-light mt-1">
              (Includes resumes and notes)
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="mt-4">
            <SortDropdown value={sort} onChange={onSortChange} />
          </div>

          {/* Filter Sections - TODO: Candidates need to build these */}
          <div className="mt-6">
            {/* TODO: Add CollapsibleSection components for: */}
            {/* - Application Type */}
            {/* - Jobs */}
            {/* - CRM */}
            {/* - Profile Details */}
            {/* - Source */}
            {/* - Responsibility */}
            {/* - Pipeline Tasks */}
            {/* - Education */}
            {/* See CollapsibleSection.tsx for a starting point */}
            {filterSections.map((section) => (
              <FilterSection
                key={section.title}
                section={section}
                selectedFilters={selectedFilters}
                onFilterChange={onFilterChange}
              />
            ))}
          </div>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            disabled={Object.keys(selectedFilters).length === 0}
            className="mt-6 w-full pr-2 py-2 text-blue-500 text-sm font-light flex items-center justify-start gap-2 hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:no-underline"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>Reset Filters</span>
          </button>
        </div>
      </aside>
    </>
  );
};
