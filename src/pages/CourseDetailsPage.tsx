
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { BookOpen, BriefcaseIcon, Building, DollarSign, TrendingUp, Award, ArrowLeft, GraduationCap, Info } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';
import JobOpportunities from '@/components/JobOpportunities';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

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

  const jobDescriptions: Record<string, string> = {
    "Software Engineer": "Design, develop, and maintain software applications. Strong knowledge of algorithms, data structures, and software architecture required.",
    "Product Manager": "Define product vision, strategy, and roadmap. Work closely with engineering, design, and marketing teams to launch and iterate on products.",
    "UI/UX Designer": "Create intuitive and engaging user interfaces. Conduct user research and testing to improve product design.",
    "Data Scientist": "Apply advanced analytics and machine learning techniques to extract insights from data. Create predictive models and algorithms.",
    "Full Stack Developer": "Build both frontend and backend systems. Proficiency in multiple programming languages and frameworks required.",
    "Cloud Architect": "Design and implement cloud infrastructure. Experience with major cloud platforms like AWS, Azure, or GCP necessary.",
    "DevOps Engineer": "Automate deployment pipelines and manage infrastructure. Focus on CI/CD practices and monitoring systems.",
    "Program Manager": "Coordinate complex projects across multiple teams. Strong leadership and communication skills essential.",
    "Backend Developer": "Build server-side applications and APIs. Knowledge of databases, server architecture, and performance optimization important.",
    "ML Engineer": "Develop and deploy machine learning models to production. Experience with ML frameworks and data processing required.",
    "Solutions Architect": "Design end-to-end solutions for client problems. Balance technical requirements with business constraints.",
    "Technical Program Manager": "Manage technical projects and coordinate engineering teams. Technical knowledge combined with project management skills.",
    "iOS Developer": "Build native iOS applications. Knowledge of Swift, Objective-C, and Apple's design guidelines necessary.",
    "Mac OS Engineer": "Develop software specifically for macOS. Strong understanding of Apple's ecosystem required.",
    "Hardware Engineer": "Design and develop physical computing systems. Knowledge of electronic components and engineering principles important.",
    "Design Technologist": "Bridge the gap between design and engineering. Implement advanced UI prototypes and design systems.",
    "Frontend Engineer": "Create responsive and interactive user interfaces. Experience with modern JavaScript frameworks necessary.",
    "AI Researcher": "Advance the state of artificial intelligence through research and experimentation. Strong mathematical and theoretical background required.",
    "Data Engineer": "Build data pipelines and infrastructure. Focus on data storage, processing, and accessibility.",
    "Security Engineer": "Protect systems and data from threats. Experience with security protocols, encryption, and vulnerability assessment.",
    "Systems Engineer": "Design and manage complex IT systems. Focus on reliability, performance, and integration.",
    "Research Scientist": "Conduct original research to solve complex problems. Strong academic background and publication history valuable.",
    "Business Analyst": "Analyze business needs and translate them into technical requirements. Strong analytical and communication skills necessary.",
    "IT Specialist": "Provide technical expertise and support for IT systems. Troubleshoot and resolve complex technical issues.",
    "Junior Developer": "Entry-level software development role. Learn while contributing to real projects under mentorship.",
    "Business Consultant": "Advise clients on business strategies and processes. Combine industry knowledge with analytical skills.",
    "QA Engineer": "Ensure software quality through testing and automation. Focus on finding bugs and improving user experience.",
    "System Administrator": "Manage and maintain IT infrastructure. Ensure system security, performance, and reliability.",
    "Technology Analyst": "Analyze technology trends and their business implications. Provide strategic advice on technology adoption.",
    "Technical Lead": "Lead a team of developers while contributing to code. Provide technical direction and mentorship.",
    "Project Manager": "Plan, execute, and close technology projects. Focus on timelines, resources, and deliverables.",
    "Software Developer": "Create and maintain software applications. Write clean, efficient, and maintainable code.",
    "Test Engineer": "Design and implement test plans and frameworks. Focus on both manual and automated testing approaches.",
    "Technical Support": "Provide assistance to users facing technical issues. Troubleshoot problems and document solutions.",
    "Network Specialist": "Design, implement, and maintain computer networks. Focus on connectivity, performance, and security.",
    "Technology Consultant": "Advise clients on technology solutions. Combine technical expertise with business acumen.",
    "Java Developer": "Specialize in developing applications using Java. Knowledge of Java frameworks and libraries essential.",
    "Full Stack Engineer": "Build comprehensive web applications from frontend to backend. Wide-ranging knowledge of web technologies required.",
    "Cloud Specialist": "Implement and manage cloud-based solutions. Experience with cloud platforms and deployment models necessary."
  };

  const handleCompanyClick = (company: string) => {
    setSelectedCompany(company);
    setSelectedJob(null);
  };

  const renderJobDetails = (job: string) => {
    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-md">{job}</h4>
        <p className="text-sm">{jobDescriptions[job] || "No description available."}</p>
        <div className="pt-2">
          <Badge variant="outline" className="mr-2 bg-primary/10">
            {course?.field || "General"}
          </Badge>
          <Badge variant="outline">
            {course?.level || "Entry Level"}
          </Badge>
        </div>
      </div>
    );
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
                            {course.careerProspects && course.careerProspects.length > 0 ? (
                              course.careerProspects.map((career, index) => (
                                <Badge 
                                  key={index} 
                                  className="justify-start py-2 bg-secondary/20 hover:bg-secondary/30 cursor-pointer transition-colors"
                                  onClick={() => navigate(`/careers/${encodeURIComponent(career)}`)}
                                >
                                  <BriefcaseIcon className="h-3.5 w-3.5 mr-2" />
                                  {career}
                                </Badge>
                              ))
                            ) : (
                              <p className="text-muted-foreground">No career prospects available for this course.</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Show job opportunities in overview tab too */}
                  <div className="mt-6">
                    <JobOpportunities 
                      fieldName={course.field}
                      careerProspects={course.careerProspects || []}
                    />
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
                              <Popover key={index}>
                                <PopoverTrigger asChild>
                                  <Card className="hover:border-primary transition-colors cursor-pointer">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg flex items-center gap-2">
                                        <BriefcaseIcon className="h-4 w-4 text-primary" />
                                        {job}
                                      </CardTitle>
                                    </CardHeader>
                                    <CardFooter className="pt-0">
                                      <div className="flex justify-end w-full">
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    </CardFooter>
                                  </Card>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                  {renderJobDetails(job)}
                                </PopoverContent>
                              </Popover>
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
