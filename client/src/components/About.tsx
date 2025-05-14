import { useState, useEffect } from "react";
import { PersonalData } from "@/types/data";
import { motion } from "framer-motion";

interface AboutProps {
  personalData: PersonalData;
}

export default function About({ personalData }: AboutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use the data passed as props instead of fetching
  const { basic_info, hobbies } = personalData;
  
  useEffect(() => {
    console.log("About component received personalData:", personalData);
  }, [personalData]);

  if (isLoading) {
    return (
      <section id="about" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            About Me
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
            About Me
          </h2>
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              className="px-4 py-2 bg-primary text-white rounded"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl md:text-3xl font-heading font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{basic_info.full_name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {basic_info.long_descriptive_summary}
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Hobbies & Interests</h4>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((hobby, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={basic_info.profile_image} 
                alt={basic_info.full_name} 
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/400x500?text=Profile+Image";
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
              {basic_info.total_years_of_experiece}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}







