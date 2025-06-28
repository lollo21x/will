import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    regenerateMessage,
    createNewConversation,
    selectConversation,
    editConversationTitle,
    deleteConversation,
  } = useChat();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onNewConversation={createNewConversation}
        onEditConversationTitle={editConversationTitle}
        onDeleteConversation={deleteConversation}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header - Menu button + Chat title with blur (no border) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 backdrop-blur-md transition-colors"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {activeConversation?.title || 'New chat'}
          </h2>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Chat Interface */}
        <div className="flex-1 min-h-0">
          <ChatInterface
            messages={activeConversation?.messages || []}
            onSendMessage={sendMessage}
            onRegenerateMessage={regenerateMessage}
            isLoading={isLoading}
            conversationTitle={activeConversation?.title || 'New chat'}
          />
        </div>
      </div>
    </div>
  );
}

export default App;