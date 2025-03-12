
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, BriefcaseIcon, Building, DollarSign, TrendingUp, Award } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

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
          
          <div className="max-w-4xl mx-auto">
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
            
            <Card className="border-primary/20 shadow-lg animate-fade-in overflow-hidden">
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start mb-6 bg-muted/50">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
                    <TabsTrigger value="future" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Future Scope</TabsTrigger>
                    <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Job Opportunities</TabsTrigger>
                    <TabsTrigger value="colleges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Top Colleges</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          Course Details
                        </h3>
                        <div className="space-y-2 bg-muted/10 p-4 rounded-lg border border-border">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Level:</span>
                            <span>{course.level}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Field:</span>
                            <span>{course.field}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <BriefcaseIcon className="h-4 w-4 text-primary" />
                          Career Prospects
                        </h3>
                        <ul className="space-y-1 bg-muted/10 p-4 rounded-lg border border-border">
                          {course.careerProspects.map((career, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              <span>{career}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary" />
                          Top Colleges
                        </h3>
                        <ul className="space-y-1 bg-muted/10 p-4 rounded-lg border border-border">
                          {course.topColleges
                            .filter(college => college.location.includes('India'))
                            .slice(0, 5)
                            .map((college, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span>{college.name}</span>
                              </li>
                            ))}
                          {course.topColleges.filter(college => college.location.includes('India')).length > 5 && (
                            <li className="text-sm text-muted-foreground mt-2 italic">
                              + {course.topColleges.filter(college => college.location.includes('India')).length - 5} more colleges
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="future" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Growth Potential
                        </h3>
                        <Card className="bg-muted/30 border-primary/10 h-full">
                          <CardContent className="p-4">
                            <p className="mb-3">The {course.field} industry is experiencing rapid growth, especially in specialized areas of {course.name}. Professionals with this qualification can expect:</p>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                <span>Increasing demand across both established companies and startups</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                <span>Opportunities for international careers and remote work</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                <span>Potential for entrepreneurship and innovation in the field</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                <span>Expanding roles with the adoption of new technologies</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Further Education
                        </h3>
                        <Card className="bg-muted/30 border-primary/10 h-full">
                          <CardContent className="p-4">
                            <p className="mb-3">After completing {course.name}, students can pursue various advanced education paths:</p>
                            <ul className="space-y-2">
                              {course.level === 'undergraduate' ? (
                                <>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                    <span>Masters programs in specialized areas of {course.field}</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                    <span>Professional certifications to enhance technical skills</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                    <span>Research opportunities in emerging fields</span>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                    <span>Doctoral programs for academic and research careers</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                    <span>Executive education for leadership roles</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                    <span>Interdisciplinary studies combining {course.field} with related fields</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="jobs" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <BriefcaseIcon className="h-4 w-4 text-primary" />
                          Top Companies Recruiting
                        </h3>
                        <Card className="bg-muted/30 border-primary/10 h-full">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {course.field === 'engineering' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">Google</Badge>
                                  <Badge className="justify-start py-2 px-3">Microsoft</Badge>
                                  <Badge className="justify-start py-2 px-3">Amazon</Badge>
                                  <Badge className="justify-start py-2 px-3">Infosys</Badge>
                                  <Badge className="justify-start py-2 px-3">TCS</Badge>
                                  <Badge className="justify-start py-2 px-3">Wipro</Badge>
                                </>
                              )}
                              {course.field === 'medicine' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">Apollo Hospitals</Badge>
                                  <Badge className="justify-start py-2 px-3">Fortis Healthcare</Badge>
                                  <Badge className="justify-start py-2 px-3">Max Healthcare</Badge>
                                  <Badge className="justify-start py-2 px-3">AIIMS</Badge>
                                  <Badge className="justify-start py-2 px-3">Medanta</Badge>
                                  <Badge className="justify-start py-2 px-3">Narayana Health</Badge>
                                </>
                              )}
                              {course.field === 'business' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">McKinsey</Badge>
                                  <Badge className="justify-start py-2 px-3">BCG</Badge>
                                  <Badge className="justify-start py-2 px-3">Goldman Sachs</Badge>
                                  <Badge className="justify-start py-2 px-3">JP Morgan</Badge>
                                  <Badge className="justify-start py-2 px-3">Deloitte</Badge>
                                  <Badge className="justify-start py-2 px-3">KPMG</Badge>
                                </>
                              )}
                              {course.field === 'arts' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">Adobe</Badge>
                                  <Badge className="justify-start py-2 px-3">Google Design</Badge>
                                  <Badge className="justify-start py-2 px-3">Microsoft Design</Badge>
                                  <Badge className="justify-start py-2 px-3">Designit</Badge>
                                  <Badge className="justify-start py-2 px-3">Ogilvy</Badge>
                                  <Badge className="justify-start py-2 px-3">IDEO</Badge>
                                </>
                              )}
                              {course.field === 'science' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">ISRO</Badge>
                                  <Badge className="justify-start py-2 px-3">DRDO</Badge>
                                  <Badge className="justify-start py-2 px-3">BARC</Badge>
                                  <Badge className="justify-start py-2 px-3">TIFR</Badge>
                                  <Badge className="justify-start py-2 px-3">CSIR</Badge>
                                  <Badge className="justify-start py-2 px-3">IISc</Badge>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          Salary Expectations
                        </h3>
                        <Card className="bg-muted/30 border-primary/10 h-full">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Entry Level:</span>
                                  {course.field === 'engineering' && <span className="font-medium">₹4.5 - 8 LPA</span>}
                                  {course.field === 'medicine' && <span className="font-medium">₹5 - 12 LPA</span>}
                                  {course.field === 'business' && <span className="font-medium">₹5 - 10 LPA</span>}
                                  {course.field === 'arts' && <span className="font-medium">₹3 - 6 LPA</span>}
                                  {course.field === 'science' && <span className="font-medium">₹4 - 7 LPA</span>}
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full mt-1">
                                  <div className="h-full bg-primary rounded-full" style={{ width: '30%' }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Mid Level (3-5 years):</span>
                                  {course.field === 'engineering' && <span className="font-medium">₹10 - 18 LPA</span>}
                                  {course.field === 'medicine' && <span className="font-medium">₹15 - 25 LPA</span>}
                                  {course.field === 'business' && <span className="font-medium">₹12 - 25 LPA</span>}
                                  {course.field === 'arts' && <span className="font-medium">₹8 - 15 LPA</span>}
                                  {course.field === 'science' && <span className="font-medium">₹8 - 15 LPA</span>}
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full mt-1">
                                  <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Senior Level (8+ years):</span>
                                  {course.field === 'engineering' && <span className="font-medium">₹25 - 40+ LPA</span>}
                                  {course.field === 'medicine' && <span className="font-medium">₹30 - 60+ LPA</span>}
                                  {course.field === 'business' && <span className="font-medium">₹30 - 50+ LPA</span>}
                                  {course.field === 'arts' && <span className="font-medium">₹20 - 35+ LPA</span>}
                                  {course.field === 'science' && <span className="font-medium">₹18 - 40+ LPA</span>}
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full mt-1">
                                  <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="colleges" className="mt-0">
                    <div className="grid grid-cols-1 gap-4">
                      {course.topColleges.map((college, index) => (
                        <Card key={index} className="hover:shadow-md transition-shadow duration-300 bg-muted/10 border-primary/10">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">{college.name}</h3>
                                <p className="text-muted-foreground text-sm">{college.location}</p>
                                <p className="text-sm mt-1">Ranking: <Badge variant="outline" className="ml-1">{college.ranking}</Badge></p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {college.features.map((feature, idx) => (
                                  <Badge key={idx} variant="secondary" className="whitespace-nowrap">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CourseDetailsPage;
