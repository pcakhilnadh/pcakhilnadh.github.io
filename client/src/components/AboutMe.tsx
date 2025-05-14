import { usePortfolioData } from "@/components/DataProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { User, MapPin, Calendar, Mail, Briefcase } from "lucide-react";
import SkillsRadarChart from "@/components/SkillsRadarChart";

export default function AboutMe() {
  const { personalData, skillsetData, isLoading } = usePortfolioData();

  if (isLoading || !personalData) {
    return <AboutMeSkeleton />;
  }

  // Extract top skills for radar chart
  const topSkills = skillsetData ? extractTopSkills(skillsetData, 6) : [];

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image and Basic Info */}
            <Card className="lg:col-span-1 overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="h-40 bg-gradient-to-r from-primary/80 to-primary"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                    <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden">
                      <img 
                        src={personalData.basic_info.profile_image} 
                        alt={personalData.basic_info.full_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-20 pb-6 px-6">
                  <h3 className="text-2xl font-bold text-center mb-1">{personalData.basic_info.full_name}</h3>
                  <p className="text-primary text-center mb-6">{personalData.basic_info.tagline}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-primary mr-3" />
                      <span>{personalData.basic_info.total_years_of_experiece}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <span>{personalData.basic_info.place_of_birth}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-3" />
                      <span>{new Date(personalData.basic_info.dob).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-primary mr-3" />
                      <a href={`mailto:${personalData.basic_info.email}`} className="hover:text-primary transition-colors">
                        {personalData.basic_info.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center space-x-4">
                    {personalData.professional_profiles.linkedin && (
                      <a 
                        href={personalData.professional_profiles.linkedin.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {personalData.coding_profiles.github && (
                      <a 
                        href={personalData.coding_profiles.github.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {personalData.social_profiles.twitter && (
                      <a 
                        href={personalData.social_profiles.twitter.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Bio and Skills */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    Biography
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {personalData.basic_info.long_descriptive_summary}
                  </p>
                  
                  {personalData.hobbies && personalData.hobbies.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Hobbies & Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {personalData.hobbies.map((hobby, index) => (
                          <span 
                            key={index} 
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {hobby}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Skills Radar Chart */}
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Skills Overview</h3>
                  <div className="h-[300px] w-full">
                    <SkillsRadarChart skills={topSkills} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutMeSkeleton() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-3xl font-bold mb-12 text-center">About Me</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="h-40 w-full mb-20" />
            <div className="space-y-4 px-6">
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Skeleton className="h-8 w-1/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-8 w-1/4 mb-4" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to extract top skills for radar chart
function extractTopSkills(skillsetData: any, count: number) {
  const allSkills: any[] = [];
  
  // Flatten the skills from all categories
  Object.values(skillsetData.skillset.categories).forEach((category: any) => {
    category.skills.forEach((skill: any) => {
      allSkills.push({
        name: skill.name,
        value: skill.rating,
        fullMark: 5
      });
    });
  });
  
  // Sort by rating and take the top 'count' skills
  return allSkills
    .sort((a, b) => b.value - a.value)
    .slice(0, count);
}