import { Timeline } from "@/components/ui/timeline";
import TimelineItem from "@/components/TimelineItem";
import { EducationData } from "@/types/data";

interface EducationProps {
  educationData: EducationData;
}

export default function Education({ educationData }: EducationProps) {
  const { education } = educationData;

  // Sort education by end_year (most recent first)
  const sortedEducation = [...education].sort((a, b) => 
    parseInt(b.end_year) - parseInt(a.end_year)
  );

  return (
    <section id="education" className="py-16 bg-white dark:bg-gray-800 section-animate transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Education
        </h2>
        
        <Timeline>
          {sortedEducation.map((edu, index) => (
            <TimelineItem
              key={index}
              index={index}
              title={edu.institution}
              subtitle={edu.degree}
              location={edu.location}
              startDate={edu.start_year}
              endDate={edu.end_year}
              dotColor="bg-secondary"
            />
          ))}
        </Timeline>
      </div>
    </section>
  );
}
