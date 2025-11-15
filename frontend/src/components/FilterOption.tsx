import React from 'react';

interface FilterOptionProps {
  label: string;
  count?: number;
  value?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

/**
 * FilterOption component displays a single filter checkbox option.
 *
 * @param {FilterOptionProps} props - Component props
 * @returns {JSX.Element} The filter option component
 */
export const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  /**
   * Handles checkbox change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded px-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="w-4 h-4 text-emerald-600 border-gray-200 rounded focus:ring-emerald-600 focus:ring-1"
      />
      <span className="text-sm text-gray-900 flex-1">
        {label}
      </span>
    </label>
  );
};
