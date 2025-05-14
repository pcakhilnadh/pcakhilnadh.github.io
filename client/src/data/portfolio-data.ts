// Import types
import {
  PersonalData,
  Professional,
  EducationData,
  SkillsetData,
  CertificationData
} from '../types/data';

console.log("Loading portfolio data...");

// Personal Data
export const personalData: PersonalData = {
  basic_info: {
    full_name: "Akhil Nadh Pc",
    dob: "1994-05-24",
    place_of_birth: "Thrissur, Kerala, India",
    email: "akhilnadhpc@gmail.com",
    address: "Pullolikkal House, Solvent Road, Irinjalakuda.P.O, Thrissur, Kerala, India, 680101",
    total_years_of_experiece: "5.5 Years",
    tagline: "Lead Data Scientist at Air India",
    short_summary: "Experienced Data Scientist with expertise in Computer Vision and NLP, passionate about solving real-world problems through AI.",
    long_descriptive_summary: "A seasoned data scientist with over 5 years of experience specializing in computer vision and natural language processing. Experienced in leading projects from inception to deployment, designing scalable ML architectures, and implementing state-of-the-art algorithms to solve complex business problems.",
    profile_image: "/assets/profile.jpg"
  },
  family_info: {
    father_name: "Dr. Chandran PP",
    father_occupation: "Homoeopathic Physician",
    mother_name: "Preethy KS",
    mother_occupation: "Retired School Teacher",
    siblings: [],
    marital_status: "Single"
  },
  hobbies: [
    "Traveling",
    "Photography",
    "Writing"
  ],
  social_profiles: {
    twitter: {
      url: "https://twitter.com/akhilnadhpc",
      handler: "akhilnadhpc"
    },
    instagram: {
      url: "https://instagram.com/framesbyakhil",
      handler: "framesbyakhil"
    }
  },
  professional_profiles: {
    linkedin: {
      url: "https://linkedin.com/in/akhilnadhpc",
      handler: "akhilnadhpc"
    },
    personal_blog: {
      url: "https://akhilnadhpc.me",
      handler: "akhilnadhpc.me"
    }
  },
  coding_profiles: {
    github: {
      url: "https://github.com/akhilnadhpc",
      handler: "akhilnadhpc"
    },
    leetcode: {
      url: "https://leetcode.com/akhilnadhpc",
      handler: "akhilnadhpc"
    },
    hackerrank: {
      url: "https://www.hackerrank.com/akhilnadhpc",
      handler: "akhilnadhpc"
    },
    stackoverflow: {
      url: "https://stackoverflow.com/users/1234567/akhilnadhpc",
      handler: "akhilnadhpc"
    },
    kaggle: {
      url: "https://kaggle.com/akhilnadhpc",
      handler: "akhilnadhpc"
    }
  },
  personal_profiles: {
    "Google Map Reviewer Profile": {
      url: "https://maps.google.com/contributor/123456789",
      handler: "Akhil Nadh"
    },
    "Medium": {
      url: "https://medium.com/@akhilnadhpc",
      handler: "akhilnadhpc"
    }
  }
};

// Professional Data
export const professionalData: Professional = {
  companies: [
    {
      id: "air-india",
      name: "Air India",
      location: "India",
      projects: [
        {
          id: "queue-behaviour",
          title: "Queue Behaviour Analysis",
          description: "Used computer vision to analyze passenger flow and queue efficiency using surveillance feeds.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["OpenCV", "YOLOv5", "NumPy", "Pandas"],
            tools: ["Jupyter", "Git", "LabelImg"],
            deployment: ["Flask", "Docker"],
            cloud_platforms: ["AWS EC2"],
            ml_models: ["YOLOv5"]
          }
        },
        {
          id: "passport-llm",
          title: "Passport Scanner & LLM Info Extraction",
          description: "Automated passport scanning and information extraction using OCR + LLM pipelines.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["LangChain", "Transformers", "Pytesseract", "pdf2image"],
            tools: ["VSCode", "Postman", "Git"],
            deployment: ["FastAPI"],
            cloud_platforms: ["OpenAI API"],
            ml_models: ["GPT-4 (API)"]
          }
        },
        {
          id: "food-leftover",
          title: "Food Leftover Analysis",
          description: "Built a deep learning model to classify leftover food to reduce in-flight catering waste.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["TensorFlow", "Keras", "OpenCV", "Matplotlib"],
            tools: ["LabelImg", "Google Colab"],
            deployment: ["Flask"],
            cloud_platforms: ["Google Drive"],
            ml_models: ["InceptionV3"]
          }
        },
        {
          id: "vip-identification",
          title: "VIP User Identification",
          description: "Face recognition system for real-time VIP passenger identification at check-in.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["Dlib", "FaceNet", "OpenCV", "Scikit-learn"],
            tools: ["Docker", "Git", "Jupyter"],
            deployment: ["Flask"],
            cloud_platforms: [],
            ml_models: ["FaceNet Embeddings"]
          }
        }
      ]
    },
    {
      id: "nest-digital",
      name: "NeST Digital Private Ltd",
      location: "India",
      projects: [
        {
          id: "gesture-navigation",
          title: "Gesture Navigation System",
          description: "Developed hand gesture recognition for controlling infotainment systems in vehicles.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["OpenCV", "MediaPipe"],
            tools: ["Raspberry Pi", "Git"],
            deployment: ["On-device"],
            cloud_platforms: [],
            ml_models: ["Custom CNN"]
          }
        },
        {
          id: "drowsiness-detection",
          title: "Drowsiness Detection",
          description: "Eye aspect ratio and facial landmarks used to detect driver fatigue in real-time.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["Dlib", "OpenCV"],
            tools: ["RealSense Camera", "Jupyter"],
            deployment: ["Flask"],
            cloud_platforms: [],
            ml_models: ["SVM"]
          }
        },
        {
          id: "radar-camera-fusion",
          title: "Radar-Camera Fusion",
          description: "Implemented a Kalman Filter-based fusion pipeline for radar and camera data.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["NumPy", "OpenCV"],
            tools: ["CANalyzer", "Jupyter"],
            deployment: ["Simulation Environment"],
            cloud_platforms: [],
            ml_models: ["Kalman Filter"]
          }
        },
        {
          id: "failed-component-prediction",
          title: "Failed Component Prediction",
          description: "Built predictive models for identifying early failures in automotive components.",
          tech_stack: {
            languages: ["Python"],
            libraries_frameworks: ["Scikit-learn", "XGBoost", "Pandas"],
            tools: ["Power BI", "Tableau", "Excel"],
            deployment: ["REST API"],
            cloud_platforms: [],
            ml_models: ["XGBoost", "Random Forest"]
          }
        }
      ]
    }
  ],
  professional_experience: [
    {
      company_id: "air-india",
      designation: "Data Scientist",
      start_date: "2023-01",
      end_date: null
    },
    {
      company_id: "nest-digital",
      designation: "Machine Learning Engineer",
      start_date: "2019-12-02",
      end_date: "2024-10-03"
    }
  ]
};

// Education Data
export const educationData: EducationData = {
  education: [
    {
      institution: "ABC Engineering College",
      degree: "B.Tech in Electronics and Communication",
      location: "Punjab, India",
      start_year: "2011",
      end_year: "2015"
    },
    {
      institution: "ABC Engineering College",
      degree: "B.Tech in Electronics and Communication",
      location: "Kerala, India",
      start_year: "2011",
      end_year: "2015"
    },
    {
      institution: "XYZ Higher Secondary School",
      degree: "12th Grade",
      location: "Kerala, India",
      start_year: "2009",
      end_year: "2011"
    }
  ]
};

// Skillset Data (simplified for this example)
export const skillsetData: SkillsetData = {
  skillset: {
    id: "ml-ai-skillset-001",
    categories: {
      "Natural Language Processing": {
        description: "Skills and tools related to understanding and processing human language data.",
        skills: [
          {
            id: "nlp-hf-transformers",
            name: "Hugging Face Transformers",
            rating: 5,
            used_in_projects: [
              { id: "passport-llm", title: "Passport Scanner & LLM Info Extraction" }
            ]
          },
          {
            id: "nlp-bert",
            name: "BERT",
            rating: 5,
            used_in_projects: [
              { id: "passport-llm", title: "Passport Scanner & LLM Info Extraction" }
            ]
          }
        ]
      },
      "Computer Vision": {
        description: "Skills related to image and video processing and analysis.",
        skills: [
          {
            id: "cv-opencv",
            name: "OpenCV",
            rating: 5,
            used_in_projects: [
              { id: "queue-behaviour", title: "Queue Behaviour Analysis" },
              { id: "vip-identification", title: "VIP User Identification" }
            ]
          },
          {
            id: "cv-yolo",
            name: "YOLO",
            rating: 4,
            used_in_projects: [
              { id: "queue-behaviour", title: "Queue Behaviour Analysis" }
            ]
          }
        ]
      }
    }
  }
};

// Certification Data
export const certificationData: CertificationData = {
  certifications: [
    {
      id: "aws-ml-specialty-2024",
      name: "AWS Certified Machine Learning – Specialty",
      issuer: "Amazon Web Services",
      issue_date: "2024-03-15",
      expiry_date: "2027-03-15",
      credential_id: "ABC1234XYZ",
      credential_url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
      description: "Validates expertise in building, training, tuning, and deploying machine learning models on AWS.",
      skills_validated: [
        "mlops-aws",
        "mlops-mlflow",
        "mleng-sklearn"
      ],
      related_projects: [
        { id: "food-leftover", title: "Food Leftover Analysis" }
      ]
    },
    {
      id: "tensorflow-dev",
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      issue_date: "2022-05-20",
      expiry_date: null,
      credential_id: "TF-DEV-54321",
      credential_url: "https://www.tensorflow.org/certificate",
      description: "Validates expertise in using TensorFlow to implement machine learning models.",
      skills_validated: [
        "dl-tensorflow",
        "dl-keras",
        "cv-cnn"
      ],
      related_projects: [
        { id: "food-leftover", title: "Food Leftover Analysis" }
      ]
    }
  ]
};

console.log("All portfolio data loaded successfully");

