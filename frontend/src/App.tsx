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

  const handleRemoveFilter = useCallback((key: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleTotalCandidatesChange = useCallback((total: number) => {
    setTotalCandidates(total);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, selectedFilters, fullTextSearch, sort]);

  const totalPages = Math.ceil(totalCandidates / perPage);

  return (
    <div className="h-dvh bg-[#f7f8f7] flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Page Title */}
      <h1 className="text-[34.59px] font-normal text-[#15372c] px-4 sm:px-6 pt-4 pb-3 leading-[46.67px] shrink-0">
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
        <main className="flex-1 px-4 sm:px-6 pb-6 min-h-0 flex flex-col overflow-hidden">
          {/* Action Buttons and Filter Chips Section - Sticky */}
          <div className="sticky top-0 z-10 bg-[#f7f8f7] pt-4 pb-4 shrink-0">
            <ActionBar
              selectedFilters={selectedFilters}
              onRemoveFilter={handleRemoveFilter}
              onToggleFilters={() => setIsSidebarOpen(!isSidebarOpen)}
              candidateCount={totalCandidates}
            />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 min-h-0 overflow-y-auto -webkit-overflow-scrolling-touch">
            <div className="flex flex-col gap-4">
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
