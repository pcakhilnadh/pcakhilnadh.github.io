import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Terminal, User, Briefcase, Code, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabsLayoutProps {
  children: React.ReactNode;
}

export default function TabsLayout({ children }: TabsLayoutProps) {
  const [activeTab, setActiveTab] = useState("about");
  const [mounted, setMounted] = useState(false);
  
  // Handle URL hash changes
  useEffect(() => {
    setMounted(true);
    
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['about', 'timeline', 'skills', 'projects', 'certifications'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    
    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.history.pushState(null, '', `#${value}`);
    
    // Scroll to top of content
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  if (!mounted) return null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md py-2 border-b border-border">
          <TabsList className="w-full justify-between md:justify-start md:gap-4 bg-transparent">
            <TabsTrigger 
              value="about" 
              className={cn(
                "data-[state=active]:bg-accent data-[state=active]:text-primary",
                "flex items-center gap-1.5"
              )}
            >
              <User size={16} />
              <span className="hidden md:inline">About</span>
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className={cn(
                "data-[state=active]:bg-accent data-[state=active]:text-primary",
                "flex items-center gap-1.5"
              )}
            >
              <Clock size={16} />
              <span className="hidden md:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger 
              value="skills" 
              className={cn(
                "data-[state=active]:bg-accent data-[state=active]:text-primary",
                "flex items-center gap-1.5"
              )}
            >
              <Code size={16} />
              <span className="hidden md:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className={cn(
                "data-[state=active]:bg-accent data-[state=active]:text-primary",
                "flex items-center gap-1.5"
              )}
            >
              <Briefcase size={16} />
              <span className="hidden md:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger 
              value="certifications" 
              className={cn(
                "data-[state=active]:bg-accent data-[state=active]:text-primary",
                "flex items-center gap-1.5"
              )}
            >
              <Award size={16} />
              <span className="hidden md:inline">Certifications</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {children}
      </Tabs>
    </div>
  );
}