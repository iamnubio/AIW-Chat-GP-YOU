import React, { useState } from 'react';
import { TopMenu } from './components/TopMenu';
import { ChatWindow } from './components/ChatWindow';
import { BottomMenu } from './components/BottomMenu';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-[100dvh] flex flex-col bg-gray-900 text-white overflow-hidden">
      <header className="flex-none p-4 bg-gray-950/90 backdrop-blur-sm border-b border-blue-900/50">
        <TopMenu isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>
      
      <main className="flex-1 min-h-0 p-4 overflow-hidden">
        <ChatWindow />
      </main>

      <footer className="flex-none bg-gray-950/90 backdrop-blur-md border-t border-blue-900 py-2 px-4">
        <BottomMenu />
      </footer>
    </div>
  );
}

export default App;
