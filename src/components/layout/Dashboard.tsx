import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, BookOpen, MessageCircle, BarChart3, Trophy, Flame, 
  Zap, Target, Clock, Users, LogOut, Settings, Mic, User 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onNavigate: (section: string) => void;
}

export const Dashboard = ({ user, onLogout, onNavigate }: DashboardProps) => {
  const { toast } = useToast();
  
  const subjects = [
    { name: "Mathematics", icon: "🔢", progress: 45, lessons: 24 },
    { name: "Science", icon: "🔬", progress: 30, lessons: 18 },
    { name: "English", icon: "📚", progress: 65, lessons: 32 },
    { name: "Coding", icon: "💻", progress: 20, lessons: 12 },
    { name: "AI/ML", icon: "🤖", progress: 10, lessons: 8 },
    { name: "History", icon: "🏛️", progress: 55, lessons: 28 },
  ];

  const recentAchievements = [
    { title: "First Lesson!", icon: "🎯", date: "Today" },
    { title: "Quick Learner", icon: "⚡", date: "Yesterday" },
    { title: "Streak Master", icon: "🔥", date: "2 days ago" },
  ];

  const quickActions = [
    { label: "AI Tutor Chat", icon: MessageCircle, action: () => onNavigate("chat") },
    { label: "Browse Lessons", icon: BookOpen, action: () => onNavigate("lessons") },
    { label: "Take Quiz", icon: Target, action: () => onNavigate("quiz") },
    { label: "View Progress", icon: BarChart3, action: () => onNavigate("progress") },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-glass bg-card/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-ai-primary" />
            <h1 className="text-2xl font-bold text-gradient">Padho.ai</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-ai-warning" />
              <span className="font-semibold">{user.streak || 0} day streak</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-ai-accent" />
              <span className="font-semibold">{user.xp || 0} XP</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onNavigate("settings")}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to continue your learning journey?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Lessons Completed</p>
                      <p className="text-2xl font-bold">{user.completedLessons?.length || 0}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-ai-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Study Time</p>
                      <p className="text-2xl font-bold">2.5h</p>
                    </div>
                    <Clock className="h-8 w-8 text-ai-secondary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Rank</p>
                      <p className="text-2xl font-bold">#42</p>
                    </div>
                    <Trophy className="h-8 w-8 text-ai-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-ai-accent" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="glass"
                      className="h-20 flex-col space-y-2"
                      onClick={action.action}
                    >
                      <action.icon className="h-6 w-6" />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects Progress */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-ai-primary" />
                  Your Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((subject, index) => (
                    <Card 
                      key={index} 
                      className="bg-card/30 border-border/30 hover:bg-card/50 transition-colors cursor-pointer"
                      onClick={() => onNavigate("lessons")}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{subject.icon}</span>
                            <h3 className="font-semibold">{subject.name}</h3>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {subject.lessons} lessons
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.level} Learner</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Language:</span>
                    <span>{user.language}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Age:</span>
                    <span>{user.age}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-ai-accent" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Chat Shortcut */}
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-ai-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ask our AI tutor anything!
                </p>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => onNavigate("chat")}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};