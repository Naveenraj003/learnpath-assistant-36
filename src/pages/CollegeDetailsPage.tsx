
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, GraduationCap, Users, Building, Award, Star, BriefcaseIcon } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';

// Define a simple cutoff structure without caste divisions
const courseCutoffs: Record<string, string> = {
  "cs-btech": "92.5%",
  "medicine-mbbs": "94.8%",
  "business-bba": "83.4%",
  "eng-mtech": "86.5%",
  "med-md": "94.0%",
  "biz-mba": "90.5%",
  "design-bdes": "87.5%",
  "science-bsc": "89.0%"
};

// Alumni data with photos
const alumniData = [
  {
    name: "Sundar Pichai",
    role: "CEO of Google",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/330px-Sundar_pichai.png"
  },
  {
    name: "Satya Nadella",
    role: "CEO of Microsoft",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Satya_Nadella_November_2015.jpg/330px-Satya_Nadella_November_2015.jpg"
  },
  {
    name: "N. R. Narayana Murthy",
    role: "Co-founder of Infosys",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/N_R_Narayana_Murthy.jpg/330px-N_R_Narayana_Murthy.jpg"
  },
  {
    name: "Nandan Nilekani",
    role: "Co-founder of Infosys",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Nandan_Nilekani.jpg/330px-Nandan_Nilekani.jpg"
  }
];

// Placement data for colleges
const placementData = {
  "Indian Institute of Technology (IIT), Delhi": {
    averagePackage: "₹18.5 LPA",
    highestPackage: "₹1.8 CPA",
    placementRate: "95%",
    topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Adobe"]
  },
  "All India Institute of Medical Sciences (AIIMS)": {
    averagePackage: "₹12.5 LPA",
    highestPackage: "₹24 LPA",
    placementRate: "98%",
    topRecruiters: ["Apollo Hospitals", "Fortis", "Max Healthcare", "Medanta", "Manipal Hospitals"]
  },
  "Indian Institute of Management (IIM), Ahmedabad": {
    averagePackage: "₹25.5 LPA",
    highestPackage: "₹1.2 CPA",
    placementRate: "99%",
    topRecruiters: ["McKinsey", "Boston Consulting Group", "Bain & Company", "Amazon", "Microsoft"]
  },
  "National Institute of Design (NID)": {
    averagePackage: "₹8.5 LPA",
    highestPackage: "₹18 LPA",
    placementRate: "92%",
    topRecruiters: ["Apple", "Samsung", "Google", "Microsoft", "Tata Elxsi"]
  }
};

// Default placement data if specific college not found
const defaultPlacementData = {
  averagePackage: "₹10-15 LPA",
  highestPackage: "₹50+ LPA",
  placementRate: "90%",
  topRecruiters: ["Top Tech Companies", "Consulting Firms", "Research Institutions", "Fortune 500 Companies"]
};

const CollegeDetailsPage = () => {
  const { collegeName } = useParams();
  const navigate = useNavigate();
  const [collegeDetails, setCollegeDetails] = useState<{
    name: string;
    location: string;
    ranking: string;
    features: string[];
    rating?: number;
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
          setCollegeDetails({
            ...college,
            // Add random rating between 4.0 and 5.0
            rating: Math.round((4 + Math.random()) * 10) / 10
          });
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

  // Get placement data for this college or use default
  const collegeplacementData = placementData[collegeDetails.name] || defaultPlacementData;

  // Generate star rating display
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-primary text-primary" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-5 w-5 fill-primary text-primary opacity-50" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground" />);
    }
    
    return stars;
  };

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
                  <div className="flex items-center mt-2">
                    {collegeDetails.rating && renderStarRating(collegeDetails.rating)}
                    <span className="ml-2 text-sm font-medium">{collegeDetails.rating}</span>
                  </div>
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
              <TabsTrigger value="placement">Placement</TabsTrigger>
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
                    <Award className="h-4 w-4 text-primary" />
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
                          <p className="font-semibold">{collegeplacementData.placementRate}</p>
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
                          <h4 className="text-sm font-medium mb-2">Minimum Required Cutoff:</h4>
                          <div className="text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Minimum Score:</span>
                              <span className="font-medium">{courseCutoffs[course.id] || "85%+"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full" 
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        View Course Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="placement" className="mt-0">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4 text-primary" />
                Placement Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>Placement Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Average Package:</span>
                        <span className="font-medium">{collegeplacementData.averagePackage}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Highest Package:</span>
                        <span className="font-medium">{collegeplacementData.highestPackage}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Placement Rate:</span>
                        <span className="font-medium">{collegeplacementData.placementRate}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border border-muted hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>Top Recruiters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {collegeplacementData.topRecruiters.map((recruiter, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {recruiter}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="alumni" className="mt-0">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Notable Alumni
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {alumniData.map((alumni, index) => (
                  <Card key={index} className="border border-muted hover:shadow-md transition-all">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={alumni.photo} 
                        alt={alumni.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2 pt-3">
                      <CardTitle className="text-base">{alumni.name}</CardTitle>
                      <CardDescription className="text-xs">{alumni.role}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CollegeDetailsPage;
