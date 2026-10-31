import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Wallet } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('expense-tracker-theme') === 'dark' ||
        (!localStorage.getItem('expense-tracker-theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('expense-tracker-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('expense-tracker-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                SpendFlow
              </span>
              <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 leading-none hidden sm:block">
                Personal Finance Tracker
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Theme toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={toggleTheme}
            aria-label={isDark ? 'Light theme' : 'Dark theme'}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
