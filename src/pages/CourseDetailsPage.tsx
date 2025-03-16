
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, BriefcaseIcon, Building, DollarSign, TrendingUp, Award, ArrowLeft, GraduationCap } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      const foundCourse = coursesData.find(c => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        navigate('/courses');
      }
    }
  }, [courseId, navigate]);

  const companyJobOpportunities: Record<string, string[]> = {
    "Google": ["Software Engineer", "Product Manager", "UI/UX Designer", "Data Scientist"],
    "Microsoft": ["Full Stack Developer", "Cloud Architect", "DevOps Engineer", "Program Manager"],
    "Amazon": ["Backend Developer", "ML Engineer", "Solutions Architect", "Technical Program Manager"],
    "Apple": ["iOS Developer", "Mac OS Engineer", "Hardware Engineer", "Design Technologist"],
    "Facebook": ["Frontend Engineer", "AI Researcher", "Data Engineer", "Security Engineer"],
    "IBM": ["Systems Engineer", "Research Scientist", "Business Analyst", "IT Specialist"],
    "TCS": ["Junior Developer", "Business Consultant", "QA Engineer", "System Administrator"],
    "Infosys": ["Associate Developer", "Technology Analyst", "Technical Lead", "Project Manager"],
    "Wipro": ["Software Developer", "Test Engineer", "Technical Support", "Network Specialist"],
    "Accenture": ["Technology Consultant", "Java Developer", "Full Stack Engineer", "Cloud Specialist"]
  };

  const handleCompanyClick = (company: string) => {
    setSelectedCompany(company);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto py-8 px-4 flex items-center justify-center">
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <Button 
            variant="outline" 
            onClick={() => navigate('/courses')} 
            className="mb-6"
          >
            ← Back to Courses
          </Button>
          
          {course ? (
            <>
              <Card className="border-primary/20 shadow-lg animate-fade-in overflow-hidden mb-6">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-2xl md:text-3xl mb-2">{course.name}</CardTitle>
                      <CardDescription className="text-base">{course.description}</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {course.level}
                      </Badge>
                      <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground">
                        {course.field}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start mb-4 bg-muted/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Card className="h-full bg-muted/30 border-primary/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-primary" />
                            Course Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Level</h3>
                            <p>{course.level}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Duration</h3>
                            <p>{course.duration}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Field</h3>
                            <p>{course.field}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
                            <p>{course.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <Card className="h-full bg-muted/30 border-primary/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <BriefcaseIcon className="h-5 w-5 text-primary" />
                            Career Prospects
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-2">
                            {course.careerProspects.map((career, index) => (
                              <Badge 
                                key={index} 
                                className="justify-start py-2 bg-secondary/20 hover:bg-secondary/30 cursor-pointer transition-colors"
                                onClick={() => navigate(`/careers/${encodeURIComponent(career)}`)}
                              >
                                <BriefcaseIcon className="h-3.5 w-3.5 mr-2" />
                                {career}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="jobs" className="mt-0">
                  {selectedCompany ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Building className="h-5 w-5 text-primary" />
                          Job Opportunities at {selectedCompany}
                        </h3>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedCompany(null)}
                        >
                          Back to Companies
                        </Button>
                      </div>
                      
                      <Card className="bg-muted/30 border-primary/10">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {companyJobOpportunities[selectedCompany]?.map((job, index) => (
                              <Card key={index} className="hover:border-primary transition-colors">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-lg flex items-center gap-2">
                                    <BriefcaseIcon className="h-4 w-4 text-primary" />
                                    {job}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm">
                                    Apply your {course.name} knowledge in this {job} position. 
                                    This role requires skills in problem-solving, critical thinking, 
                                    and specific technical expertise.
                                  </p>
                                </CardContent>
                                <CardFooter>
                                  <Button size="sm" variant="outline" className="w-full">
                                    View Job Details
                                  </Button>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Building className="h-5 w-5 text-primary" />
                        Top Companies Hiring
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.keys(companyJobOpportunities).map((company, index) => (
                          <Card 
                            key={index} 
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => handleCompanyClick(company)}
                          >
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">{company}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-4 pt-0">
                              <p className="text-sm text-muted-foreground">
                                {companyJobOpportunities[company].length} job opportunities available
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-12">
              <p>Loading course details...</p>
            </div>
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CourseDetailsPage;
