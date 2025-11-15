import { useState } from 'react';
import {
  IconSearch,
  IconSettings,
  IconHelpCircle,
  IconChevronDown,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';

export const Header = () => {
  const [isRecruitingOpen, setIsRecruitingOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Jobs', href: '#' },
    { label: 'Candidates', href: '#', active: true },
    { label: 'CRM', href: '#' },
    { label: 'Reports', href: '#' },
    { label: 'Integrations', href: '#' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left Section - Brand & Recruiting Dropdown */}
          <div className="flex items-center gap-1 shrink-0">
            <img
              src="/greenhouse-logo.svg"
              alt="greenhouse"
              className="h-6 w-auto cursor-pointer mt-2"
            />

            {/* Recruiting Dropdown - Hidden on mobile */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsRecruitingOpen(!isRecruitingOpen)}
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer text-sm font-medium"
              >
                <span className="text-lg font-normal">Recruiting</span>
                <IconChevronDown
                  className={`mt-[.5px] w-3.5 h-3.5 transition-transform text-gray-800 ${
                    isRecruitingOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Navigation Links - Hidden on mobile, shown on tablet+ */}
            <nav className="hidden lg:flex items-center gap-4 ml-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm transition-colors relative pb-0.5 ${
                    item.active
                      ? 'font-medium text-blue-600 hover:text-blue-600'
                      : 'font-normal text-gray-900 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Section - Search & Icons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Bar - Responsive */}
            <div className="relative hidden sm:block">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all ${
                  isSearchFocused
                    ? 'border-gray-400 bg-white shadow-sm'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <IconSearch className="w-4 h-4 text-gray-800" />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none bg-transparent text-sm w-28 lg:w-36 placeholder:text-gray-600"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <span className="text-xs text-gray-800 hidden lg:inline font-mono border border-gray-300 px-1.5 py-0.5 rounded">
                  ⌘+K
                </span>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              {/* Settings Icon */}
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer">
                <IconSettings className="w-4.5 h-4.5 text-gray-800" />
              </button>

              {/* Help Icon */}
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer">
                <IconHelpCircle className="w-4.5 h-4.5 text-gray-800" />
              </button>

              {/* User Profile Icon */}
              <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center text-xs font-semibold text-gray-700 cursor-pointer">
                AC
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-gray-800 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <IconX className="w-6 h-6" />
              ) : (
                <IconMenu2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">
              {/* Recruiting Dropdown for Mobile */}
              <button
                onClick={() => setIsRecruitingOpen((prev) => !prev)}
                className="flex items-center justify-between text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Recruiting</span>
                <IconChevronDown
                  className={`w-4 h-4 transition-transform text-gray-800 ${
                    isRecruitingOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    className={`transition-colors py-2 ${
                      item.active
                        ? 'font-medium text-blue-600 hover:text-blue-600 border-l-4 border-blue-600 pl-3'
                        : 'text-black hover:text-gray-700 pl-0'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Search Bar */}
              <div className="pt-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white">
                  <IconSearch className="w-4 h-4 text-gray-800" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="outline-none bg-transparent text-sm flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
