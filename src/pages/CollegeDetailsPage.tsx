import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, GraduationCap, Users, Building, Award, Star } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';

const courseCutoffs: Record<string, { general: string; obc: string; sc: string; st: string }> = {
  "cs-btech": { general: "98.5%", obc: "96.2%", sc: "92.1%", st: "90.3%" },
  "medicine-mbbs": { general: "99.1%", obc: "97.5%", sc: "94.3%", st: "92.5%" },
  "business-bba": { general: "92.4%", obc: "89.8%", sc: "85.6%", st: "83.2%" },
  "eng-mtech": { general: "94.2%", obc: "91.8%", sc: "88.5%", st: "86.1%" },
  "med-md": { general: "98.8%", obc: "97.2%", sc: "94.0%", st: "92.1%" },
  "biz-mba": { general: "96.5%", obc: "94.2%", sc: "90.8%", st: "88.5%" },
  "design-bdes": { general: "93.7%", obc: "91.3%", sc: "87.4%", st: "85.1%" },
  "science-bsc": { general: "95.3%", obc: "92.7%", sc: "88.9%", st: "86.4%" }
};

const CollegeDetailsPage = () => {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [collegeDetails, setCollegeDetails] = useState<{
    name: string;
    location: string;
    ranking: string;
    features: string[];
  } | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    if (collegeName) {
      const decodedCollegeName = decodeURIComponent(collegeName);
      
      const courses = coursesData.filter(course => 
        course.topColleges.some(college => college.name === decodedCollegeName)
      );
      
      if (courses.length > 0) {
        const college = courses[0].topColleges.find(col => col.name === decodedCollegeName);
        if (college) {
          setCollegeDetails(college);
        }
        
        setRelatedCourses(courses);
      }
    }
  }, [collegeName]);

  if (!collegeDetails) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto py-8 px-4 flex items-center justify-center">
          <p>Loading college details...</p>
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
            onClick={() => navigate('/colleges')} 
            className="mb-6"
          >
            ← Back to Colleges
          </Button>
          
          <Card className="border-primary/20 shadow-lg animate-fade-in overflow-hidden mb-6">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{collegeDetails.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {collegeDetails.location}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {collegeDetails.ranking}
                </Badge>
              </div>
            </CardHeader>
          </Card>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start mb-4 bg-muted/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="campus">Campus</TabsTrigger>
              <TabsTrigger value="alumni">Alumni</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    College Profile
                  </h3>
                  <Card className="bg-muted/30 border-primary/10 h-full">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">About:</h4>
                          <p>
                            {collegeDetails.name} is a prestigious institution known for 
                            excellence in education and research. The college offers a diverse 
                            range of programs with state-of-the-art facilities.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Key Features:</h4>
                          <ul className="space-y-1">
                            {collegeDetails.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Highlights
                  </h3>
                  <Card className="bg-muted/30 border-primary/10 h-full">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Established</h4>
                          <p className="font-semibold">1965</p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Students</h4>
                          <p className="font-semibold">5,000+</p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Faculty</h4>
                          <p className="font-semibold">300+</p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Campus Size</h4>
                          <p className="font-semibold">500 acres</p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Placement</h4>
                          <p className="font-semibold">95%</p>
                        </div>
                        
                        <div className="bg-background rounded-lg p-3 shadow-sm">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Accreditation</h4>
                          <p className="font-semibold">A+ Grade</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-0">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Available Courses
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedCourses.map((course) => (
                  <Card key={course.id} className="hover:border-primary transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{course.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {course.level}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{course.duration} • {course.field}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Minimum Cut-offs:</h4>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">General:</span>
                              <span className="font-medium">{courseCutoffs[course.id]?.general || "95%+"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">OBC:</span>
                              <span className="font-medium">{courseCutoffs[course.id]?.obc || "90%+"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">SC:</span>
                              <span className="font-medium">{courseCutoffs[course.id]?.sc || "85%+"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">ST:</span>
                              <span className="font-medium">{courseCutoffs[course.id]?.st || "80%+"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="campus" className="mt-0">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                Campus Overview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>Library</li>
                      <li>Sports Complex</li>
                      <li>Student Center</li>
                      <li>Research Labs</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>500 acres of land</li>
                      <li>100 classrooms</li>
                      <li>200 labs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="alumni" className="mt-0">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Notable Alumni
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>Sundar Pichai</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">CEO of Google</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>Satya Nadella</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">CEO of Microsoft</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>N. R. Narayana Murthy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Co-founder of Infosys</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>Nandan Nilekani</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Co-founder of Infosys</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CollegeDetailsPage;
