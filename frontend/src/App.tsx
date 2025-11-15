import { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ActionBar } from './components/ActionBar';
import { CandidateList } from './components/CandidateList';
import { Pagination } from './components/Pagination';
import type { SortOption } from './components/SortDropdown';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [fullTextSearch, setFullTextSearch] = useState(false);
  const [sort, setSort] = useState<SortOption>('activity_desc');
  const perPage = 5;

  /**
   * Handles filter checkbox changes by adding or removing filters from the selected filters.
   *
   * @param {string} key - The filter key to add or remove
   * @param {boolean} checked - Whether the filter is checked or unchecked
   */
  const handleFilterChange = useCallback((key: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      if (checked) {
        return { ...prev, [key]: true };
      } else {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
    });
  }, []);

  /**
   * Removes a filter from the selected filters.
   *
   * @param {string} key - The filter key to remove
   */
  const handleRemoveFilter = useCallback((key: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, []);

  /**
   * Handles pagination page changes.
   *
   * @param {number} page - The page number to navigate to
   */
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  /**
   * Updates the total candidate count from the CandidateList component.
   *
   * @param {number} total - The total number of candidates
   */
  const handleTotalCandidatesChange = useCallback((total: number) => {
    setTotalCandidates(total);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, selectedFilters, fullTextSearch, sort]);

  const totalPages = Math.ceil(totalCandidates / perPage);

  return (
    <div className="h-dvh bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Page Title */}
      <h1 className="text-2xl font-normal text-gray-900 px-4 sm:px-6 pt-4 pb-3 shrink-0">
        All Candidates
      </h1>

      <div className="flex relative flex-1 min-h-0 overflow-hidden">
        {/* Sidebar - Pre-built component with search, toggle, dropdown */}
        {/* On desktop (lg+), sidebar is always visible. On mobile/tablet, it's controlled by isSidebarOpen */}
        <Sidebar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          fullTextSearch={fullTextSearch}
          onFullTextSearchChange={setFullTextSearch}
          sort={sort}
          onSortChange={setSort}
        />

        {/* Backdrop overlay for mobile/tablet */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden touch-none"
            onClick={() => setIsSidebarOpen(false)}
            onTouchStart={(e) => e.preventDefault()}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 pb-6 flex flex-col overflow-hidden overflow-y-auto -webkit-overflow-scrolling-touch">
          <div className="flex flex-col gap-4 pt-4">
            {/* Action Buttons and Filter Chips Section */}
            <ActionBar
              selectedFilters={selectedFilters}
              onRemoveFilter={handleRemoveFilter}
              onToggleFilters={() => setIsSidebarOpen(!isSidebarOpen)}
              candidateCount={totalCandidates}
            />

            {/* Candidate List */}
            <CandidateList
              searchValue={searchValue}
              currentPage={currentPage}
              perPage={perPage}
              selectedFilters={selectedFilters}
              onTotalCandidatesChange={handleTotalCandidatesChange}
              fullTextSearch={fullTextSearch}
              sort={sort}
            />
            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
