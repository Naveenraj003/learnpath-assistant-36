
export interface College {
  name: string;
  location: string;
  ranking: string;
  features: string[];
}

export interface Course {
  id: string;
  name: string;
  level: string;
  field: string;
  duration: string;
  description: string;
  careerProspects: string[];
  topColleges: College[];
}

export const coursesData: Course[] = [
  {
    id: "cs-btech",
    name: "B.Tech in Computer Science",
    level: "undergraduate",
    field: "engineering",
    duration: "4 years",
    description: "A comprehensive program that covers programming, algorithms, data structures, computer architecture, and software engineering principles.",
    careerProspects: [
      "Software Developer",
      "Systems Analyst",
      "Data Scientist",
      "Web Developer",
      "AI Engineer"
    ],
    topColleges: [
      {
        name: "Indian Institute of Technology (IIT), Delhi",
        location: "New Delhi, India",
        ranking: "Top 5 in Engineering",
        features: ["World-class faculty", "Cutting-edge research facilities", "Strong industry connections"]
      },
      {
        name: "Massachusetts Institute of Technology (MIT)",
        location: "Cambridge, USA",
        ranking: "#1 in Computer Science",
        features: ["Innovation hub", "Top research output", "Strong alumni network"]
      },
      {
        name: "Stanford University",
        location: "Stanford, USA",
        ranking: "Top 3 globally",
        features: ["Silicon Valley connections", "Entrepreneurship focus", "Research excellence"]
      }
    ]
  },
  {
    id: "medicine-mbbs",
    name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
    level: "undergraduate",
    field: "medicine",
    duration: "5.5 years (including internship)",
    description: "A professional degree in medicine that provides comprehensive training in medical sciences, clinical practice, and patient care.",
    careerProspects: [
      "General Physician",
      "Surgeon",
      "Medical Researcher",
      "Public Health Specialist",
      "Medical Officer"
    ],
    topColleges: [
      {
        name: "All India Institute of Medical Sciences (AIIMS)",
        location: "New Delhi, India",
        ranking: "#1 in Medicine in India",
        features: ["Premier medical institution", "Advanced research facilities", "Specialized departments"]
      },
      {
        name: "Harvard Medical School",
        location: "Boston, USA",
        ranking: "Top 5 globally",
        features: ["Cutting-edge research", "Distinguished faculty", "Excellent clinical training"]
      },
      {
        name: "Johns Hopkins University School of Medicine",
        location: "Baltimore, USA",
        ranking: "Top 3 globally",
        features: ["Research excellence", "Clinical innovation", "Interdisciplinary approach"]
      }
    ]
  },
  {
    id: "business-bba",
    name: "Bachelor of Business Administration (BBA)",
    level: "undergraduate",
    field: "business",
    duration: "3-4 years",
    description: "A program that focuses on business management principles, marketing, finance, human resources, and entrepreneurship.",
    careerProspects: [
      "Business Analyst",
      "Marketing Executive",
      "Human Resources Manager",
      "Operations Manager",
      "Entrepreneur"
    ],
    topColleges: [
      {
        name: "Indian Institute of Management (IIM), Ahmedabad",
        location: "Ahmedabad, India",
        ranking: "Top Business School in India",
        features: ["Case study method", "Industry partnerships", "Strong placement record"]
      },
      {
        name: "Harvard Business School",
        location: "Boston, USA",
        ranking: "#1 globally",
        features: ["Leadership focus", "Global network", "Case method teaching"]
      },
      {
        name: "London School of Economics",
        location: "London, UK",
        ranking: "Top 10 globally",
        features: ["Economic focus", "International environment", "Research excellence"]
      }
    ]
  },
  {
    id: "eng-mtech",
    name: "M.Tech in Artificial Intelligence",
    level: "postgraduate",
    field: "engineering",
    duration: "2 years",
    description: "An advanced program specializing in AI algorithms, machine learning, deep learning, computer vision, and natural language processing.",
    careerProspects: [
      "AI Research Scientist",
      "Machine Learning Engineer",
      "Data Science Lead",
      "AI Product Manager",
      "Computational Linguist"
    ],
    topColleges: [
      {
        name: "Indian Institute of Technology (IIT), Bombay",
        location: "Mumbai, India",
        ranking: "Top 3 in India for AI",
        features: ["AI research center", "Industry collaborations", "Advanced computing facilities"]
      },
      {
        name: "Carnegie Mellon University",
        location: "Pittsburgh, USA",
        ranking: "Top 5 globally for AI",
        features: ["Pioneering AI research", "Robotics innovation", "Industry connections"]
      },
      {
        name: "University of Oxford",
        location: "Oxford, UK",
        ranking: "Top 10 globally",
        features: ["Interdisciplinary approach", "Research excellence", "Historic prestige"]
      }
    ]
  },
  {
    id: "med-md",
    name: "MD in Pediatrics",
    level: "postgraduate",
    field: "medicine",
    duration: "3 years",
    description: "A specialization in child healthcare, covering pediatric diseases, developmental issues, and specialized treatments for children.",
    careerProspects: [
      "Pediatrician",
      "Neonatologist",
      "Pediatric Surgeon",
      "Child Healthcare Researcher",
      "Developmental Specialist"
    ],
    topColleges: [
      {
        name: "AIIMS, New Delhi",
        location: "New Delhi, India",
        ranking: "#1 for Pediatrics in India",
        features: ["Specialized pediatric department", "Advanced neonatal care", "Research focus"]
      },
      {
        name: "Boston Children's Hospital (Harvard Medical School)",
        location: "Boston, USA",
        ranking: "#1 globally for Pediatrics",
        features: ["Specialized care", "Cutting-edge research", "Comprehensive training"]
      },
      {
        name: "Great Ormond Street Hospital (UCL)",
        location: "London, UK",
        ranking: "Top 5 globally",
        features: ["Specialized children's hospital", "Research innovation", "Clinical excellence"]
      }
    ]
  },
  {
    id: "biz-mba",
    name: "Master of Business Administration (MBA)",
    level: "postgraduate",
    field: "business",
    duration: "1-2 years",
    description: "An advanced business degree focusing on leadership, strategic management, finance, marketing, and organizational behavior.",
    careerProspects: [
      "Business Consultant",
      "Investment Banker",
      "Marketing Director",
      "Chief Operations Officer",
      "Entrepreneur"
    ],
    topColleges: [
      {
        name: "Indian Institute of Management (IIM), Bangalore",
        location: "Bangalore, India",
        ranking: "Top 3 in India",
        features: ["Innovation focus", "Entrepreneurship center", "Global exposure"]
      },
      {
        name: "Stanford Graduate School of Business",
        location: "Stanford, USA",
        ranking: "Top 3 globally",
        features: ["Innovation focus", "Silicon Valley network", "Entrepreneurial ecosystem"]
      },
      {
        name: "INSEAD",
        location: "Fontainebleau, France & Singapore",
        ranking: "Top 5 globally",
        features: ["International perspective", "Global campuses", "Accelerated program"]
      }
    ]
  },
  {
    id: "design-bdes",
    name: "Bachelor of Design (B.Des)",
    level: "undergraduate",
    field: "arts",
    duration: "4 years",
    description: "A creative program focusing on visual communication, product design, user experience, and design thinking methodologies.",
    careerProspects: [
      "UX/UI Designer",
      "Product Designer",
      "Graphic Designer",
      "Brand Identity Developer",
      "Design Consultant"
    ],
    topColleges: [
      {
        name: "National Institute of Design (NID)",
        location: "Ahmedabad, India",
        ranking: "Top Design School in India",
        features: ["Industry projects", "Design thinking approach", "Practical learning"]
      },
      {
        name: "Rhode Island School of Design (RISD)",
        location: "Providence, USA",
        ranking: "Top 5 globally",
        features: ["Creative excellence", "Studio-based learning", "Cross-disciplinary approach"]
      },
      {
        name: "Royal College of Art",
        location: "London, UK",
        ranking: "#1 Art & Design globally",
        features: ["Innovation focus", "Industry connections", "Research-led teaching"]
      }
    ]
  },
  {
    id: "science-bsc",
    name: "Bachelor of Science in Physics",
    level: "undergraduate",
    field: "science",
    duration: "3-4 years",
    description: "A program exploring the fundamental laws of nature, covering mechanics, electromagnetism, quantum physics, and relativity.",
    careerProspects: [
      "Research Scientist",
      "Data Analyst",
      "Lab Technician",
      "Science Educator",
      "Technical Writer"
    ],
    topColleges: [
      {
        name: "Indian Institute of Science (IISc)",
        location: "Bangalore, India",
        ranking: "Top Science Institution in India",
        features: ["Research excellence", "Scientific innovation", "Interdisciplinary approach"]
      },
      {
        name: "California Institute of Technology (Caltech)",
        location: "Pasadena, USA",
        ranking: "Top 5 globally for Physics",
        features: ["Research intensity", "Nobel laureate faculty", "Advanced facilities"]
      },
      {
        name: "University of Cambridge",
        location: "Cambridge, UK",
        ranking: "Top 5 globally",
        features: ["Historic excellence", "Cavendish Laboratory", "Scientific breakthroughs"]
      }
    ]
  }
];
