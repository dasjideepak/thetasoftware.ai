import React from 'react';
import { CollapsibleSection } from './CollapsibleSection';
import { FilterOption } from './FilterOption';
import type { FilterSection as FilterSectionType } from '../types/filter';

interface FilterSectionProps {
  section: FilterSectionType;
  selectedFilters: Record<string, boolean>;
  onFilterChange: (key: string, checked: boolean) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = React.memo(
  ({ section, selectedFilters, onFilterChange }) => {
    return (
      <CollapsibleSection
        title={section.title}
        defaultOpen={section.defaultOpen}
      >
        {section.options.map((option) => {
          const optionKey = option.value || option.label;
          const isChecked = selectedFilters[optionKey] || false;

          return (
            <FilterOption
              key={optionKey}
              label={option.label}
              value={option.value}
              checked={isChecked}
              onChange={(checked) => onFilterChange(optionKey, checked)}
            />
          );
        })}
      </CollapsibleSection>
    );
  }
);

FilterSection.displayName = 'FilterSection';
