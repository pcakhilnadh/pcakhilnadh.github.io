import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
// import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";
import { personalData, professionalData, educationData, skillsetData, certificationData } from "@/data/portfolio-data";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Log data availability for debugging
    console.log("Data loaded in Home component:", {
      personalData: !!personalData,
      professionalData: !!professionalData,
      educationData: !!educationData,
      skillsetData: !!skillsetData,
      certificationData: !!certificationData
    });
    
    // Simulate loading to ensure all components have data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center max-w-md p-6">
          <h2 className="text-2xl font-bold text-destructive mb-4">Error Loading Portfolio</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <Hero personalData={personalData} />
      <About personalData={personalData} />
      <Timeline professionalData={professionalData} educationData={educationData} />
      <Projects professionalData={professionalData} />
      <Skills skillsetData={skillsetData} professionalData={professionalData} />
      <Certifications certificationData={certificationData} professionalData={professionalData} />
      {/* <Contact personalData={personalData} /> */}
      {/* <Footer personalData={personalData} /> */}
    </main>
  );
}




