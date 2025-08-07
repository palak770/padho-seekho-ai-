import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Dashboard } from "@/components/layout/Dashboard";
import { AIChat } from "@/components/learning/AIChat";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [currentView, setCurrentView] = useState<"login" | "signup" | "dashboard" | "chat" | "lessons" | "quiz" | "progress" | "settings">("login");

  useEffect(() => {
    const savedUser = localStorage.getItem("padho_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView("dashboard");
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setCurrentView("dashboard");
  };

  const handleSignup = (userData: any) => {
    setUser(userData);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("padho_user");
    setUser(null);
    setCurrentView("login");
  };

  const handleNavigate = (section: string) => {
    setCurrentView(section as any);
  };

  if (currentView === "login") {
    return <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView("signup")} />;
  }

  if (currentView === "signup") {
    return <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setCurrentView("login")} />;
  }

  if (currentView === "chat") {
    return <AIChat user={user} onBack={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "dashboard") {
    return <Dashboard user={user} onLogout={handleLogout} onNavigate={handleNavigate} />;
  }

  // Placeholder for other views
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gradient">Feature Coming Soon!</h1>
        <p className="text-xl text-muted-foreground mb-6">This section is under development</p>
        <button 
          onClick={() => setCurrentView("dashboard")}
          className="text-ai-accent hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Index;
