import { useState, type ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onMenuClick={openSidebar} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
            <span className="font-semibold text-gray-800 dark:text-gray-200">SpendFlow</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Personal Finance Tracker</span>
            <span className="hidden md:inline">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300 border border-primary-200/60 dark:border-primary-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              Built with CI/CD Automation
            </span>
          </div>
          <div className="text-xs">
            Created by{' '}
            <a
              href="https://serkanbayraktar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              Serkanby
            </a>
            {' | '}
            <a
              href="https://github.com/Serkanbyx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
