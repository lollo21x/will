import React from 'react';
import { User, Clock, AlertCircle } from 'lucide-react';
import { Message } from '../types/chat';
import { MessageActions } from './MessageActions';

interface MessageBubbleProps {
  message: Message;
  onRegenerate?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onRegenerate }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
      {/* Avatar */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-md
        ${isUser 
          ? 'bg-[#BF00FF]/80 text-white' 
          : 'bg-gray-100/80 dark:bg-gray-700/80'
        }
      `}>
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <img 
            src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1751113936/Will-watchOS-Default-1024x1024_2x_xtphav.png"
            alt="Will AI"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`
          inline-block px-4 py-3 rounded-2xl backdrop-blur-md
          ${isUser
            ? 'bg-[#BF00FF]/80 text-white rounded-br-md'
            : 'bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-bl-md'
          }
        `}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        {/* Message Actions */}
        <MessageActions 
          content={message.content}
          isUser={isUser}
          onRegenerate={!isUser ? onRegenerate : undefined}
        />
        
        {/* Message Status */}
        <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
          {message.status === 'sending' && (
            <>
              <Clock className="w-3 h-3" />
              Sending...
            </>
          )}
          {message.status === 'error' && (
            <>
              <AlertCircle className="w-3 h-3 text-red-500" />
              Failed to send
            </>
          )}
          {message.status === 'sent' && (
            <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          )}
        </div>
      </div>
    </div>
  );
};