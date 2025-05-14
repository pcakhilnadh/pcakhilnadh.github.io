import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PersonalInfo, SkillsetData } from "@/types/data";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { formatPlatformName } from '@/lib/utils';
import { getIconForPlatform } from '@/lib/icon-utils';

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { basic_info, family_info, hobbies } = personalInfo;
  const [skillsData, setSkillsData] = useState<any[]>([]);

  // Fetch skillset data
  const { data: skillsetData } = useQuery<SkillsetData>({
    queryKey: ['/api/skillset'],
  });

  // Calculate age from DOB
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const age = calculateAge(basic_info.dob);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById("about");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Process skillset data for visualization
  useEffect(() => {
    if (skillsetData) {
      const { categories } = skillsetData.skillset;
      
      // Calculate average rating for each category
      const processedData = Object.entries(categories).map(([category, data]) => {
        const skills = data.skills || [];
        const totalRating = skills.reduce((sum, skill) => sum + skill.rating, 0);
        const avgRating = skills.length > 0 ? totalRating / skills.length : 0;
        
        return {
          category: category,
          value: avgRating,
          fullMark: 5
        };
      });
      
      setSkillsData(processedData);
    }
  }, [skillsetData]);

  // Safely check if siblings exist and have length
  const hasSiblings = family_info.siblings && family_info.siblings.length > 0;

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="overflow-hidden shadow-lg border-0 bg-white dark:bg-gray-800">
              <div className="p-6 text-center">
                <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-primary">
                  <img 
                    src="https://d2ajlz7o3p8ddv.cloudfront.net/media/user_profile/ppc..jpg" 
                    alt={basic_info.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  {basic_info.full_name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{basic_info.tagline || "Data Scientist"}</p>
                
                <Separator className="my-6" />
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt w-8 text-primary"></i>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(basic_info.dob).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} ({age} years)
                    </span>
                  </div>
                  
                  {basic_info.total_years_of_experiece && (
                    <div className="flex items-center">
                      <i className="fas fa-briefcase w-8 text-primary"></i>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {basic_info.total_years_of_experiece} of Experience
                      </span>
                    </div>
                  )}
                  
                  {basic_info.place_of_birth && (
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt w-8 text-primary"></i>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {basic_info.place_of_birth}
                      </span>
                    </div>
                  )}
                  
                  {basic_info.address && (
                    <div className="flex items-start">
                      <i className="fas fa-home w-8 mt-1 text-primary"></i>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {basic_info.address}
                      </span>
                    </div>
                  )}
                  
                  {family_info.marital_status && (
                    <div className="flex items-center">
                      <i className="fas fa-heart w-8 text-primary"></i>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {family_info.marital_status}
                      </span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <div className="text-left">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Interests
                  </h4>
                  <div className="flex flex-wrap justify-start gap-2">
                    {hobbies && hobbies.map((hobby, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                {/* Connect With Me Section */}
                <div className="text-left">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Connect With Me
                  </h4>
                  
                  {/* Personal Links */}
                  {personalInfo.personal_profiles && Object.keys(personalInfo.personal_profiles).length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Personal</h5>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(personalInfo.personal_profiles).map(([platform, profile]) => (
                          <a 
                            key={platform}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs"
                          >
                            {getIconForPlatform(platform)}
                            <span>@{profile.handler}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Professional Links */}
                  {personalInfo.professional_profiles && Object.keys(personalInfo.professional_profiles).length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Professional</h5>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(personalInfo.professional_profiles).map(([platform, profile]) => (
                          <a 
                            key={platform}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs"
                          >
                            {getIconForPlatform(platform)}
                            <span>@{profile.handler}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Coding Links */}
                  {personalInfo.coding_profiles && Object.keys(personalInfo.coding_profiles).length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Coding</h5>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(personalInfo.coding_profiles).map(([platform, profile]) => (
                          <a 
                            key={platform}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs"
                          >
                            {getIconForPlatform(platform)}
                            <span>@{profile.handler}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full shadow-lg border-0 bg-white dark:bg-gray-800 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Biography</h3>
                </div>
                
                <div className="prose dark:prose-invert prose-lg max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {basic_info.long_descriptive_summary || basic_info.short_summary}
                  </p>
                  
                  <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-600 dark:text-gray-300">
                    "Data science is not just about algorithms and models; it's about finding insights that drive real-world impact."
                  </blockquote>
                </div>
                
                <Separator className="my-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Family Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <i className="fas fa-users mr-2 text-primary"></i>
                      Family
                    </h4>
                    
                    <ul className="space-y-3">
                      {family_info.father_name && (
                        <li className="flex items-start">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400">Father:</span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {family_info.father_name}
                            {family_info.father_occupation && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {family_info.father_occupation}
                              </div>
                            )}
                          </span>
                        </li>
                      )}
                      
                      {family_info.mother_name && (
                        <li className="flex items-start">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400">Mother:</span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {family_info.mother_name}
                            {family_info.mother_occupation && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {family_info.mother_occupation}
                              </div>
                            )}
                          </span>
                        </li>
                      )}
                      
                      {hasSiblings && (
                        <li className="flex items-start">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400">Siblings:</span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {family_info.siblings.map((sibling, index) => (
                              <span key={index}>
                                {sibling.name} ({sibling.relation})
                                {index < family_info.siblings.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Professional Summary */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <i className="fas fa-briefcase mr-2 text-primary"></i>
                      Professional
                    </h4>
                    
                    <ul className="space-y-3">
                      {basic_info.tagline && (
                        <li className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400">Role:</span>
                          <span>{basic_info.tagline}</span>
                        </li>
                      )}
                      
                      {basic_info.total_years_of_experiece && (
                        <li className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400">Experience:</span>
                          <span>{basic_info.total_years_of_experiece}</span>
                        </li>
                      )}
                      
                      {basic_info.email && (
                        <li className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-24 text-sm text-gray-500 dark:text-gray-400">Email:</span>
                          <span>{basic_info.email}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {/* Skills Visualization - Moved here */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <i className="fas fa-chart-pie mr-2 text-primary"></i>
                    Skills Overview
                  </h4>
                  
                  {skillsData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <Radar name="Average Rating" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400">No skillset data available</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}










