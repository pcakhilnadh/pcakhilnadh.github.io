import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Globe, 
  Mail, 
  MapPin, 
  Code,
  Code2,
  Link,
  BarChart,
  FileCode
} from 'lucide-react';

export function getIconForPlatform(platform: string): React.ReactNode {
  const platformLower = platform.toLowerCase();
  
  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
    instagram: <Instagram className="h-4 w-4" />,
    personal_blog: <Globe className="h-4 w-4" />,
    email: <Mail className="h-4 w-4" />,
    'google map reviewer profile': <MapPin className="h-4 w-4" />,
    leetcode: <Code className="h-4 w-4" />,
    hackerrank: <Code2 className="h-4 w-4" />,
    stackoverflow: <FileCode className="h-4 w-4" />,
    kaggle: <BarChart className="h-4 w-4" />,
    medium: <Globe className="h-4 w-4" />
  };
  
  return iconMap[platformLower] || <Link className="h-4 w-4" />;
}