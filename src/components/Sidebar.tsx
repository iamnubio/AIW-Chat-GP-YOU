import React from 'react';
import { MessageSquare, Layout, FolderKanban, BookOpen, Settings, HelpCircle, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: MessageSquare, label: 'Chat', path: '/' },
    { icon: Layout, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: BookOpen, label: 'Resources', path: '/resources' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
  ];

  return (
    <>
      {/* External close button */}
      <button
        onClick={onClose}
        className={`fixed top-[50%] -translate-y-1/2 z-[1000] transition-all duration-300 ${
          isOpen ? 'right-[250px]' : 'right-0'
        } bg-gray-950 p-2 rounded-l-lg border-l border-y border-teal-900/50`}
      >
        <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${
          !isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[73px] right-0 h-[calc(100dvh-73px)] bg-gray-950/95 backdrop-blur-sm border-l border-teal-900/50 transition-transform duration-300 ease-in-out z-[999] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '250px' }}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
