
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, BriefcaseIcon, Building } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import { ScrollArea } from "@/components/ui/scroll-area";
import { CourseLevel, SubjectArea } from '@/contexts/ChatContext';
import AnimatedTransition from '@/components/AnimatedTransition';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<CourseLevel>('all');
  const [fieldFilter, setFieldFilter] = useState<SubjectArea>('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
          <h1 className="text-3xl font-bold mb-8">Explore Courses in India</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Filters</CardTitle>
                  <CardDescription>Refine your course search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level</label>
                    <Select
                      value={levelFilter}
                      onValueChange={(value) => setLevelFilter(value as CourseLevel)}
                    >
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                    className="w-full"
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
                <h2 className="text-xl font-semibold">Results ({filteredCourses.length})</h2>
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
                    <Card key={course.id} className="h-full cursor-pointer hover:border-primary transition-colors" onClick={() => setSelectedCourse(course)}>
                      <CardHeader className="pb-2">
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
                        <Button size="sm" className="w-full" variant="outline">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {selectedCourse && (
            <Card className="mt-6">
              <CardHeader>
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
              <CardContent>
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
              </CardContent>
            </Card>
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CoursesPage;
