import { useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import TimelineItem from "@/components/TimelineItem";
import ProjectModal from "@/components/ProjectModal";
import { Professional, Project } from "@/types/data";

interface ExperienceProps {
  professionalData: Professional;
}

export default function Experience({ professionalData }: ExperienceProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { companies, professional_experience } = professionalData;

  const handleProjectClick = (projectId: string) => {
    // Find the project in all companies
    let foundProject: Project | null = null;
    let companyName = "";
    
    for (const company of companies) {
      const project = company.projects.find(p => p.id === projectId);
      if (project) {
        foundProject = project;
        companyName = company.name;
        break;
      }
    }
    
    if (foundProject) {
      setSelectedProject({ ...foundProject, company_name: companyName });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...professional_experience].sort((a, b) => {
    const dateA = a.end_date === "Present" ? new Date() : new Date(a.end_date);
    const dateB = b.end_date === "Present" ? new Date() : new Date(b.end_date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-900 section-animate transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Professional Experience
        </h2>
        
        <Timeline>
          {sortedExperiences.map((experience, index) => {
            const company = companies.find(c => c.id === experience.company_id);
            if (!company) return null;
            
            return (
              <TimelineItem
                key={index}
                index={index}
                title={company.name}
                subtitle={experience.designation}
                location={company.location}
                startDate={experience.start_date}
                endDate={experience.end_date}
                items={company.projects.map(project => ({ id: project.id, title: project.title }))}
                onItemClick={handleProjectClick}
              />
            );
          })}
        </Timeline>
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
