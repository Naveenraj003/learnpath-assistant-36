import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, TrendingUp, Building, BriefcaseIcon, Search, BadgePlus, BadgeMinus, Globe, MapPin } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import { getIndianSalaryRange, getIndianGrowthRate, getIndianCompanies } from '@/utils/chatUtils';
import AnimatedTransition from '@/components/AnimatedTransition';

const CareersPage = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<'global' | 'india'>('india');

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

  // Filter careers based on search term and selected course
  const filteredCareers = uniqueCareers.filter(careerItem => {
    const matchesSearch = searchTerm === '' || 
      careerItem.career.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = !selectedCourse || 
      selectedCourse.careerProspects.includes(careerItem.career);
    
    return matchesSearch && matchesCourse;
  });

  const getCareerDetails = (career: string) => {
    const relatedCourse = allCareers.find(c => c.career === career)?.course;
    
    if (!relatedCourse) return null;
    
    const salaryRange = getIndianSalaryRange(relatedCourse.field, career);
    const growthRate = getIndianGrowthRate(relatedCourse.field);
    const companies = getIndianCompanies(career, relatedCourse.field);

    // Global salary multipliers (rough estimates based on region)
    const globalSalaryMultipliers = {
      'North America': 2.5,
      'Europe': 2.0,
      'Australia': 2.2,
      'Middle East': 1.8,
      'East Asia': 1.7,
      'Southeast Asia': 0.9,
      'Africa': 0.8
    };
    
    // Global growth rate adjustments (percentage points difference)
    const globalGrowthAdjustments = {
      'North America': 2,
      'Europe': 1,
      'Australia': 1.5,
      'Middle East': 3,
      'East Asia': 2.5,
      'Southeast Asia': 1,
      'Africa': 0.5
    };
    
    // Global companies by region
    const globalCompaniesByRegion = {
      'North America': ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
      'Europe': ['Siemens', 'SAP', 'Airbus', 'Philips', 'Unilever'],
      'Australia': ['BHP', 'Telstra', 'Commonwealth Bank', 'Atlassian', 'Rio Tinto'],
      'Middle East': ['Saudi Aramco', 'Emirates Group', 'Qatar Airways', 'ADNOC', 'STC'],
      'East Asia': ['Toyota', 'Samsung', 'Alibaba', 'Tencent', 'Sony'],
      'Southeast Asia': ['Grab', 'DBS Bank', 'Singtel', 'Petronas', 'Bangkok Bank'],
      'Africa': ['MTN Group', 'Dangote Group', 'Safaricom', 'Standard Bank', 'Sonangol']
    };
    
    return {
      career,
      field: relatedCourse.field,
      salaryRange,
      growthRate,
      companies,
      relatedCourse,
      globalSalaryMultipliers,
      globalGrowthAdjustments,
      globalCompaniesByRegion
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

  const getGlobalProsAndCons = (career: string, field: string) => {
    const globalPros = [
      "Exposure to international work environments",
      "Higher salary potential compared to local markets",
      "Opportunities for professional growth and networking",
      "Cultural exchange and personal development",
      "Enhanced resume value for future opportunities"
    ];
    
    const globalCons = [
      "Visa and work permit challenges",
      "Cultural and language adaptation difficulties",
      "Higher cost of living in many global locations",
      "Distance from family and support networks",
      "Varying employment rights and regulations by country"
    ];
    
    // Field-specific global pros
    const fieldSpecificGlobalPros: Record<string, string[]> = {
      engineering: [
        "High demand for technical skills worldwide",
        "Remote work possibilities with global teams",
        "Access to cutting-edge technology in developed markets",
        "International certification recognition"
      ],
      medicine: [
        "Opportunity to work in advanced healthcare systems",
        "Access to latest medical technologies and procedures",
        "Higher earning potential in developed countries",
        "Contribution to global health initiatives"
      ],
      business: [
        "Exposure to diverse business practices and markets",
        "Global networking opportunities",
        "Experience with international regulations and policies",
        "Skills transferable across different economies"
      ],
      arts: [
        "Access to larger markets and audiences",
        "Exposure to diverse artistic traditions",
        "International exhibition and performance opportunities",
        "Connection with global creative communities"
      ],
      science: [
        "Collaboration with leading research institutions",
        "Access to advanced research facilities",
        "International funding opportunities",
        "Publishing in prestigious global journals"
      ]
    };
    
    // Field-specific global cons
    const fieldSpecificGlobalCons: Record<string, string[]> = {
      engineering: [
        "Need for credential recognition in different countries",
        "Keeping up with varying technical standards",
        "Timezone challenges for global teams",
        "Competition from local talent in different markets"
      ],
      medicine: [
        "Licensing requirements vary by country",
        "Adapting to different healthcare systems",
        "Recognition of medical qualifications",
        "Different medical protocols and practices"
      ],
      business: [
        "Varying business cultures and practices",
        "Complex international tax implications",
        "Currency fluctuation risks",
        "Understanding different market regulations"
      ],
      arts: [
        "Different cultural preferences and values",
        "Intellectual property protection challenges",
        "Varying funding models for creative industries",
        "Market saturation in popular global hubs"
      ],
      science: [
        "Different research priorities by country",
        "Varying ethical standards for research",
        "Complex international grant applications",
        "IP ownership challenges in international collaborations"
      ]
    };
    
    // Combine general and field-specific points
    const pros = [...globalPros, ...(fieldSpecificGlobalPros[field] || [])];
    const cons = [...globalCons, ...(fieldSpecificGlobalCons[field] || [])];
    
    return { pros, cons };
  };

  const careerDetails = selectedCareer ? getCareerDetails(selectedCareer) : null;
  const prosAndCons = careerDetails ? 
    (regionFilter === 'india' ? getCareerProsAndCons(selectedCareer, careerDetails.field) : getGlobalProsAndCons(selectedCareer, careerDetails.field)) 
    : null;

  // Get global job locations based on field
  const getGlobalJobLocations = (field: string) => {
    const locations = {
      engineering: ["Silicon Valley", "New York", "London", "Berlin", "Tokyo", "Singapore", "Toronto", "Sydney"],
      medicine: ["Boston", "London", "Geneva", "Melbourne", "Toronto", "Dubai", "Singapore", "Seoul"],
      business: ["New York", "London", "Hong Kong", "Singapore", "Frankfurt", "Tokyo", "Dubai", "Sydney"],
      arts: ["New York", "London", "Paris", "Berlin", "Tokyo", "Los Angeles", "Melbourne", "Toronto"],
      science: ["Boston", "Cambridge (UK)", "Zurich", "Tokyo", "San Francisco", "Copenhagen", "Singapore", "Melbourne"]
    };
    
    return locations[field as keyof typeof locations] || ["New York", "London", "Tokyo", "Singapore", "Dubai"];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Career Guidance for Students</h1>
              <Select
                value={regionFilter}
                onValueChange={(value) => setRegionFilter(value as 'global' | 'india')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>India Focus</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="global">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Global View</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for career opportunities..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedCourse?.id || ""}
                onValueChange={(value) => {
                  if (value === "") {
                    setSelectedCourse(null);
                  } else {
                    const course = coursesData.find(c => c.id === value) || null;
                    setSelectedCourse(course);
                  }
                }}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Courses</SelectItem>
                  {coursesData.map((course) => (
                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Career Opportunities</CardTitle>
                    <CardDescription>
                      {regionFilter === 'global' ? 'Global career paths' : 'Career paths in India'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[70vh] overflow-y-auto">
                    {filteredCareers.length === 0 ? (
                      <div className="text-center p-4 text-muted-foreground">
                        No careers found matching your criteria
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredCareers.map((careerItem, index) => (
                          <Button 
                            key={index} 
                            variant={selectedCareer === careerItem.career ? "default" : "outline"} 
                            className="w-full justify-start text-left h-auto py-3 mb-2"
                            onClick={() => setSelectedCareer(careerItem.career)}
                          >
                            <div>
                              <div className="font-medium">{careerItem.career}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Field: {careerItem.course.field}
                              </div>
                            </div>
                          </Button>
                        ))}
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
                      <p className="text-muted-foreground">Choose a career path to see {regionFilter === 'global' ? 'global' : 'Indian'} market details</p>
                    </div>
                  </div>
                ) : careerDetails ? (
                  <Card className="h-[70vh] overflow-y-auto">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-2">
                            {careerDetails.career}
                            {regionFilter === 'global' && (
                              <Badge variant="outline" className="ml-2 bg-secondary/40">
                                <Globe className="h-3 w-3 mr-1" /> Global
                              </Badge>
                            )}
                            {regionFilter === 'india' && (
                              <Badge variant="outline" className="ml-2 bg-primary/20">
                                <MapPin className="h-3 w-3 mr-1" /> India
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>Career path in {careerDetails.field}</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {careerDetails.field}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {regionFilter === 'global' ? (
                        <div className="grid grid-cols-1 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">Global Salary Comparison</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {Object.entries(careerDetails.globalSalaryMultipliers).map(([region, multiplier]) => (
                                  <div key={region} className="flex justify-between items-center">
                                    <span>{region}</span>
                                    <div>
                                      <span className="text-sm font-semibold">
                                        ${Math.round(careerDetails.salaryRange.min * multiplier / 83 / 1000)}k - ${Math.round(careerDetails.salaryRange.max * multiplier / 83 / 1000)}k
                                      </span>
                                      <span className="text-xs text-muted-foreground ml-1">USD/yr</span>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex justify-between items-center pt-2 border-t">
                                  <span>India (Reference)</span>
                                  <div>
                                    <span className="text-sm font-semibold">
                                      ₹{(careerDetails.salaryRange.min/100000).toFixed(1)} - ₹{(careerDetails.salaryRange.max/100000).toFixed(1)}
                                    </span>
                                    <span className="text-xs text-muted-foreground ml-1">LPA</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                  <TrendingUp className="h-4 w-4 mr-1 text-primary" />
                                  Growth Rate by Region
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {Object.entries(careerDetails.globalGrowthAdjustments).map(([region, adjustment]) => (
                                    <div key={region} className="flex justify-between items-center">
                                      <span className="text-sm">{region}</span>
                                      <div className="flex items-center">
                                        <div className="w-16 h-3 bg-gray-200 rounded-full mr-2">
                                          <div 
                                            className="h-3 bg-primary rounded-full" 
                                            style={{width: `${Math.min(100, (careerDetails.growthRate + adjustment) * 5)}%`}}
                                          ></div>
                                        </div>
                                        <span className="text-sm font-medium">{(careerDetails.growthRate + adjustment).toFixed(1)}%</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center">
                                  <Building className="h-4 w-4 mr-1 text-primary" />
                                  Top Global Employers
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {Object.entries(careerDetails.globalCompaniesByRegion).slice(0, 4).map(([region, companies]) => (
                                    <div key={region}>
                                      <div className="text-sm font-medium mb-1">{region}</div>
                                      <div className="text-sm">{companies.slice(0, 3).join(', ')}</div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      ) : (
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
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <BadgePlus className="h-4 w-4 text-primary" />
                            Advantages {regionFilter === 'global' ? 'Globally' : 'in India'}
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
                            Challenges {regionFilter === 'global' ? 'Globally' : 'in India'}
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
                        <h3 className="text-lg font-semibold mb-3">Required Qualifications</h3>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium">Educational Path</h4>
                                <p className="text-sm text-muted-foreground">
                                  {careerDetails.relatedCourse.name} or equivalent degree from a recognized {regionFilter === 'global' ? 'global' : 'Indian'} university
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
                                <h4 className="font-medium">Job Locations</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {(regionFilter === 'global' 
                                    ? getGlobalJobLocations(careerDetails.field)
                                    : getJobLocations(careerDetails.field)
                                  ).map((location, index) => (
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
