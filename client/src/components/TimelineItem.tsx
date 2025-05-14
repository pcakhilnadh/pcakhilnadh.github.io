import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  index: number;
  items?: Array<{ id: string; title: string }>;
  onItemClick?: (id: string) => void;
  type: "work" | "education";
}

export default function TimelineItem({
  title,
  subtitle,
  location,
  startDate,
  endDate,
  index,
  items = [],
  onItemClick,
  type
}: TimelineItemProps) {
  // Alternate between left and right based on index
  const isLeft = index % 2 === 0;
  
  // Determine icon based on type
  const Icon = type === "education" ? GraduationCap : Briefcase;
  
  // Extract years for the timeline display
  const startYear = startDate.includes('-') 
    ? startDate.split('-')[0] // If it's a full date format like 2020-01-01
    : startDate; // If it's already just a year
  
  const endYear = endDate 
    ? (endDate.includes('-') ? endDate.split('-')[0] : endDate) 
    : 'Present';
  
  return (
    <motion.div 
      className={cn(
        "timeline-item relative mb-12 flex",
        isLeft ? "justify-start" : "justify-end"
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        ease: [0.17, 0.67, 0.83, 0.67] // ease-out-back-like
      }}
    >
      {/* Content Card */}
      <div className={cn(
        "w-[calc(50%-2rem)] relative",
        isLeft ? "mr-auto" : "ml-auto"
      )}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Card className="border-border border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="font-medium text-primary">{subtitle}</p>
                  {location && <p className="text-muted-foreground text-sm italic">{location}</p>}
                </div>
                <div className="text-right flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Present'}
                  </span>
                </div>
              </div>
              
              {items && items.length > 0 && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h4 className="font-medium text-muted-foreground mb-2">Key Projects:</h4>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item.id}>
                        <button 
                          onClick={() => onItemClick && onItemClick(item.id)}
                          className="text-primary hover:text-primary/80 hover:underline cursor-pointer text-left flex items-center"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mr-2"></span>
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Arrow pointing to timeline */}
        <div className={cn(
          "absolute top-6 w-0 h-0 border-solid",
          isLeft 
            ? "right-[-8px] border-l-[8px] border-l-border border-y-transparent border-y-[8px] border-r-0" 
            : "left-[-8px] border-r-[8px] border-r-border border-y-transparent border-y-[8px] border-l-0"
        )}></div>
      </div>
      
      {/* Year label on the timeline */}
      <div className={cn(
        "absolute top-6 z-10",
        isLeft ? "left-[calc(50%+1rem)]" : "right-[calc(50%+1rem)]"
      )}>
        <div className="bg-background dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap border text-primary border-primary/20">
          {startYear} - {endYear}
        </div>
      </div>
      
      {/* Dot on the timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-6 z-10">
        <div className="timeline-dot w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
          <Icon className="h-3 w-3 text-white" />
        </div>
      </div>
    </motion.div>
  );
}








