
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BriefcaseIcon, Building, DollarSign, MapPin } from 'lucide-react';

interface JobOpportunity {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  type: string;
}

interface JobOpportunitiesProps {
  fieldName: string;
  careerProspects: string[];
}

// Mock job data by career field
const jobsByCareer: Record<string, JobOpportunity[]> = {
  "Software Developer": [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore, India",
      salary: "₹12-20 LPA",
      description: "Developing user-facing features using React.js and modern JavaScript libraries.",
      skills: ["React", "JavaScript", "HTML/CSS", "TypeScript"],
      type: "Full-time"
    },
    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Hyderabad, India",
      salary: "₹15-25 LPA",
      description: "Building scalable APIs and services using Node.js and cloud technologies.",
      skills: ["Node.js", "Express", "MongoDB", "AWS"],
      type: "Full-time"
    }
  ],
  "Data Scientist": [
    {
      title: "Data Scientist",
      company: "Amazon",
      location: "Bangalore, India",
      salary: "₹18-30 LPA",
      description: "Analyzing large datasets to drive product decisions and strategic initiatives.",
      skills: ["Python", "Machine Learning", "SQL", "Statistics"],
      type: "Full-time"
    },
    {
      title: "ML Engineer",
      company: "Flipkart",
      location: "Bangalore, India",
      salary: "₹16-28 LPA",
      description: "Building and deploying machine learning models for personalization engines.",
      skills: ["TensorFlow", "PyTorch", "Python", "Big Data"],
      type: "Full-time"
    }
  ],
  "AI Engineer": [
    {
      title: "AI Research Engineer",
      company: "NVIDIA",
      location: "Pune, India",
      salary: "₹20-35 LPA",
      description: "Researching and implementing cutting-edge AI algorithms for computer vision.",
      skills: ["Deep Learning", "Computer Vision", "Python", "C++"],
      type: "Full-time"
    }
  ],
  "Business Analyst": [
    {
      title: "Business Analyst",
      company: "Deloitte",
      location: "Gurgaon, India",
      salary: "₹10-18 LPA",
      description: "Analyzing business requirements and translating them into functional specifications.",
      skills: ["SQL", "Excel", "Tableau", "Business Intelligence"],
      type: "Full-time"
    }
  ],
  "Marketing Executive": [
    {
      title: "Digital Marketing Manager",
      company: "Myntra",
      location: "Bangalore, India",
      salary: "₹12-22 LPA",
      description: "Leading digital marketing campaigns and optimizing online presence.",
      skills: ["SEO/SEM", "Content Marketing", "Analytics", "Social Media"],
      type: "Full-time"
    }
  ],
  "Human Resources Manager": [
    {
      title: "HR Business Partner",
      company: "Infosys",
      location: "Bangalore, India",
      salary: "₹12-20 LPA",
      description: "Supporting business units with HR initiatives and employee relations.",
      skills: ["Recruitment", "Employee Relations", "HR Policies", "Talent Management"],
      type: "Full-time"
    }
  ],
  // Default job for any career not specifically defined
  "Default": [
    {
      title: "Entry Level Position",
      company: "Various Companies",
      location: "Major Cities, India",
      salary: "₹6-15 LPA",
      description: "Entry level positions available across various organizations in India.",
      skills: ["Communication", "Teamwork", "Problem Solving"],
      type: "Full-time"
    }
  ]
};

const JobOpportunities: React.FC<JobOpportunitiesProps> = ({ fieldName, careerProspects }) => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleCareerClick = (career: string) => {
    setSelectedCareer(career);
    setIsDialogOpen(true);
  };
  
  const getJobsForCareer = (career: string) => {
    return jobsByCareer[career] || jobsByCareer["Default"];
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <BriefcaseIcon className="h-5 w-5 text-primary" />
        Job Opportunities in {fieldName}
      </h3>
      
      <Card>
        <CardHeader>
          <CardTitle>Career Prospects</CardTitle>
          <CardDescription>
            Click on any career to see available job opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {careerProspects.map((career, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3 hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={() => handleCareerClick(career)}
              >
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                {career}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedCareer && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <BriefcaseIcon className="h-5 w-5 text-primary" />
                {selectedCareer} Opportunities
              </DialogTitle>
              <DialogDescription>
                Popular job listings for {selectedCareer} roles in India
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              {getJobsForCareer(selectedCareer).map((job, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className="pb-2 bg-muted/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Building className="h-3.5 w-3.5" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Description:</h4>
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Required Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JobOpportunities;
