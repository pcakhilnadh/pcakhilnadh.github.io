import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skill } from "@/types/data";

interface SkillCardProps {
  skill: Skill;
  categoryName: string;
  categoryId: string;
  onProjectClick?: (projectId: string) => void;
}

export default function SkillCard({ skill, categoryName, categoryId, onProjectClick }: SkillCardProps) {
  const [skillBarWidth, setSkillBarWidth] = useState(0);
  
  useEffect(() => {
    // Animate the skill bar width after component mounts
    const timer = setTimeout(() => {
      const maxRating = 5;
      setSkillBarWidth((skill.rating / maxRating) * 100);
    }, 500); // Slight delay for animation effect
    
    return () => clearTimeout(timer);
  }, [skill.rating]);

  // Determine color based on rating
  let barColorClass = "";
  if (skill.rating >= 4) {
    barColorClass = "bg-primary dark:bg-primary";
  } else if (skill.rating >= 3) {
    barColorClass = "bg-secondary dark:bg-secondary";
  } else {
    barColorClass = "bg-gray-500 dark:bg-gray-400";
  }

  return (
    <Card className="transition-all duration-300" data-category={categoryId}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">{skill.name}</h4>
          <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {categoryName}
          </Badge>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="w-full mr-2">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded">
              <div 
                className={cn("h-full rounded transition-[width] duration-1000 ease-in-out", barColorClass)}
                style={{ width: `${skillBarWidth}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {skill.rating}/5
          </span>
        </div>
        
        {skill.used_in_projects.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Used in Projects:</h5>
            <div className="flex flex-wrap gap-2">
              {skill.used_in_projects.map((project) => (
                <Badge 
                  key={project.id}
                  className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 cursor-pointer hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                  onClick={() => onProjectClick && onProjectClick(project.id)}
                >
                  {project.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
