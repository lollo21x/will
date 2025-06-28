import React, { useState } from 'react';
import { Plus, MessageCircle, X, Star, Crown } from 'lucide-react';
import { Conversation } from '../types/chat';
import { ContextMenu } from './ContextMenu';
import { EditTitleModal } from './EditTitleModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { ProModeModal } from './ProModeModal';
import { ThemeToggle } from './ThemeToggle';
import { useProMode } from '../hooks/useProMode';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onEditConversationTitle: (id: string, newTitle: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onEditConversationTitle,
  onDeleteConversation,
  isOpen,
  onToggle,
  isDark,
  onToggleTheme,
}) => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    conversationId: string;
  } | null>(null);
  const [editingConversation, setEditingConversation] = useState<Conversation | null>(null);
  const [deletingConversation, setDeletingConversation] = useState<Conversation | null>(null);
  const [showProModal, setShowProModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const { isProMode, activateProMode, deactivateProMode } = useProMode();

  const handleContextMenu = (e: React.MouseEvent, conversationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      conversationId,
    });
  };

  const handleEdit = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setEditingConversation(conversation);
    }
  };

  const handleDelete = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setDeletingConversation(conversation);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingConversation) {
      onDeleteConversation(deletingConversation.id);
      setDeletingConversation(null);
    }
  };

  const handleSaveTitle = (newTitle: string) => {
    if (editingConversation) {
      onEditConversationTitle(editingConversation.id, newTitle);
      setEditingConversation(null);
    }
  };

  const handleProModeAuthentication = (success: boolean) => {
    if (success) {
      activateProMode();
    }
    setShowProModal(false);
  };

  const handleProButtonClick = () => {
    if (isProMode) {
      setShowLogoutConfirm(true);
    } else {
      setShowProModal(true);
    }
  };

  const handleLogoutConfirm = () => {
    deactivateProMode();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1751113936/Will-iOS-Default-1024x1024_2x_ey6w67.png"
                alt="Will Logo"
                className="w-8 h-8 rounded-lg"
              />
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Will
                </h1>
                {isProMode && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#ffcc00] rounded-full">
                    <Crown className="w-3 h-3 text-white" />
                    <span className="text-xs font-medium text-white">PRO</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 backdrop-blur-md transition-colors"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={onNewConversation}
              className="w-full flex items-center gap-3 px-4 py-3 bg-[#BF00FF]/80 hover:bg-[#BF00FF]/90 backdrop-blur-md text-white rounded-lg transition-colors"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <Plus className="w-5 h-5" />
              New chat
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  onContextMenu={(e) => handleContextMenu(e, conversation.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left backdrop-blur-md
                    ${activeConversationId === conversation.id
                      ? 'bg-[#BF00FF]/20 dark:bg-[#BF00FF]/20 text-[#BF00FF] dark:text-[#BF00FF]'
                      : 'hover:bg-gray-50/80 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300'
                    }
                  `}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{conversation.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {conversation.messages.length} messages
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* PRO Mode Button - Bottom Right */}
          <div className="p-4 flex justify-end">
            <button
              onClick={handleProButtonClick}
              className="
                p-2 rounded-lg transition-colors duration-200 backdrop-blur-md
                bg-[#ffcc00] hover:bg-[#ffcc00]/90
                text-white flex items-center justify-center
              "
              style={{ outline: 'none', boxShadow: 'none' }}
              title={isProMode ? "Esci dalla modalità PRO" : "Attiva modalità PRO"}
            >
              {isProMode ? (
                <Crown className="w-5 h-5" />
              ) : (
                <Star className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onEdit={() => handleEdit(contextMenu.conversationId)}
          onDelete={() => handleDelete(contextMenu.conversationId)}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Edit Title Modal */}
      {editingConversation && (
        <EditTitleModal
          currentTitle={editingConversation.title}
          onSave={handleSaveTitle}
          onCancel={() => setEditingConversation(null)}
        />
      )}

      {/* Confirm Delete Modal */}
      {deletingConversation && (
        <ConfirmDeleteModal
          conversationTitle={deletingConversation.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingConversation(null)}
        />
      )}

      {/* PRO Mode Modal */}
      {showProModal && (
        <ProModeModal
          onAuthenticate={handleProModeAuthentication}
          onCancel={() => setShowProModal(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ffcc00] rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Esci dalla modalità PRO
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sei sicuro di voler uscire dalla modalità PRO? Dovrai inserire nuovamente le credenziali per riattivarla.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-700/80 text-white rounded-lg transition-colors backdrop-blur-md"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                <X className="w-4 h-4" />
                Esci
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500/80 hover:bg-gray-600/80 text-white rounded-lg transition-colors backdrop-blur-md"
                style={{ outline: 'none', boxShadow: 'none' }}
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};