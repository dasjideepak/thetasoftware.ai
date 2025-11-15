import { useState, useCallback } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ActionBar } from './components/ActionBar';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        />

        {/* Backdrop overlay for mobile/tablet */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden touch-none"
            onClick={() => setIsSidebarOpen(false)}
            onTouchStart={(e) => e.preventDefault()}
          />
        )}

        {/* Main Content - Scrollable */}
        <main className="flex-1 px-4 sm:px-6 pb-6 overflow-y-auto min-h-0 -webkit-overflow-scrolling-touch">
          {/* TODO: Add action buttons here (Generate Report, + Add Candidate, Bulk Actions) */}
          {/* Action Buttons and Filter Chips Section */}
          <ActionBar
            selectedFilters={selectedFilters}
            onRemoveFilter={handleRemoveFilter}
            onToggleFilters={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          {/* TODO: Add candidate list here */}
          {/* TODO: Add pagination here */}
        </main>
      </div>
    </div>
  );
}

export default App;
