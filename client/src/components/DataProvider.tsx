import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from "react";
import { 
  PersonalData, 
  Professional, 
  EducationData, 
  SkillsetData, 
  CertificationData 
} from "@/types/data";

// Import data from JSON files
import {
  personalData as personalDataImport,
  professionalData as professionalDataImport,
  educationData as educationDataImport,
  skillsetData as skillsetDataImport,
  certificationData as certificationDataImport
} from "../data/portfolio-data";

// Define the shape of our context
interface PortfolioDataContextType {
  personalData: PersonalData | null;
  professionalData: Professional | null;
  educationData: EducationData | null;
  skillsetData: SkillsetData | null;
  certificationData: CertificationData | null;
  isLoading: boolean;
  error: string | null;
}

// Create the context with a default value
const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

// Initial state for our context
const initialState: PortfolioDataContextType = {
  personalData: null,
  professionalData: null,
  educationData: null,
  skillsetData: null,
  certificationData: null,
  isLoading: true,
  error: null
};

// Provider component
export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioDataContextType>(initialState);

  useEffect(() => {
    // Using a timeout to simulate loading
    const timer = setTimeout(() => {
      try {
        // Use the imported data directly
        setData({
          personalData: personalDataImport,
          professionalData: professionalDataImport,
          educationData: educationDataImport,
          skillsetData: skillsetDataImport,
          certificationData: certificationDataImport,
          isLoading: false,
          error: null
        });
        console.log("Data loaded successfully");
      } catch (error) {
        console.error('Error setting data:', error);
        setData({
          ...initialState,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    }, 500); // Short timeout for smooth loading experience

    return () => clearTimeout(timer);
  }, []);

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

// Custom hook to use the context
export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (context === undefined) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
}
