import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    
    // Check if professionalData has the expected structure
    if (!professionalData || !professionalData.companies || !Array.isArray(professionalData.companies)) {
      console.error("Projects component: professionalData does not have the expected structure");
    } else {
      // Check each company for projects
      professionalData.companies.forEach((company, index) => {
        console.log(`Company ${index} (${company.name}):`, company);
        if (!company.projects || !Array.isArray(company.projects)) {
          console.error(`Company ${company.name} has missing or invalid projects array`);
        } else {
          console.log(`Company ${company.name} has ${company.projects.length} projects`);
        }
      });
    }
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
    try {
      const projects = companies.flatMap(company => 
        company.projects.map(project => ({
          project,
          companyName: company.name,
          companyId: company.id
        }))
      ).filter(item => 
        activeCompany === "all" || item.companyId === activeCompany
      );
      
      console.log(`Filtered projects for company "${activeCompany}":`, projects.length);
      setFilteredProjects(projects);
    } catch (error) {
      console.error("Error filtering projects:", error);
      setFilteredProjects([]);
    }
  }, [activeCompany, companies]);

  const handleCompanyChange = (companyId: string) => {
    setActiveCompany(companyId);
  };
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Projects
        </h2>
        
        <div className="mb-8">
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant={activeCompany === "all" ? "default" : "outline"}
              className={cn(
                "rounded-full", 
                activeCompany === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background text-foreground hover:bg-background/80"
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
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-foreground hover:bg-background/80"
                )}
                onClick={() => handleCompanyChange(company.id)}
              >
                {company.name}
              </Button>
            ))}
          </motion.div>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found for the selected company.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <ProjectCard
                    project={project.project}
                    companyName={project.companyName}
                    onClick={() => handleProjectClick(project.project)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isOpen={isModalOpen} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}



