"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Loader2, Mic, MicOff } from "lucide-react";

interface NeuralAssistantProps {
  onSearch?: (query: string) => void;
}

export default function NeuralAssistant({ onSearch }: NeuralAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", text: "Hi! I'm Zenvya Assistant. Tell me what you're looking for and I'll find the best deals across platforms." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    if (isListening) recognition.stop();
    else recognition.start();
  };

  const handleSend = async (manualInput?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;
    
    if (!manualInput) setInput("");
    setMessages(prev => [...prev, { role: "user", text: textToSend }]);
    setIsTyping(true);

    // Always trigger a real search for any product query
    const query = textToSend.toLowerCase();
    
    // Detect help/how-to queries vs product queries
    const isHelpQuery = query.includes("help") || query.includes("how do") || query.includes("what can");

    setTimeout(() => {
      let response = "";

      if (isHelpQuery) {
        response = "You can ask me to find any product! Try:\n• \"Find me a handbag\"\n• \"Show me phones under 50k\"\n• \"I need headphones\"\n\nI'll search across Amazon, Flipkart, and more to find you the best deal.";
      } else if (query.includes("budget") || query.includes("price") || query.includes("cheap")) {
        response = `Searching for budget-friendly options... I'll update the results for you now!`;
        if (onSearch) onSearch(textToSend);
      } else {
        // For ANY other query, treat it as a product search
        response = `Searching for "${textToSend}" across Amazon, Flipkart, and Croma. Updating your results now!`;
        if (onSearch) onSearch(textToSend);
      }
      
      setMessages(prev => [...prev, { role: "system", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[300] bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-all border border-primary"
        aria-label="Open AI assistant"
      >
        <Sparkles className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-[300] w-full max-w-sm bg-card backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-primary/5 flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Zenvya Assistant</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground p-1" aria-label="Close assistant">
                  <X className="w-4 h-4" />
               </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed whitespace-pre-line ${
                      m.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-foreground'
                    }`}>
                       {m.text}
                    </div>
                 </div>
               ))}
               {isTyping && (
                 <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                       <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    </div>
                 </div>
               )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
               <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isListening ? "Listening..." : "Ask me anything..."} 
                    className="w-full bg-background border border-border rounded-full pl-4 pr-20 py-3 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                     <button 
                        onClick={toggleListening}
                        className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-muted-foreground hover:text-primary'}`}
                        aria-label={isListening ? "Stop listening" : "Start voice input"}
                     >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                     </button>
                     <button onClick={() => handleSend()} className="p-2 text-primary hover:scale-110 transition-transform" aria-label="Send message">
                        <Send className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
