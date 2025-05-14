import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#timeline", label: "Timeline", id: "timeline" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#certifications", label: "Certifications", id: "certifications" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100; // Add offset for navbar height
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
      closeMobileMenu();
    }
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-40 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-heading font-bold text-primary dark:text-primary">
          Akhil Nadh PC
        </Link>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={cn(
                  "hover:text-primary transition-colors relative pb-1",
                  activeSection === link.id ? "text-primary font-medium" : "text-gray-700 dark:text-gray-300"
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden bg-white dark:bg-gray-800 shadow-md transition-all duration-300",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <ul className="py-2 px-4 space-y-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "block py-2 transition-colors",
                  activeSection === link.id ? "text-primary font-medium" : "text-gray-700 dark:text-gray-300"
                )}
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
