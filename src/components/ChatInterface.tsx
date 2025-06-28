import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Message } from '../types/chat';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onRegenerateMessage: (messageId: string) => void;
  isLoading?: boolean;
  conversationTitle?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onRegenerateMessage,
  isLoading = false,
  conversationTitle = 'New chat',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 relative">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-[#BF00FF]/20 dark:bg-[#BF00FF]/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1751113936/Will-watchOS-Default-1024x1024_2x_xtphav.png"
                alt="Will AI"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Ask me anything! I'm here to help you with questions, creative tasks, analysis, and much more.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                onRegenerate={message.sender === 'ai' ? () => onRegenerateMessage(message.id) : undefined}
              />
            ))}
            {isLoading && (
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-md flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1751113936/Will-watchOS-Default-1024x1024_2x_xtphav.png"
                    alt="Will AI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 max-w-3xl">
                  <div className="inline-block px-4 py-3 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input - Now floating with blur */}
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};