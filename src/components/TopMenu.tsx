import React from 'react';
import { Menu, Bot, X } from 'lucide-react';

interface TopMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function TopMenu({ isOpen, onToggle }: TopMenuProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 via-teal-900 to-teal-600 bg-clip-text text-transparent">
          MOTOSIM.io 
        </h1>
      </div>
      <button
        onClick={onToggle}
        className="p-2 rounded-lg bg-teal-900/30 hover:bg-teal-600/40 border border-teal-600/50 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200" />
        ) : (
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-200" />
        )}
      </button>
    </div>
  );
}
