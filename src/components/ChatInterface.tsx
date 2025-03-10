
import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowDown, Trash2, Sparkles, Terminal, Code } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import AnimatedTransition from './AnimatedTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PythonIntegration from './PythonIntegration';

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState('chat');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const checkScroll = () => {
      if (!chatContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isScrolledUp);
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    sendMessage(messageInput);
    setMessageInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full overflow-hidden rounded-2xl glass-panel transition-all duration-300 ease-in-out",
      className
    )}>
      <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between p-4 border-b">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="python" className="flex items-center gap-1">
              <Terminal className="h-4 w-4" />
              <span>Python</span>
            </TabsTrigger>
          </TabsList>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Clear
          </Button>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 scroll-smooth"
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && (
                <MessageBubble 
                  message={{
                    id: 'typing',
                    content: 'Thinking',
                    sender: 'bot',
                    timestamp: new Date(),
                    status: 'sending'
                  }} 
                  isTyping={true} 
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {showScrollButton && (
            <Button
              className="absolute bottom-20 right-4 rounded-full w-10 h-10 p-0 shadow-md bg-background/80 backdrop-blur-sm"
              size="icon"
              onClick={scrollToBottom}
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          )}

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="relative">
              <Textarea
                ref={messageInputRef}
                placeholder="Ask about courses, colleges, or career opportunities in India..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="resize-none pr-12 glass-input min-h-[60px] max-h-[200px]"
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!messageInput.trim()}
                className="absolute right-2 bottom-2 rounded-full w-8 h-8 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex justify-start gap-2">
              <AnimatedTransition>
                <SuggestionChip 
                  onClick={() => sendMessage("What are the best engineering colleges in India?")}
                >
                  Top IITs & NITs
                </SuggestionChip>
              </AnimatedTransition>
              <AnimatedTransition showDelay={100}>
                <SuggestionChip 
                  onClick={() => sendMessage("Career options after B.Tech in India")}
                >
                  B.Tech careers
                </SuggestionChip>
              </AnimatedTransition>
              <AnimatedTransition showDelay={200}>
                <SuggestionChip 
                  onClick={() => sendMessage("MBBS colleges in India")}
                >
                  MBBS options
                </SuggestionChip>
              </AnimatedTransition>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="python" className="p-4">
          <PythonIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface SuggestionChipProps {
  children: React.ReactNode;
  onClick: () => void;
}

const SuggestionChip: React.FC<SuggestionChipProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
    >
      <Sparkles className="h-3 w-3 mr-1" />
      {children}
    </button>
  );
};

export default ChatInterface;
