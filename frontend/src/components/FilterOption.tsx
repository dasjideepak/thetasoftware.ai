import React from 'react';

interface FilterOptionProps {
  label: string;
  count?: number;
  value?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-gray-50 rounded px-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="w-4 h-4 text-[#047957] border-[#e1e1e1] rounded focus:ring-[#047957] focus:ring-1"
      />
      <span className="text-[13px] text-[#333333] leading-[19.5px] flex-1">
        {label}
      </span>
    </label>
  );
};
