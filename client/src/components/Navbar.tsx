import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X, Terminal, User, Clock, Code, Briefcase, Award } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, setTheme } = useTheme();
  const [typedText, setTypedText] = useState("");
  const welcomeText = "akhil_nadh_pc";
  
  // Typewriter effect for name
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < welcomeText.length) {
        setTypedText(welcomeText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    
    return () => clearInterval(typing);
  }, []);
  
  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "timeline", "skills", "projects", "certifications"];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: sectionId === "hero" ? 0 : section.offsetTop - 80,
        behavior: "smooth"
      });
    }
    closeMobileMenu();
  };
  
  const navLinks = [
    { id: "about", label: "About", icon: <User size={16} /> },
    { id: "timeline", label: "Timeline", icon: <Clock size={16} /> },
    { id: "skills", label: "Skills", icon: <Code size={16} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={16} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={16} /> }
  ];
  
  return (
    <header className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-border z-40 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a 
          href="#" 
          className="text-xl font-mono font-bold text-primary flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
        >
          <Terminal size={20} className="text-primary" />
          <span className="cursor">{typedText}</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-1.5",
                activeSection === link.id ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => scrollToSection(link.id)}
            >
              {link.icon}
              <span>{link.label}</span>
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute w-full bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <ul className="py-2 px-4 space-y-3">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "terminal-text block py-2 transition-colors",
                  activeSection === link.id ? "text-primary" : "text-muted-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                <span className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}



