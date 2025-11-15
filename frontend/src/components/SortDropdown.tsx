import React, { useState, useRef, useEffect } from 'react';

export type SortOption =
  | 'activity_desc'
  | 'activity_asc'
  | 'name_asc'
  | 'name_desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'activity_desc', label: 'Last Activity (new to old)' },
  { value: 'activity_asc', label: 'Last Activity (old to new)' },
  { value: 'name_asc', label: 'Name (A to Z)' },
  { value: 'name_desc', label: 'Name (Z to A)' },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: SortOption) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[36px] px-3 flex items-center justify-between border border-[#e1e1e1] bg-white text-[14px] text-[#333333] hover:border-[#00A88F] transition-colors cursor-pointer rounded"
        aria-label="Sort options"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedOption?.label || 'Select sort'}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-[#909090] shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#e1e1e1] rounded shadow-lg max-h-60 overflow-auto">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-3 py-2 text-left text-[14px] hover:bg-gray-50 transition-colors cursor-pointer ${
                value === option.value
                  ? 'bg-[#f0f9f7] text-[#00A88F] font-medium'
                  : 'text-[#333333]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
