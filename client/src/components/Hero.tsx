import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Briefcase, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PersonalData } from "@/types/data";
import ContactModal from "./ContactModal";

interface HeroProps {
  personalData: PersonalData;
}

export default function Hero({ personalData }: HeroProps) {
  const { basic_info } = personalData;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Check if profile image is loading correctly
    if (personalData && personalData.profileImage) {
      const img = new Image();
      img.onload = () => console.log('Profile image loaded successfully:', personalData.profileImage);
      img.onerror = () => console.error('Profile image failed to load:', personalData.profileImage);
      img.src = personalData.profileImage;
    }
  }, [personalData]);

  const scrollToProjects = () => {
    window.location.hash = "projects";
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center py-20 matrix-bg relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {basic_info.full_name}
            </motion.h1>
            <motion.h2 
              className="text-xl md:text-2xl font-medium text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {basic_info.tagline}
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {basic_info.short_summary}
            </motion.p>
            
            {/* Experience Badge */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
                <span className="text-primary font-mono font-medium">
                  {basic_info.total_years_of_experiece} of Experience
                </span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                size="lg"
                className="flex items-center gap-2"
                onClick={() => setIsContactModalOpen(true)}
              >
                <Mail size={18} />
                Contact Me
              </Button>
              {/* <Button 
                variant="outline" 
                size="lg"
                className="flex items-center gap-2"
                onClick={scrollToProjects}
              >
                <Briefcase size={18} />
                View Projects
              </Button> */}
            </motion.div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-primary/30 shadow-xl shadow-primary/20">
                <img 
                  src="https://d2ajlz7o3p8ddv.cloudfront.net/media/user_profile/ppc..jpg" 
                  alt={basic_info.full_name} 
                  className={cn(
                    "w-full h-full object-cover",
                    "transition-all duration-500"
                  )}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 shadow-lg">
                <span className="text-primary font-mono text-sm">{basic_info.designation}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center bg-background/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm font-medium text-foreground mb-1">Scroll Down</span>
          <ChevronDown className="h-6 w-6 text-primary animate-bounce" />
        </div>
      </motion.div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        personalData={personalData}
      />
    </section>
  );
}






