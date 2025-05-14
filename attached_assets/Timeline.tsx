import { useState } from "react";
import { Timeline as TimelineContainer } from "@/components/ui/timeline";
import TimelineItem from "@/components/TimelineItem";
import ProjectModal from "@/components/ProjectModal";
import { Professional, EducationData, Project } from "@/types/data";

interface TimelineProps {
  professionalData: Professional;
  educationData: EducationData;
}

export default function Timeline({ professionalData, educationData }: TimelineProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { companies, professional_experience } = professionalData;
  const { education } = educationData;

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

  // Create types for our timeline items
  type WorkTimelineItem = {
    id: string;
    title: string;
    subtitle: string;
    location: string;
    startDate: string;
    endDate: string | null;
    type: "work";
    items: { id: string; title: string }[];
    dotColor: string;
  };
  
  type EducationTimelineItem = {
    id: string;
    title: string;
    subtitle: string;
    location?: string;
    startDate: string;
    endDate: string;
    type: "education";
    dotColor: string;
    items?: { id: string; title: string }[];
  };
  
  type TimelineItem = WorkTimelineItem | EducationTimelineItem;
  
  // Prepare timeline items from both professional experience and education
  const workItems: WorkTimelineItem[] = professional_experience
    .map(experience => {
      const company = companies.find(c => c.id === experience.company_id);
      if (!company) return null;
      
      return {
        id: `work-${company.id}-${experience.start_date}`,
        title: company.name,
        subtitle: experience.designation,
        location: company.location,
        startDate: experience.start_date,
        endDate: experience.end_date,
        type: "work" as const,
        items: company.projects.map(project => ({ id: project.id, title: project.title })),
        dotColor: "bg-primary"
      };
    })
    .filter((item): item is WorkTimelineItem => item !== null);
  
  // Education items
  const educationItems: EducationTimelineItem[] = education.map(edu => ({
    id: `education-${edu.institution}-${edu.start_year}`,
    title: edu.institution,
    subtitle: edu.degree,
    location: edu.location,
    startDate: edu.start_year,
    endDate: edu.end_year,
    type: "education" as const,
    dotColor: "bg-secondary",
    items: []
  }));
  
  const timelineItems: TimelineItem[] = [...workItems, ...educationItems];

  // Sort all items by date (most recent first)
  const sortedItems = timelineItems.sort((a, b) => {
    const dateA = a.endDate === "Present" || a.endDate === null 
      ? new Date() 
      : new Date(typeof a.endDate === "string" ? a.endDate : "");
      
    const dateB = b.endDate === "Present" || b.endDate === null 
      ? new Date() 
      : new Date(typeof b.endDate === "string" ? b.endDate : "");
      
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="timeline" className="py-16 bg-gray-50 dark:bg-gray-900 section-animate transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
          Professional Journey
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          My career and education timeline, showcasing professional experience and academic achievements
        </p>
        
        <TimelineContainer>
          {sortedItems.map((item, index) => (
            <TimelineItem
              key={item.id}
              index={index}
              title={item.title}
              subtitle={item.subtitle}
              location={item.location}
              startDate={item.startDate}
              endDate={item.endDate}
              items={item.type === "work" ? item.items : undefined}
              onItemClick={item.type === "work" ? handleProjectClick : undefined}
              dotColor={item.dotColor}
            />
          ))}
        </TimelineContainer>
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