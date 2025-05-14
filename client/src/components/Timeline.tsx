import { useState } from "react";
import { Timeline as TimelineContainer } from "@/components/ui/timeline";
import TimelineItem from "@/components/TimelineItem";
import ProjectModal from "@/components/ProjectModal";
import { Professional, EducationData, Project } from "@/types/data";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

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
  };
  
  type EducationTimelineItem = {
    id: string;
    title: string;
    subtitle: string;
    location: string;
    startDate: string;
    endDate: string | null;
    type: "education";
  };
  
  type TimelineItemType = WorkTimelineItem | EducationTimelineItem;
  
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
        items: company.projects.map(project => ({ id: project.id, title: project.title }))
      };
    })
    .filter((item): item is WorkTimelineItem => item !== null);
  
  const educationItems: EducationTimelineItem[] = education.map(edu => ({
    id: `education-${edu.institution}-${edu.start_year}`,
    title: edu.institution,
    subtitle: edu.degree,
    location: edu.location || "",
    startDate: edu.start_year,
    endDate: edu.end_year,
    type: "education" as const
  }));
  
  const timelineItems: TimelineItemType[] = [...workItems, ...educationItems];

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
    <section id="timeline" className="py-16 bg-muted section-animate">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-heading font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Professional Journey
        </motion.h2>
        <motion.p 
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My career and education timeline, showcasing professional experience and academic achievements
        </motion.p>
        
        {/* Legend */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-primary mr-2 flex items-center justify-center">
              <Briefcase className="h-2 w-2 text-white" />
            </div>
            <span className="text-sm">Professional Experience</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-primary mr-2 flex items-center justify-center">
              <GraduationCap className="h-2 w-2 text-white" />
            </div>
            <span className="text-sm">Education</span>
          </div>
        </div>
        
        <div className="relative py-8">
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
                type={item.type}
              />
            ))}
          </TimelineContainer>
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





