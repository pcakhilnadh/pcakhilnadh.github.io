// Types for Personal Information
export interface SocialProfile {
  url: string;
  handler: string;
}

export interface SocialProfiles {
  [key: string]: SocialProfile;
}

export interface BasicInfo {
  full_name: string;
  dob: string;
  place_of_birth: string;
  email: string;
  address: string;
  total_years_of_experiece: string;
  tagline: string;
  short_summary: string;
  long_descriptive_summary: string;
  profile_image: string;
}

export interface FamilyInfo {
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  siblings: any[];
  marital_status: string;
}

export interface PersonalData {
  basic_info: BasicInfo;
  family_info: FamilyInfo;
  hobbies: string[];
  social_profiles: SocialProfiles;
  professional_profiles: SocialProfiles;
  coding_profiles: SocialProfiles;
  personal_profiles: SocialProfiles;
}

// Types for Professional Information
export interface TechStack {
  languages: string[];
  libraries_frameworks: string[];
  tools: string[];
  deployment: string[];
  cloud_platforms: string[];
  ml_models: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: TechStack;
  company_name?: string;
}

export interface Company {
  id: string;
  name: string;
  location: string;
  projects: Project[];
}

export interface Experience {
  company_id: string;
  designation: string;
  start_date: string;
  end_date: string | null;
}

export interface Professional {
  companies: Company[];
  professional_experience: Experience[];
}

// Types for Education Information
export interface Education {
  institution: string;
  degree: string;
  location?: string;
  start_year: string;
  end_year: string;
}

export interface EducationData {
  education: Education[];
}

// Types for Skillset Information
export interface ProjectReference {
  id: string;
  title: string;
}

export interface Skill {
  id: string;
  name: string;
  rating: number;
  used_in_projects: ProjectReference[];
}

export interface SkillCategory {
  description: string;
  skills: Skill[];
}

export interface SkillsetData {
  skillset: {
    id: string;
    categories: {
      [key: string]: SkillCategory;
    };
  };
}

// Types for Certification Information
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  credential_id: string;
  credential_url: string;
  description: string;
  skills_validated: string[];
  related_projects: ProjectReference[];
}

export interface CertificationData {
  certifications: Certification[];
}
