import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, Building, GraduationCap, Award, Users, Briefcase, FileText } from 'lucide-react';
import { coursesData, College } from '@/data/coursesData';
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedTransition from '@/components/AnimatedTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesModal from '@/components/CoursesModal';

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [modalType, setModalType] = useState<'courses' | 'colleges'>('colleges');

  const allColleges = coursesData.flatMap(course => course.topColleges);
  
  const uniqueColleges = allColleges.filter((college, index, self) =>
    index === self.findIndex((c) => c.name === college.name)
  );
  
  const uniqueLocations = [...new Set(
    uniqueColleges
      .filter(college => college.location.includes('India'))
      .map(college => college.location)
  )];
  
  const uniqueStates = [...new Set(
    uniqueColleges
      .filter(college => college.location.includes('India'))
      .map(college => {
        const parts = college.location.split(',');
        return parts.length > 1 ? parts[1].trim() : '';
      })
      .filter(state => state !== '')
  )];
  
  const uniqueDistricts = [...new Set(
    uniqueColleges
      .filter(college => {
        if (!college.location.includes('India')) return false;
        if (stateFilter === 'all') return true;
        
        const parts = college.location.split(',');
        return parts.length > 1 && parts[1].trim() === stateFilter;
      })
      .map(college => {
        const parts = college.location.split(',');
        return parts.length > 0 ? parts[0].trim() : '';
      })
      .filter(district => district !== '')
  )];
  
  const filteredColleges = uniqueColleges.filter(college => {
    const matchesSearch = searchTerm === '' || 
      college.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const locationParts = college.location.split(',').map(part => part.trim());
    const district = locationParts[0] || '';
    const state = locationParts.length > 1 ? locationParts[1] : '';
    
    const matchesLocation = locationFilter === 'all' || college.location === locationFilter;
    const matchesState = stateFilter === 'all' || state === stateFilter;
    const matchesDistrict = districtFilter === 'all' || district === districtFilter;
    const isInIndia = college.location.includes('India');
    
    return matchesSearch && (matchesLocation || (matchesState && matchesDistrict)) && isInIndia;
  });

  const getCoursesForCollege = (collegeName: string) => {
    return coursesData.filter(course => 
      course.topColleges.some(college => college.name === collegeName)
    );
  };

  const getPlacementDetails = (collegeName: string) => {
    return {
      averageSalary: "₹8.5 LPA",
      highestSalary: "₹42 LPA",
      placementRate: "92%",
      topRecruiters: ["Microsoft", "Google", "Amazon", "TCS", "Infosys", "Wipro"],
      trendChart: {
        years: ["2019", "2020", "2021", "2022", "2023"],
        placements: [85, 88, 90, 91, 92]
      }
    };
  };

  const getCollegeAchievements = (collegeName: string) => {
    return [
      "Ranked #1 in Engineering by NIRF 2023",
      "Awarded 'Institution of Excellence' by UGC",
      "Research collaboration with MIT and Stanford",
      "Established Center for Innovation and Entrepreneurship",
      "3 patents granted in the last year",
      "Winner of Smart India Hackathon 2022"
    ];
  };

  const getNotableAlumni = (collegeName: string) => {
    return [
      {
        name: "Sundar Pichai",
        position: "CEO of Google",
        batch: "1993"
      },
      {
        name: "Satya Nadella",
        position: "CEO of Microsoft",
        batch: "1988"
      },
      {
        name: "N. R. Narayana Murthy",
        position: "Co-founder of Infosys",
        batch: "1969"
      },
      {
        name: "Nandan Nilekani",
        position: "Co-founder of Infosys",
        batch: "1978"
      }
    ];
  };

  const handleViewDetails = (college: College) => {
    setSelectedCollege(college);
    setActiveTab("overview");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <h1 className="text-3xl font-bold mb-8 text-gradient">Top Colleges in India</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-xl">Filters</CardTitle>
                  <CardDescription>Refine your college search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search colleges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 glass-input"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Select
                      value={stateFilter}
                      onValueChange={(value) => {
                        setStateFilter(value);
                        setDistrictFilter('all');
                      }}
                    >
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        {uniqueStates.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">District</label>
                    <Select
                      value={districtFilter}
                      onValueChange={setDistrictFilter}
                      disabled={stateFilter === 'all'}
                    >
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder={stateFilter === 'all' ? "Select state first" : "Select district"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Districts</SelectItem>
                        {uniqueDistricts.map((district) => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location in India</label>
                    <Select
                      value={locationFilter}
                      onValueChange={(value) => {
                        setLocationFilter(value);
                        if (value !== 'all') {
                          setStateFilter('all');
                          setDistrictFilter('all');
                        }
                      }}
                    >
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {uniqueLocations.map((location) => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSearchTerm('');
                      setLocationFilter('all');
                      setStateFilter('all');
                      setDistrictFilter('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Results ({filteredColleges.length})</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredColleges.length === 0 ? (
                  <div className="col-span-full bg-muted rounded-lg p-8 text-center">
                    <Building className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No colleges found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setLocationFilter('all');
                        setStateFilter('all');
                        setDistrictFilter('all');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  filteredColleges.map((college, index) => (
                    <Card key={index} className="h-full cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {college.location.includes(',') ? college.location.split(',')[0] : college.location}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{college.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {college.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Ranking:</span>
                            <span className="font-medium">{college.ranking}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          size="sm" 
                          className="w-full" 
                          variant="outline"
                          onClick={() => handleViewDetails(college)}
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
          
          {selectedCollege && (
            <Card className="mt-6 glass-panel">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedCollege.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedCollege.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {selectedCollege.ranking}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-5 mb-6">
                    <TabsTrigger value="overview" className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      <span className="hidden sm:inline">Courses</span>
                    </TabsTrigger>
                    <TabsTrigger value="placements" className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span className="hidden sm:inline">Placements</span>
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span className="hidden sm:inline">Achievements</span>
                    </TabsTrigger>
                    <TabsTrigger value="alumni" className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span className="hidden sm:inline">Alumni</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary" />
                          College Features
                        </h3>
                        <ul className="space-y-1">
                          {selectedCollege.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          Quick Overview
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Established</span>
                            <span className="font-medium">1954</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Campus Size</span>
                            <span className="font-medium">325 acres</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Student Population</span>
                            <span className="font-medium">10,500+</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Faculty</span>
                            <span className="font-medium">850+</span>
                          </div>
                          <div className="flex justify-between py-1 border-b">
                            <span className="text-muted-foreground">Acceptance Rate</span>
                            <span className="font-medium">8.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="courses" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        Available Courses
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setModalType('courses');
                          setShowCoursesModal(true);
                        }}
                      >
                        View All Courses
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getCoursesForCollege(selectedCollege.name).map((course, index) => (
                        <Card key={index} className="border border-muted">
                          <CardHeader className="pb-2">
                            <Badge className="w-fit mb-2" variant="outline">
                              {course.level}
                            </Badge>
                            <CardTitle className="text-lg">{course.name}</CardTitle>
                            <CardDescription>
                              {course.duration} • {course.field}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <p className="line-clamp-2">{course.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" size="sm" className="w-full">View Details</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="placements" className="space-y-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Placement Statistics
                    </h3>
                    
                    {(() => {
                      const placementData = getPlacementDetails(selectedCollege.name);
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-primary/5 border-primary/20">
                            <CardHeader className="pb-2">
                              <CardDescription>Average Package</CardDescription>
                              <CardTitle className="text-2xl">{placementData.averageSalary}</CardTitle>
                            </CardHeader>
                          </Card>
                          <Card className="bg-primary/5 border-primary/20">
                            <CardHeader className="pb-2">
                              <CardDescription>Highest Package</CardDescription>
                              <CardTitle className="text-2xl">{placementData.highestSalary}</CardTitle>
                            </CardHeader>
                          </Card>
                          <Card className="bg-primary/5 border-primary/20">
                            <CardHeader className="pb-2">
                              <CardDescription>Placement Rate</CardDescription>
                              <CardTitle className="text-2xl">{placementData.placementRate}</CardTitle>
                            </CardHeader>
                          </Card>
                        </div>
                      );
                    })()}
                    
                    <div>
                      <h4 className="text-md font-semibold mb-3">Top Recruiters</h4>
                      <div className="flex flex-wrap gap-2">
                        {getPlacementDetails(selectedCollege.name).topRecruiters.map((company, index) => (
                          <Badge key={index} variant="secondary">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="achievements" className="space-y-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      College Achievements
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getCollegeAchievements(selectedCollege.name).map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                          <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <p>{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alumni" className="space-y-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Notable Alumni
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getNotableAlumni(selectedCollege.name).map((alumni, index) => (
                        <Card key={index} className="border border-muted">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{alumni.name}</CardTitle>
                            <CardDescription>{alumni.position}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Batch of {alumni.batch}</span>
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
      
      <CoursesModal 
        isOpen={showCoursesModal} 
        onClose={() => setShowCoursesModal(false)} 
        type={modalType} 
      />
    </div>
  );
};

export default CollegesPage;
