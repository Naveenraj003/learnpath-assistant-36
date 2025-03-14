
import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isTyping = false
}) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-4 items-start gap-2",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="w-8 h-8 border bg-primary/10 shrink-0 mt-1">
          <div className="text-xs font-semibold text-primary">AI</div>
        </Avatar>
      )}
      
      <div
        className={cn(
          "relative max-w-[80%]",
          isUser ? "chat-bubble-user" : "chat-bubble-bot"
        )}
      >
        <div className="flex flex-col">
          <div className="prose prose-sm max-w-none break-words">
            {message.content}
            {isTyping && (
              <span className="inline-flex ml-1 items-center">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse delay-150">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            )}
          </div>
          
          <div className={cn(
            "text-[10px] self-end mt-1 flex items-center",
            isUser ? "text-primary-foreground/70" : "text-secondary-foreground/70"
          )}>
            {message.status === 'sending' && (
              <Loader2 className="h-2 w-2 mr-1 animate-spin" />
            )}
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8 border shrink-0 mt-1">
          <div className="text-xs font-semibold">You</div>
        </Avatar>
      )}
    </div>
  );
};

export default MessageBubble;
