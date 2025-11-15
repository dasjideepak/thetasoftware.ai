export interface FilterOption {
  label: string;
  value?: string;
}

export interface FilterSection {
  title: string;
  options: FilterOption[];
  defaultOpen?: boolean;
}
