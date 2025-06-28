import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading = false, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const isButtonDisabled = !message.trim() || disabled || isLoading;

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:left-80 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={disabled || isLoading}
              className="
                w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 
                bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white backdrop-blur-md
                disabled:cursor-not-allowed
                resize-none min-h-[48px] max-h-32 overflow-y-auto
                placeholder-gray-500 dark:placeholder-gray-400
              "
              style={{ 
                outline: 'none',
                boxShadow: 'none',
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                height: '48px'
              }}
              rows={1}
            />
            <style jsx>{`
              textarea::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
          
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={`
              flex-shrink-0 w-12 h-12 rounded-xl backdrop-blur-md
              flex items-center justify-center text-white transition-all duration-200
              transform -translate-y-1.5
              ${isButtonDisabled 
                ? 'bg-gray-400/80 dark:bg-gray-600/80 cursor-not-allowed' 
                : 'bg-[#BF00FF]/80 hover:bg-[#BF00FF]/90'
              }
            `}
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ArrowUp className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};