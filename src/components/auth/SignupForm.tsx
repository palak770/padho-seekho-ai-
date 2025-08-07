import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Mail, Lock, User, Calendar, Globe, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SignupFormProps {
  onSignup: (userData: any) => void;
  onSwitchToLogin: () => void;
}

export const SignupForm = ({ onSignup, onSwitchToLogin }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    language: "",
    level: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const languages = [
    "English", "Hindi", "Haryanvi", "Punjabi", "Kumauni", "Garhwali"
  ];

  const levels = [
    "Beginner", "Intermediate", "Advanced"
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      if (Object.values(formData).every(value => value)) {
        const userData = {
          id: Date.now().toString(),
          ...formData,
          xp: 0,
          streak: 0,
          completedLessons: [],
          badges: [],
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("padho_user", JSON.stringify(userData));
        onSignup(userData);
        toast({
          title: "Welcome to Padho.ai! 🎉",
          description: "Your account has been created successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ai-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-secondary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-ai-accent/30 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md gradient-card border-border/50 backdrop-blur-glass relative z-10">
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Brain className="h-8 w-8 text-ai-primary" />
            <CardTitle className="text-2xl font-bold">
              Join <span className="text-gradient">Padho.ai</span>
            </CardTitle>
          </div>
          <p className="text-muted-foreground">
            Create your personalized learning profile
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10 bg-input/50 border-border/50 focus:border-ai-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="pl-10 bg-input/50 border-border/50 focus:border-ai-primary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10 bg-input/50 border-border/50 focus:border-ai-primary"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 bg-input/50 border-border/50 focus:border-ai-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger className="bg-input/50 border-border/50 focus:border-ai-primary">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select language" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Level</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger className="bg-input/50 border-border/50 focus:border-ai-primary">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select level" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-ai-accent hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};