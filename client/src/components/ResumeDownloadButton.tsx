import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  PersonalData, 
  Professional, 
  EducationData, 
  SkillsetData,
  CertificationData 
} from '@/types/data';
import { formatDate } from '@/lib/utils';

interface ResumeDownloadButtonProps {
  personalData: PersonalData;
  professionalData: Professional;
  educationData: EducationData;
  skillsetData: SkillsetData;
  certificationData: CertificationData;
}

export default function ResumeDownloadButton({
  personalData,
  professionalData,
  educationData,
  skillsetData,
  certificationData
}: ResumeDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Create a resume in HTML format 
  const generateResume = () => {
    setIsGenerating(true);
    
    try {
      const { basic_info } = personalData;
      const { companies, professional_experience } = professionalData;
      const { education } = educationData;
      const { skillset } = skillsetData;
      const { certifications } = certificationData;

      // Sort experiences by date (most recent first)
      const sortedExperiences = [...professional_experience].sort((a, b) => {
        const dateA = a.end_date ? new Date(a.end_date) : new Date();
        const dateB = b.end_date ? new Date(b.end_date) : new Date();
        return dateB.getTime() - dateA.getTime();
      });

      // Sort education by date (most recent first)
      const sortedEducation = [...education].sort((a, b) => {
        const dateA = new Date(a.end_year);
        const dateB = new Date(b.end_year);
        return dateB.getTime() - dateA.getTime();
      });

      // Format skills by category
      const skillsByCategory: Record<string, { name: string, rating: number }[]> = {};
      
      Object.entries(skillset.categories).forEach(([categoryId, category]) => {
        skillsByCategory[category.description] = category.skills.map(skill => ({
          name: skill.name,
          rating: skill.rating
        }));
      });

      // Create HTML content
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${basic_info.full_name} - Resume</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 900px;
              margin: 0 auto;
              padding: 20px;
            }
            
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #7c3aed;
              padding-bottom: 20px;
            }
            
            h1 {
              color: #7c3aed;
              margin-bottom: 5px;
            }
            
            h2 {
              color: #7c3aed;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
              margin-top: 30px;
            }
            
            .contact-info {
              margin-top: 10px;
              font-size: 16px;
            }
            
            .summary {
              margin: 20px 0;
            }
            
            .experience, .education, .skills, .certifications {
              margin: 20px 0;
            }
            
            .job, .edu-item, .cert-item {
              margin-bottom: 20px;
            }
            
            .job-title, .edu-degree, .cert-name {
              font-weight: bold;
              margin-bottom: 5px;
            }
            
            .job-company, .edu-institution, .cert-issuer {
              font-weight: bold;
              color: #7c3aed;
            }
            
            .job-date, .edu-date, .cert-date {
              color: #666;
              font-style: italic;
              margin-bottom: 10px;
            }
            
            .job-desc, .edu-desc, .cert-desc {
              margin-bottom: 10px;
            }
            
            .skill-category {
              margin-bottom: 15px;
            }
            
            .skill-category-name {
              font-weight: bold;
              margin-bottom: 5px;
              color: #7c3aed;
            }
            
            .skills-list {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
            }
            
            .skill-item {
              background-color: #f5f3ff;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 14px;
            }
            
            .projects {
              margin-top: 10px;
            }
            
            .project {
              margin-bottom: 15px;
              padding-left: 20px;
            }
            
            .project-title {
              font-weight: bold;
            }
            
            .project-desc {
              margin-top: 5px;
            }
            
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 14px;
              color: #777;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
            
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <!-- Header Section -->
          <div class="header">
            <h1>${basic_info.full_name}</h1>
            <div>${basic_info.tagline}</div>
            <div class="contact-info">
              ${basic_info.email} | ${basic_info.place_of_birth} | ${basic_info.total_years_of_experiece} Experience
            </div>
          </div>
          
          <!-- Summary Section -->
          <div class="summary">
            <h2>Professional Summary</h2>
            <p>${basic_info.long_descriptive_summary}</p>
          </div>
          
          <!-- Experience Section -->
          <div class="experience">
            <h2>Professional Experience</h2>
            ${sortedExperiences.map(exp => {
              const company = companies.find(c => c.id === exp.company_id);
              if (!company) return '';
              
              const companyProjects = company.projects.map(project => `
                <div class="project">
                  <div class="project-title">${project.title}</div>
                  <div class="project-desc">${project.description}</div>
                </div>
              `).join('');
              
              return `
                <div class="job">
                  <div class="job-title">${exp.designation}</div>
                  <div class="job-company">${company.name}, ${company.location}</div>
                  <div class="job-date">
                    ${formatDate(exp.start_date)} - ${exp.end_date ? formatDate(exp.end_date) : 'Present'}
                  </div>
                  ${company.projects.length > 0 ? `
                    <div class="projects">
                      <strong>Key Projects:</strong>
                      ${companyProjects}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
          
          <!-- Education Section -->
          <div class="education">
            <h2>Education</h2>
            ${sortedEducation.map(edu => `
              <div class="edu-item">
                <div class="edu-degree">${edu.degree}</div>
                <div class="edu-institution">${edu.institution}</div>
                <div class="edu-date">${edu.start_year} - ${edu.end_year}</div>
                ${edu.location ? `<div>${edu.location}</div>` : ''}
              </div>
            `).join('')}
          </div>
          
          <!-- Skills Section -->
          <div class="skills">
            <h2>Skills</h2>
            ${Object.entries(skillsByCategory).map(([category, skills]) => `
              <div class="skill-category">
                <div class="skill-category-name">${category}</div>
                <div class="skills-list">
                  ${skills.map(skill => `
                    <span class="skill-item">${skill.name}</span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          
          <!-- Certifications Section -->
          ${certifications.length > 0 ? `
            <div class="certifications">
              <h2>Certifications</h2>
              ${certifications.map(cert => `
                <div class="cert-item">
                  <div class="cert-name">${cert.name}</div>
                  <div class="cert-issuer">${cert.issuer}</div>
                  <div class="cert-date">Issued: ${formatDate(cert.issue_date)}${cert.expiry_date ? ` | Expires: ${formatDate(cert.expiry_date)}` : ''}</div>
                  <div class="cert-desc">${cert.description}</div>
                  ${cert.credential_url ? `<div><a href="${cert.credential_url}" target="_blank">Credential Link</a></div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <!-- Footer -->
          <div class="footer">
            <p>This resume was generated on ${new Date().toLocaleDateString()}.</p>
          </div>
        </body>
        </html>
      `;

      // Create a blob with HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `${basic_info.full_name.replace(/\s+/g, '_')}_Resume.html`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        size="lg" 
        className="rounded-full shadow-lg flex items-center space-x-2 bg-primary hover:bg-primary/90"
        onClick={generateResume}
        disabled={isGenerating}
      >
        <Download className="h-5 w-5 mr-2" />
        {isGenerating ? 'Generating...' : 'Download Resume'}
      </Button>
    </div>
  );
}