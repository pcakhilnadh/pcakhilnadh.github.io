import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { PersonalInfo } from "@/types/data";
import ContactModal from "./ContactModal";
import { ChevronDown } from "lucide-react";

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  const { basic_info } = personalInfo;

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center py-12 md:py-0">
        <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
          <h1 
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4",
              "animate-[fadeIn_0.5s_ease-in-out]"
            )}
          >
            <span className="text-primary dark:text-primary">
              {basic_info.full_name}
            </span>
          </h1>
          <h2 
            className={cn(
              "text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6",
              "animate-[fadeIn_0.5s_ease-in-out]"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            Data Scientist
          </h2>
          <p 
            className={cn(
              "text-lg text-gray-600 dark:text-gray-400 mb-8",
              "animate-[fadeIn_0.5s_ease-in-out]"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            {basic_info.short_summary}
          </p>
          <div 
            className={cn(
              "flex flex-wrap gap-4",
              "animate-[fadeIn_0.5s_ease-in-out]"
            )}
            style={{ animationDelay: "0.6s" }}
          >
            <ContactModal personalInfo={personalInfo} />
            <Button asChild variant="outline" className="px-6 py-3">
              <a href="#projects">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                View Projects
              </a>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://d2ajlz7o3p8ddv.cloudfront.net/media/user_profile/ppc..jpg" 
            alt={basic_info.full_name} 
            className={cn(
              "w-64 h-64 object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-xl",
              "animate-[fadeIn_0.5s_ease-in-out]"
            )}
            style={{ animationDelay: "0.8s" }}
          />
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
}


