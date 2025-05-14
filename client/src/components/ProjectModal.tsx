import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Project } from "@/types/data";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const { 
    title, 
    description, 
    tech_stack, 
    company_name
  } = project;
  
  const { 
    languages, 
    libraries_frameworks, 
    tools, 
    deployment, 
    cloud_platforms, 
    ml_models 
  } = tech_stack;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between pr-8">
            <div>
              {title}
              <DialogDescription className="text-primary mt-1">
                {company_name}
              </DialogDescription>
            </div>
            <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Description</h4>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-3">Tech Stack</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Languages */}
            <div>
              <h5 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-2">Languages</h5>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Libraries & Frameworks */}
            <div>
              <h5 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-2">Libraries & Frameworks</h5>
              <div className="flex flex-wrap gap-2">
                {libraries_frameworks.map((lib, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {lib}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Tools */}
            <div>
              <h5 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-2">Tools</h5>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Deployment */}
            <div>
              <h5 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-2">Deployment</h5>
              <div className="flex flex-wrap gap-2">
                {deployment.map((dep, index) => (
                  <Badge key={index} className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Cloud Platforms */}
            {cloud_platforms.length > 0 && (
              <div>
                <h5 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-2">Cloud Platforms</h5>
                <div className="flex flex-wrap gap-2">
                  {cloud_platforms.map((platform, index) => (
                    <Badge key={index} className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* ML Models */}
            <div>
              <h5 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-2">ML Models</h5>
              <div className="flex flex-wrap gap-2">
                {ml_models.map((model, index) => (
                  <Badge key={index} className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    {model}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
