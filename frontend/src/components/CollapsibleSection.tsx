/**
 * CollapsibleSection Component - SKELETON/STARTING POINT
 *
 * This is an incomplete component provided as a reference.
 * You need to implement the expand/collapse functionality.
 *
 * Requirements:
 * - Should expand/collapse when clicked
 * - Chevron should rotate 90 degrees when collapsed (point right) vs expanded (point down)
 * - Should have proper border styling
 * - Children should only show when expanded
 *
 * Design specs:
 * - Border: border-b border-[#e1e1e1]
 * - Button padding: py-3
 * - Font: text-[14px] font-medium text-[#15372c] leading-[19.5px]
 * - Chevron size: w-3.5 h-3.5
 * - Hover: hover:bg-gray-50
 */

import { useState } from 'react';
import type { ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  // TODO: Add state management for open/closed
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#e1e1e1] ">
      {/* TODO: Make this button toggle the isOpen state */}
      <button
        className="w-full flex items-center justify-between py-3 text-[14px] font-medium text-[#15372c] hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="leading-[19.5px]">{title}</span>
        {/* TODO: Add chevron icon that rotates based on isOpen state */}
        {/* When collapsed (isOpen = false): rotate-90 (points right) */}
        {/* When expanded (isOpen = true): no rotation (points down) */}
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
      {/* TODO: Only show children when isOpen is true */}
      {isOpen && children && <div className="pb-3 px-2">{children}</div>}
    </div>
  );
};
