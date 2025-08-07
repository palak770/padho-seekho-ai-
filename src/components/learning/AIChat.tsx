import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Brain, Send, Mic, MicOff, ArrowLeft, Volume2, 
  Sparkles, BookOpen, Calculator, Beaker 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIChatProps {
  user: any;
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "suggestion";
}

export const AIChat = ({ user, onBack }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello ${user.name}! I'm your AI tutor. I can help you with Math, Science, English, Coding, and more. What would you like to learn today?`,
      sender: "ai",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickSuggestions = [
    { text: "Explain photosynthesis", icon: Beaker },
    { text: "Help with algebra", icon: Calculator },
    { text: "Grammar rules", icon: BookOpen },
    { text: "Python basics", icon: Brain },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const responses = {
      math: "Let me help you with that math problem! I'll break it down step by step so it's easy to understand.",
      science: "Great science question! Let me explain this concept with some examples and illustrations.",
      english: "I'd be happy to help with English! Let's work through this together.",
      coding: "Excellent! Let's dive into coding. I'll show you the concepts with practical examples.",
      default: "That's an interesting question! Let me provide you with a comprehensive explanation with examples."
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("math") || lowerQuestion.includes("algebra") || lowerQuestion.includes("calculate")) {
      return responses.math;
    } else if (lowerQuestion.includes("science") || lowerQuestion.includes("photo") || lowerQuestion.includes("physics")) {
      return responses.science;
    } else if (lowerQuestion.includes("english") || lowerQuestion.includes("grammar") || lowerQuestion.includes("writing")) {
      return responses.english;
    } else if (lowerQuestion.includes("code") || lowerQuestion.includes("python") || lowerQuestion.includes("programming")) {
      return responses.coding;
    }
    return responses.default;
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording ? "Processing your voice..." : "Speak your question",
    });
  };

  const speakMessage = (content: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-glass bg-card/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Brain className="h-8 w-8 text-ai-primary" />
            <div>
              <h1 className="text-xl font-bold">AI Tutor</h1>
              <p className="text-xs text-muted-foreground">Multilingual Learning Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-ai-success rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <Card className="lg:col-span-3 gradient-card border-border/50 h-[calc(100vh-200px)]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-ai-accent" />
                Chat with AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              {/* Messages */}
              <ScrollArea className="flex-1 mb-4 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={message.sender === "user" ? "bg-ai-primary" : "bg-ai-secondary"}>
                            {message.sender === "user" ? user.name[0] : "AI"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-ai-primary text-white"
                              : "bg-card border border-border"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            {message.sender === "ai" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => speakMessage(message.content)}
                              >
                                <Volume2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-ai-secondary">AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-card border border-border rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="space-y-3">
                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSendMessage(suggestion.text)}
                    >
                      <suggestion.icon className="h-3 w-3 mr-1" />
                      {suggestion.text}
                    </Button>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder={`Ask anything in ${user.language}...`}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                      className="bg-input/50 border-border/50 focus:border-ai-primary pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 ${isRecording ? "text-ai-danger" : ""}`}
                      onClick={handleVoiceToggle}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button
                    variant="hero"
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Chat Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">I can help you with:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Math & Science problems</li>
                  <li>• Coding tutorials</li>
                  <li>• Language learning</li>
                  <li>• Exam preparation</li>
                  <li>• Doubt solving</li>
                  <li>• Study planning</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Voice Features:</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mic className="h-3 w-3 mr-2" />
                    Voice Questions
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Volume2 className="h-3 w-3 mr-2" />
                    Audio Answers
                  </Button>
                </div>
              </div>

              <div className="p-3 bg-card/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Ask specific questions for better help. For example: "Explain photosynthesis step by step"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};