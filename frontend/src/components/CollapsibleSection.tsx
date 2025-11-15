import { useState } from 'react';
import type { ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

/**
 * CollapsibleSection component provides an expandable/collapsible section for filter groups.
 * Displays a title with a chevron icon that rotates when expanded/collapsed.
 *
 * @param {CollapsibleSectionProps} props - Component props
 * @param {string} props.title - The section title
 * @param {ReactNode} [props.children] - The content to display when expanded
 * @param {boolean} [props.defaultOpen=false] - Whether the section is open by default
 * @returns {JSX.Element} The collapsible section component
 */
export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="leading-[19.5px]">{title}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      {isOpen && children && <div className="pb-3 px-2">{children}</div>}
    </div>
  );
};
