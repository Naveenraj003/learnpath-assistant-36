
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, TrendingUp, Building, BriefcaseIcon, Search, BadgePlus, BadgeMinus } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import { getIndianSalaryRange, getIndianGrowthRate, getIndianCompanies } from '@/utils/chatUtils';
import AnimatedTransition from '@/components/AnimatedTransition';

const CareersPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

  // Get all careers from all courses
  const allCareers = coursesData.flatMap(course => 
    course.careerProspects.map(career => ({
      career,
      course: course
    }))
  );

  // Get unique careers
  const uniqueCareers = allCareers.filter((career, index, self) =>
    index === self.findIndex((c) => c.career === career.career)
  );

  const getCareerDetails = (career: string) => {
    const relatedCourse = allCareers.find(c => c.career === career)?.course;
    
    if (!relatedCourse) return null;
    
    const salaryRange = getIndianSalaryRange(relatedCourse.field, career);
    const growthRate = getIndianGrowthRate(relatedCourse.field);
    const companies = getIndianCompanies(career, relatedCourse.field);
    
    return {
      career,
      field: relatedCourse.field,
      salaryRange,
      growthRate,
      companies,
      relatedCourse
    };
  };

  // Pros and cons for careers (generic examples that would apply to most careers)
  const getCareerProsAndCons = (career: string, field: string) => {
    const generalPros = [
      "Growing demand in Indian job market",
      "Competitive salary compared to other sectors",
      "Opportunities for skill development",
      "Career advancement possibilities",
      "Work-life balance options available"
    ];
    
    const generalCons = [
      "Requires continuous learning and updating skills",
      "High competition for top positions",
      "May require relocation to major cities in India",
      "High pressure work environment at times",
      "Can require long working hours in some companies"
    ];
    
    // Field-specific pros
    const fieldSpecificPros: Record<string, string[]> = {
      engineering: [
        "High demand for technical skills across India",
        "Growing tech startup ecosystem in Bangalore, Hyderabad, and Pune",
        "Opportunity to work on cutting-edge technologies",
        "Remote work options becoming more common"
      ],
      medicine: [
        "Respected profession in Indian society",
        "Government initiatives expanding healthcare infrastructure",
        "Growing medical tourism industry in India",
        "Opportunities in both urban and rural settings"
      ],
      business: [
        "India's growing economy creates diverse opportunities",
        "Entrepreneurship encouraged by government policies",
        "Multinational companies expanding Indian operations",
        "Diverse sectors from finance to e-commerce"
      ],
      arts: [
        "Growing digital media and entertainment industry",
        "Increased appreciation for design in consumer products",
        "Creative freedom and self-expression",
        "Opportunities in India's film and animation industry"
      ],
      science: [
        "Government funding for research initiatives",
        "Growing R&D centers in major Indian cities",
        "Collaboration opportunities with international institutions",
        "Contributing to India's scientific advancement"
      ]
    };
    
    // Field-specific cons
    const fieldSpecificCons: Record<string, string[]> = {
      engineering: [
        "Technology changes rapidly requiring constant upskilling",
        "Work pressure in major IT companies",
        "Some entry-level positions becoming automated",
        "Competition from large talent pool in India"
      ],
      medicine: [
        "Long working hours in many Indian hospitals",
        "Lengthy education and training period",
        "Challenging work conditions in some areas",
        "High responsibility and stress levels"
      ],
      business: [
        "Economic fluctuations can impact job security",
        "High performance expectations",
        "Competitive environment in major Indian companies",
        "May require frequent travel across India"
      ],
      arts: [
        "Income instability compared to traditional careers",
        "Less structured career path in Indian context",
        "Creative fields sometimes undervalued",
        "Fewer opportunities in smaller cities"
      ],
      science: [
        "Research positions limited to top institutions",
        "Funding challenges for some research areas",
        "Publication pressure in academic positions",
        "Lower starting salaries than corporate sectors"
      ]
    };
    
    // Combine general and field-specific points
    const pros = [...generalPros, ...(fieldSpecificPros[field] || [])];
    const cons = [...generalCons, ...(fieldSpecificCons[field] || [])];
    
    return { pros, cons };
  };

  const careerDetails = selectedCareer ? getCareerDetails(selectedCareer) : null;
  const prosAndCons = careerDetails ? getCareerProsAndCons(selectedCareer, careerDetails.field) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <h1 className="text-3xl font-bold mb-8">Career Guidance for Indian Students</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Select a Course</CardTitle>
                  <CardDescription>View related career paths in India</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={selectedCourse?.id || ""}
                    onValueChange={(value) => {
                      const course = coursesData.find(c => c.id === value) || null;
                      setSelectedCourse(course);
                      setSelectedCareer(null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {coursesData.map((course) => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedCourse && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">About this course</h3>
                        <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Career Options</h3>
                        <div className="space-y-2">
                          {selectedCourse.careerProspects.map((career, index) => (
                            <Button 
                              key={index} 
                              variant={selectedCareer === career ? "default" : "outline"} 
                              size="sm"
                              className="mr-2 mb-2"
                              onClick={() => setSelectedCareer(career)}
                            >
                              {career}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              {!selectedCareer ? (
                <div className="h-full flex items-center justify-center bg-muted rounded-lg p-8">
                  <div className="text-center">
                    <BriefcaseIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a career to view details</h3>
                    <p className="text-muted-foreground">Choose a course and a career path to see details</p>
                  </div>
                </div>
              ) : careerDetails ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{careerDetails.career}</CardTitle>
                        <CardDescription>Career path in {careerDetails.field}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {careerDetails.field}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <IndianRupee className="h-4 w-4 mr-1 text-primary" />
                            Salary Range in India
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            ₹{careerDetails.salaryRange.min.toLocaleString()} - ₹{careerDetails.salaryRange.max.toLocaleString()}
                          </div>
                          <p className="text-xs text-muted-foreground">Annual package (LPA)</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1 text-primary" />
                            Growth Rate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {careerDetails.growthRate}%
                          </div>
                          <p className="text-xs text-muted-foreground">Annual industry growth in India</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Building className="h-4 w-4 mr-1 text-primary" />
                            Top Employers
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm font-medium">
                            {careerDetails.companies.join(', ')}
                          </div>
                          <p className="text-xs text-muted-foreground">Leading companies in India</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <BadgePlus className="h-4 w-4 text-primary" />
                          Advantages in India
                        </h3>
                        <ul className="space-y-1">
                          {prosAndCons?.pros.slice(0, 5).map((pro, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <BadgeMinus className="h-4 w-4 text-primary" />
                          Challenges in India
                        </h3>
                        <ul className="space-y-1">
                          {prosAndCons?.cons.slice(0, 5).map((con, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Required Qualifications in India</h3>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Educational Path</h4>
                              <p className="text-sm text-muted-foreground">
                                {careerDetails.relatedCourse.name} or equivalent degree from a recognized Indian university
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium">Key Skills</h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {generateSkillsForCareer(careerDetails.career, careerDetails.field).map((skill, index) => (
                                  <Badge key={index} variant="secondary">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium">Job Locations in India</h4>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {getJobLocations(careerDetails.field).map((location, index) => (
                                  <Badge key={index} variant="outline">{location}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

// Helper function to generate relevant skills for different careers
function generateSkillsForCareer(career: string, field: string): string[] {
  const generalSkills = ["Communication", "Teamwork", "Problem-solving", "Time management"];
  
  const fieldSkills: Record<string, string[]> = {
    engineering: ["Technical documentation", "Algorithm design", "Software testing", "Data analysis", "Python", "Java", "Cloud computing"],
    medicine: ["Patient care", "Medical diagnostics", "Clinical knowledge", "Medical research", "Healthcare management"],
    business: ["Financial analysis", "Marketing strategy", "Project management", "Leadership", "Negotiation", "Data analytics"],
    arts: ["Creative thinking", "Design principles", "Visual communication", "Adobe Creative Suite", "User experience"],
    science: ["Research methodology", "Lab techniques", "Scientific writing", "Data interpretation", "Critical analysis"]
  };
  
  // Career-specific skills
  const careerSkills: Record<string, string[]> = {
    "Software Developer": ["JavaScript", "React", "Node.js", "Database design", "API integration", "DevOps"],
    "Data Scientist": ["Machine Learning", "Python", "R", "Statistical analysis", "SQL", "Big Data technologies"],
    "Doctor": ["Patient diagnosis", "Treatment planning", "Medical ethics", "Clinical procedures"],
    "Business Analyst": ["Requirements gathering", "Process modeling", "Stakeholder management", "SQL"],
    "UX Designer": ["Wireframing", "User testing", "Prototyping", "Design systems"]
  };
  
  let skills = [...generalSkills];
  
  // Add field-specific skills
  if (fieldSkills[field]) {
    skills = [...skills, ...fieldSkills[field].slice(0, 3)];
  }
  
  // Find the best matching career-specific skills
  for (const [key, value] of Object.entries(careerSkills)) {
    if (career.includes(key) || key.includes(career)) {
      skills = [...skills, ...value.slice(0, 4)];
      break;
    }
  }
  
  // Ensure we don't have too many or too few skills
  return skills.slice(0, 8);
}

// Helper function to get job locations in India based on field
function getJobLocations(field: string): string[] {
  const majorCities = ["Mumbai", "Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Pune"];
  
  const fieldSpecificCities: Record<string, string[]> = {
    engineering: ["Bangalore", "Hyderabad", "Pune", "Gurgaon", "Noida"],
    medicine: ["Delhi", "Mumbai", "Chennai", "Vellore", "Chandigarh"],
    business: ["Mumbai", "Delhi", "Bangalore", "Ahmedabad", "Kolkata"],
    arts: ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Pune"],
    science: ["Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata"]
  };
  
  return fieldSpecificCities[field] || majorCities;
}

export default CareersPage;
