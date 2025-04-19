
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm Rakshak, your AI police assistant. How can I help you file your complaint today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const RakshakChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        "theft": "I'm sorry to hear about the theft. Please provide details like what was stolen, when and where it happened, and any suspect information if available.",
        "assault": "I understand this is difficult. Please share details about when and where the assault occurred. Your safety is our priority.",
        "police": "Our officers are trained professionals dedicated to public safety. How can they assist you today?",
        "report": "To file a report, fill out all required fields in the form. You can attach evidence like photos or videos to strengthen your case.",
        "evidence": "You can upload photos, videos, documents, or any digital evidence using the file upload feature in the complaint form.",
        "help": "I'm here to help! You can ask me about the complaint process, what information is needed, or how to track your case."
      };

      let botReply = "I'll help you with your complaint. Could you provide more details about what happened?";
      
      // Check if any keywords match
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (input.toLowerCase().includes(keyword.toLowerCase())) {
          botReply = response;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="border-b border-police-700 pb-4 mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          Rakshak AI Assistant
        </h3>
        <p className="text-sm text-gray-400">
          I can help you with filing your complaint
        </p>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-police-700 text-gray-100 rounded-tl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? (
                  <Bot className="w-4 h-4 mr-1" />
                ) : (
                  <User className="w-4 h-4 mr-1" />
                )}
                <span className="text-xs opacity-75">
                  {message.sender === 'bot' ? 'Rakshak' : 'You'} • {formatTime(message.timestamp)}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-police-700 text-white px-4 py-2 rounded-lg rounded-tl-none max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-police-700 pt-4">
        <form 
          className="flex items-center space-x-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-police-900 border-police-700"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RakshakChat;
