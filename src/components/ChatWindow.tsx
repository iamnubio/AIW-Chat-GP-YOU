import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot } from 'lucide-react';
import { openaiService } from '../services/openai';

interface Message {
  content: string;
  isBot: boolean;
}

function formatAIResponse(text: string): string {
  text = text.replace(/\*\*(.*?)\*\*/g, (_, content) => content);
  text = text.replace(/(\d+\.)/g, '\n$1');
  text = text.replace(/([\u2022])/g, '\n$1');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

function ThinkingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-teal-900 rounded-tl-sm">
        <div className="flex items-center gap-2 mb-1">
          <Bot className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-medium text-gray-400">BOOGIE-Ai</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span>Thinking</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const initializeChat = async () => {
        try {
          const response = await openaiService.sendMessage("who are you and why are you here");
          setMessages([{ content: response, isBot: true }]);
        } catch (error) {
          console.error('Error initializing chat:', error);
          setMessages([
            {
              content: "Hello! I'm BOOGIE AI. How can I help you today?",
              isBot: true,
            },
          ]);
        } finally {
          setIsLoading(false);
        }
      };
      initializeChat();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, { content: userMessage, isBot: false }]);

    try {
      const response = await openaiService.sendMessage(userMessage);
      const formattedResponse = formatAIResponse(response);
      setMessages(prev => [...prev, { content: formattedResponse, isBot: true }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          content: "I apologize, but I'm having trouble processing your request. Please try again later.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-teal-900/50 rounded-lg backdrop-blur-sm border border-teal-600/50 shadow-xl relative">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-600/20 via-teal-900/20 to-teal-600/20 rounded-lg blur-sm -z-10"></div>
      <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-900/10 via-teal-600/10 to-teal-900/10 rounded-lg blur-md -z-20"></div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.isBot ? 'bg-teal-900 rounded-tl-sm' : 'bg-teal-600 rounded-tr-sm'}`}>
              {message.isBot && (
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-medium text-gray-400">BOOGIE-Ai</span>
                </div>
              )}
              <p className="text-gray-200 whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && <ThinkingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
