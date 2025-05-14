import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/data";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  companyName: string;
  onClick: () => void;
}

export default function ProjectCard({ project, companyName, onClick }: ProjectCardProps) {
  const { title, description, tech_stack } = project;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold">{title}</h3>
          <Badge className="bg-primary/10 text-primary text-xs font-medium">
            {companyName}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {tech_stack.languages.slice(0, 2).map((lang, i) => (
              <Badge key={i} variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                {lang}
              </Badge>
            ))}
            {tech_stack.libraries_frameworks.slice(0, 2).map((lib, i) => (
              <Badge key={i} variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                {lib}
              </Badge>
            ))}
            {tech_stack.languages.length + tech_stack.libraries_frameworks.length > 4 && (
              <Badge variant="outline" className="bg-muted text-muted-foreground text-xs">
                +{project.tech_stack.languages.length + project.tech_stack.libraries_frameworks.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-2 mt-auto">
        <Button 
          className="w-full"
          onClick={onClick}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}