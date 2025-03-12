
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, BriefcaseIcon, Building, DollarSign, TrendingUp, Users, Award } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import { ScrollArea } from "@/components/ui/scroll-area";
import { CourseLevel, SubjectArea } from '@/contexts/ChatContext';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<CourseLevel>('all');
  const [fieldFilter, setFieldFilter] = useState<SubjectArea>('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Extract unique durations
  const uniqueDurations = [...new Set(coursesData.map(course => course.duration))];
  
  // Filter courses based on user selections
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesField = fieldFilter === 'all' || course.field === fieldFilter;
    const matchesDuration = durationFilter === 'all' || course.duration === durationFilter;
    
    return matchesSearch && matchesLevel && matchesField && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Explore Courses in India</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </CardTitle>
                  <CardDescription>Refine your course search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level</label>
                    <Select
                      value={levelFilter}
                      onValueChange={(value) => setLevelFilter(value as CourseLevel)}
                    >
                      <SelectTrigger className="border-primary/20">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Field of Study</label>
                    <Select
                      value={fieldFilter}
                      onValueChange={(value) => setFieldFilter(value as SubjectArea)}
                    >
                      <SelectTrigger className="border-primary/20">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="arts">Arts & Design</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Select
                      value={durationFilter}
                      onValueChange={setDurationFilter}
                    >
                      <SelectTrigger className="border-primary/20">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Durations</SelectItem>
                        {uniqueDurations.map((duration) => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-primary/20 hover:bg-primary/10"
                    onClick={() => {
                      setSearchTerm('');
                      setLevelFilter('all');
                      setFieldFilter('all');
                      setDurationFilter('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Results ({filteredCourses.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCourses.length === 0 ? (
                  <div className="col-span-full bg-muted rounded-lg p-8 text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setLevelFilter('all');
                        setFieldFilter('all');
                        setDurationFilter('all');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <Card key={course.id} className="h-full hover:shadow-lg transition-all duration-300 border-primary/20 animate-fade-in">
                      <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-blue-500/5">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground">
                            {course.field}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          size="sm" 
                          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                          onClick={() => {
                            setSelectedCourse(course);
                            setActiveTab('overview');
                            window.scrollTo({
                              top: document.documentElement.scrollHeight,
                              behavior: 'smooth'
                            });
                          }}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {selectedCourse && (
            <Card className="mt-8 border-primary/20 shadow-lg animate-slide-up overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedCourse.name}</CardTitle>
                    <CardDescription>{selectedCourse.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {selectedCourse.level}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground">
                      {selectedCourse.field}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start mb-4 bg-muted/50">
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
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Level:</span>
                            <span>{selectedCourse.level}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Field:</span>
                            <span>{selectedCourse.field}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{selectedCourse.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <BriefcaseIcon className="h-4 w-4 text-primary" />
                          Career Prospects
                        </h3>
                        <ul className="space-y-1">
                          {selectedCourse.careerProspects.map((career, index) => (
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
                          Top Colleges in India
                        </h3>
                        <ul className="space-y-1">
                          {selectedCourse.topColleges
                            .filter(college => college.location.includes('India'))
                            .map((college, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                <span>{college.name}</span>
                              </li>
                            ))}
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
                        <Card className="bg-muted/30 border-primary/10">
                          <CardContent className="p-4">
                            <p className="mb-3">The {selectedCourse.field} industry is experiencing rapid growth, especially in specialized areas of {selectedCourse.name}. Professionals with this qualification can expect:</p>
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
                        <Card className="bg-muted/30 border-primary/10">
                          <CardContent className="p-4">
                            <p className="mb-3">After completing {selectedCourse.name}, students can pursue various advanced education paths:</p>
                            <ul className="space-y-2">
                              {selectedCourse.level === 'undergraduate' ? (
                                <>
                                  <li className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                    <span>Masters programs in specialized areas of {selectedCourse.field}</span>
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
                                    <span>Interdisciplinary studies combining {selectedCourse.field} with related fields</span>
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
                        <Card className="bg-muted/30 border-primary/10">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {selectedCourse.field === 'engineering' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">Google</Badge>
                                  <Badge className="justify-start py-2 px-3">Microsoft</Badge>
                                  <Badge className="justify-start py-2 px-3">Amazon</Badge>
                                  <Badge className="justify-start py-2 px-3">Infosys</Badge>
                                  <Badge className="justify-start py-2 px-3">TCS</Badge>
                                  <Badge className="justify-start py-2 px-3">Wipro</Badge>
                                </>
                              )}
                              {selectedCourse.field === 'medicine' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">Apollo Hospitals</Badge>
                                  <Badge className="justify-start py-2 px-3">Fortis Healthcare</Badge>
                                  <Badge className="justify-start py-2 px-3">Max Healthcare</Badge>
                                  <Badge className="justify-start py-2 px-3">AIIMS</Badge>
                                  <Badge className="justify-start py-2 px-3">Medanta</Badge>
                                  <Badge className="justify-start py-2 px-3">Narayana Health</Badge>
                                </>
                              )}
                              {selectedCourse.field === 'business' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">McKinsey</Badge>
                                  <Badge className="justify-start py-2 px-3">BCG</Badge>
                                  <Badge className="justify-start py-2 px-3">Goldman Sachs</Badge>
                                  <Badge className="justify-start py-2 px-3">JP Morgan</Badge>
                                  <Badge className="justify-start py-2 px-3">Deloitte</Badge>
                                  <Badge className="justify-start py-2 px-3">KPMG</Badge>
                                </>
                              )}
                              {selectedCourse.field === 'arts' && (
                                <>
                                  <Badge className="justify-start py-2 px-3">Adobe</Badge>
                                  <Badge className="justify-start py-2 px-3">Google Design</Badge>
                                  <Badge className="justify-start py-2 px-3">Microsoft Design</Badge>
                                  <Badge className="justify-start py-2 px-3">Designit</Badge>
                                  <Badge className="justify-start py-2 px-3">Ogilvy</Badge>
                                  <Badge className="justify-start py-2 px-3">IDEO</Badge>
                                </>
                              )}
                              {selectedCourse.field === 'science' && (
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
                        <Card className="bg-muted/30 border-primary/10">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Entry Level:</span>
                                  {selectedCourse.field === 'engineering' && <span className="font-medium">₹4.5 - 8 LPA</span>}
                                  {selectedCourse.field === 'medicine' && <span className="font-medium">₹5 - 12 LPA</span>}
                                  {selectedCourse.field === 'business' && <span className="font-medium">₹5 - 10 LPA</span>}
                                  {selectedCourse.field === 'arts' && <span className="font-medium">₹3 - 6 LPA</span>}
                                  {selectedCourse.field === 'science' && <span className="font-medium">₹4 - 7 LPA</span>}
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full mt-1">
                                  <div className="h-full bg-primary rounded-full" style={{ width: '30%' }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Mid Level (3-5 years):</span>
                                  {selectedCourse.field === 'engineering' && <span className="font-medium">₹10 - 18 LPA</span>}
                                  {selectedCourse.field === 'medicine' && <span className="font-medium">₹15 - 25 LPA</span>}
                                  {selectedCourse.field === 'business' && <span className="font-medium">₹12 - 25 LPA</span>}
                                  {selectedCourse.field === 'arts' && <span className="font-medium">₹8 - 15 LPA</span>}
                                  {selectedCourse.field === 'science' && <span className="font-medium">₹8 - 15 LPA</span>}
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full mt-1">
                                  <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Senior Level (8+ years):</span>
                                  {selectedCourse.field === 'engineering' && <span className="font-medium">₹25 - 40+ LPA</span>}
                                  {selectedCourse.field === 'medicine' && <span className="font-medium">₹30 - 60+ LPA</span>}
                                  {selectedCourse.field === 'business' && <span className="font-medium">₹30 - 50+ LPA</span>}
                                  {selectedCourse.field === 'arts' && <span className="font-medium">₹20 - 35+ LPA</span>}
                                  {selectedCourse.field === 'science' && <span className="font-medium">₹18 - 40+ LPA</span>}
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
                      {selectedCourse.topColleges.map((college, index) => (
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
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CoursesPage;
