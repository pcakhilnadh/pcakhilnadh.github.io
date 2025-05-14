import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { cn } from "@/lib/utils";
import { Professional, Project } from "@/types/data";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsProps {
  professionalData: Professional;
}

export default function Projects({ professionalData }: ProjectsProps) {
  // Add debugging
  useEffect(() => {
    console.log("Projects component received professionalData:", professionalData);
  }, [professionalData]);

  // Check if professionalData has the expected structure
  if (!professionalData || !professionalData.companies || !Array.isArray(professionalData.companies)) {
    console.error("Projects component: professionalData does not have the expected structure");
    return (
      <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
            Projects
          </h2>
          <p className="text-center text-gray-500">No projects data available or data format is incorrect.</p>
        </div>
      </section>
    );
  }
  
  const [activeCompany, setActiveCompany] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<{project: Project, companyName: string}[]>([]);
  
  const { companies } = professionalData;
  
  // Set up filtered projects whenever the active company changes
  useEffect(() => {
    const projects = companies.flatMap(company => 
      company.projects.map(project => ({
        project,
        companyName: company.name,
        companyId: company.id
      }))
    ).filter(item => 
      activeCompany === "all" || item.companyId === activeCompany
    );
    
    setFilteredProjects(projects);
  }, [activeCompany, companies]);

  const handleCompanyChange = (companyId: string) => {
    setActiveCompany(companyId);
  };

  const handleProjectClick = (project: Project, companyName: string) => {
    setSelectedProject({ ...project, company_name: companyName });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900 section-animate transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Projects
        </h2>
        
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={activeCompany === "all" ? "default" : "outline"}
              className={cn(
                "rounded-full", 
                activeCompany === "all" 
                  ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
              onClick={() => handleCompanyChange("all")}
            >
              All Companies
            </Button>
            
            {companies.map((company) => (
              <Button
                key={company.id}
                variant={activeCompany === company.id ? "default" : "outline"}
                className={cn(
                  "rounded-full", 
                  activeCompany === company.id 
                    ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
                onClick={() => handleCompanyChange(company.id)}
              >
                {company.name}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(({ project, companyName }, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1
                  }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    companyName={companyName}
                    onClick={() => handleProjectClick(project, companyName)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-3 text-center py-12"
              >
                <p className="text-gray-500 dark:text-gray-400">No projects found for the selected company.</p>
              </motion.div>
            )}
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

