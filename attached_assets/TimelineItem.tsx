import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  index: number;
  items?: Array<{ id: string; title: string }>;
  onItemClick?: (id: string) => void;
  dotColor?: string;
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
  dotColor = "bg-primary"
}: TimelineItemProps) {
  const isEven = index % 2 === 0;
  const sideClass = isEven ? "timeline-left" : "timeline-right";
  
  // Determine if this is a work or education item
  const isEducation = dotColor === "bg-secondary";
  const Icon = isEducation ? GraduationCap : Briefcase;
  
  return (
    <motion.div 
      className="timeline-item"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        ease: [0.17, 0.67, 0.83, 0.67] // ease-out-back-like
      }}
    >
      <div className={`timeline-dot ${dotColor} flex items-center justify-center`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Card className={cn(
          "timeline-content", 
          sideClass, 
          "border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
        )}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{subtitle}</p>
                {location && <p className="text-gray-600 dark:text-gray-400 text-sm italic">{location}</p>}
              </div>
              <div className="text-right">
                <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full px-3">
                  {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Present'}
                </Badge>
              </div>
            </div>
            
            {items && items.length > 0 && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Key Projects:</h4>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item.id}>
                      <button 
                        onClick={() => onItemClick && onItemClick(item.id)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline cursor-pointer text-left flex items-center"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-400 dark:bg-primary-600 mr-2"></span>
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
    </motion.div>
  );
}
