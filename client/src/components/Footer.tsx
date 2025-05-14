import { PersonalData } from "@/types/data";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

interface FooterProps {
  personalData: PersonalData;
}

export default function Footer({ personalData }: FooterProps) {
  const { 
    basic_info, 
    social_profiles, 
    professional_profiles, 
    coding_profiles 
  } = personalData;
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-gray-800 dark:bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-primary">{basic_info.full_name}</h3>
            <p className="text-gray-400">{basic_info.tagline}</p>
          </div>
          
          <div className="flex space-x-4">
            {professional_profiles?.linkedin && (
              <a 
                href={professional_profiles.linkedin.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            
            {coding_profiles?.github && (
              <a 
                href={coding_profiles.github.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            
            {social_profiles?.twitter && (
              <a 
                href={social_profiles.twitter.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            
            <a 
              href={`mailto:${basic_info.email}`} 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-500">
          <p>© {currentYear} {basic_info.full_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
