import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SkillCard from "@/components/SkillCard";
import ProjectModal from "@/components/ProjectModal";
import { cn } from "@/lib/utils";
import { SkillsetData, Project, Professional } from "@/types/data";

interface SkillsProps {
  skillsetData: SkillsetData;
  professionalData: Professional;
}

export default function Skills({ skillsetData, professionalData }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Add debugging
  useEffect(() => {
    console.log("Skills component received skillsetData:", skillsetData);
    console.log("Skills component received professionalData:", professionalData);
  }, [skillsetData, professionalData]);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  const handleProjectClick = (projectId: string) => {
    // Find the project across all companies
    for (const company of professionalData.companies) {
      const project = company.projects.find(p => p.id === projectId);
      if (project) {
        setSelectedProject({...project, company_name: company.name});
        setIsModalOpen(true);
        return;
      }
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Check if skillsetData has the expected structure
  if (!skillsetData || !skillsetData.skillset || !skillsetData.skillset.categories) {
    console.error("Skills component: skillsetData does not have the expected structure");
    return (
      <section id="skills" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Skills & Expertise
          </h2>
          <p className="text-center text-gray-500">No skills data available or data format is incorrect.</p>
        </div>
      </section>
    );
  }
  
  const { categories } = skillsetData.skillset;
  const categoryEntries = Object.entries(categories);

  return (
    <section id="skills" className="py-16 bg-white dark:bg-gray-800 section-animate transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Skills & Expertise
        </h2>
        
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              className={cn(
                "rounded-full", 
                activeCategory === "all" 
                  ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
              onClick={() => handleCategoryChange("all")}
            >
              All Skills
            </Button>
            
            {categoryEntries.map(([categoryName, _]) => {
              const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
              return (
                <Button
                  key={categoryId}
                  variant={activeCategory === categoryId ? "default" : "outline"}
                  className={cn(
                    "rounded-full", 
                    activeCategory === categoryId 
                      ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  )}
                  onClick={() => handleCategoryChange(categoryId)}
                >
                  {categoryName}
                </Button>
              );
            })}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryEntries.map(([categoryName, category]) => {
              const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
              
              return category.skills.map((skill) => {
                if (activeCategory === "all" || activeCategory === categoryId) {
                  return (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      categoryName={categoryName}
                      categoryId={categoryId}
                      onProjectClick={handleProjectClick}
                    />
                  );
                }
                return null;
              });
            })}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

