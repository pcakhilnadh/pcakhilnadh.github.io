import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CertificationData, Professional, Project } from "@/types/data";
import { formatDate } from "@/lib/utils";
import ProjectModal from "@/components/ProjectModal";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface CertificationsProps {
  certificationData: CertificationData;
  professionalData: Professional;
}

export default function Certifications({ certificationData, professionalData }: CertificationsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { certifications } = certificationData;
  
  const handleProjectClick = (projectId: string) => {
    // Find the project across all companies
    for (const company of professionalData.companies) {
      const project = company.projects.find(p => p.id === projectId);
      if (project) {
        setSelectedProject({...project, company_name: company.name});
        setIsModalOpen(true);
        return;
      }
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Check if a certification is expired
  const isCertificationExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date() > new Date(expiryDate);
  };
  
  // Get status badge for a certification
  const getStatusBadge = (expiryDate: string | null) => {
    if (!expiryDate) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          Lifetime
        </Badge>
      );
    }
    
    const isExpired = isCertificationExpired(expiryDate);
    
    return isExpired ? (
      <Badge variant="destructive">
        Expired
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
        Active
      </Badge>
    );
  };
  
  return (
    <section id="certifications" className="py-16 bg-background section-animate">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-heading font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </motion.h2>
        
        {certifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No certifications found.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{cert.name}</h3>
                    </div>
                    <p className="text-primary font-medium mb-3">{cert.issuer}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {cert.expiry_date ? `Expires: ${formatDate(cert.expiry_date)}` : 'No Expiration'}
                      </span>
                      {getStatusBadge(cert.expiry_date)}
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{cert.description}</p>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Issued: {formatDate(cert.issue_date)}</p>
                      <p>Credential ID: {cert.credential_id}</p>
                    </div>
                    
                    {/* Skills validated */}
                    {cert.skills_validated && cert.skills_validated.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Skills Validated:</h5>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills_validated.map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-muted text-muted-foreground">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Related projects */}
                    {cert.related_projects && cert.related_projects.length > 0 && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Related Projects:</h5>
                        <div className="flex flex-wrap gap-2">
                          {cert.related_projects.map((project, i) => (
                            <Badge 
                              key={i} 
                              className="bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                              onClick={() => handleProjectClick(project.id)}
                            >
                              {project.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="px-6 pb-6">
                    <Button 
                      className="w-full flex items-center justify-center gap-2"
                      asChild
                    >
                      <a href={cert.credential_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        Verify Credential
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
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
