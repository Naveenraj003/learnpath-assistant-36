
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Building, Star } from 'lucide-react';
import { coursesData, College } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';
import CoursesModal from '@/components/CoursesModal';
import { useToast } from "@/hooks/use-toast";

// Define mock data for states and districts
const statesData = [
  { name: "Karnataka", districts: ["Bangalore", "Mysore", "Belgaum", "Mangalore"] },
  { name: "Tamil Nadu", districts: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
  { name: "Maharashtra", districts: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
  { name: "Delhi", districts: ["New Delhi", "North Delhi", "South Delhi", "East Delhi"] },
  { name: "Uttar Pradesh", districts: ["Lucknow", "Kanpur", "Agra", "Varanasi"] }
];

// College ratings (mock data)
const collegeRatings: Record<string, number> = {
  "Indian Institute of Technology (IIT), Delhi": 4.8,
  "Massachusetts Institute of Technology (MIT)": 4.9,
  "Stanford University": 4.9,
  "All India Institute of Medical Sciences (AIIMS)": 4.7,
  "Harvard Medical School": 4.8,
  "Johns Hopkins University School of Medicine": 4.8,
  "Indian Institute of Management (IIM), Ahmedabad": 4.7,
  "Harvard Business School": 4.9,
  "London School of Economics": 4.6,
  "Indian Institute of Technology (IIT), Bombay": 4.8,
  "Carnegie Mellon University": 4.7,
  "University of Oxford": 4.8,
  "AIIMS, New Delhi": 4.7,
  "Boston Children's Hospital (Harvard Medical School)": 4.8,
  "Great Ormond Street Hospital (UCL)": 4.6,
  "Indian Institute of Management (IIM), Bangalore": 4.7,
  "Stanford Graduate School of Business": 4.9,
  "INSEAD": 4.8,
  "National Institute of Design (NID)": 4.5,
  "Rhode Island School of Design (RISD)": 4.6,
  "Royal College of Art": 4.7,
  "Indian Institute of Science (IISc)": 4.7,
  "California Institute of Technology (Caltech)": 4.9,
  "University of Cambridge": 4.8
};

const CollegesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeTypeFilter, setCollegeTypeFilter] = useState('all');
  const [collegeStatusFilter, setCollegeStatusFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [modalType, setModalType] = useState<'courses' | 'colleges'>('colleges');
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  const allColleges = coursesData.flatMap(course => course.topColleges);
  
  const uniqueColleges = allColleges.filter((college, index, self) =>
    index === self.findIndex((c) => c.name === college.name)
  ).map(college => ({
    ...college,
    rating: collegeRatings[college.name] || (4 + Math.random())
  }));
  
  // Extract all unique fields as college types
  const uniqueCollegeTypes = [...new Set(coursesData.map(course => course.field))].sort();
  
  // College status types
  const collegeStatusTypes = ['government', 'private', 'autonomous', 'non-autonomous'];
  
  // Update available districts when state changes
  useEffect(() => {
    if (stateFilter === 'all') {
      setAvailableDistricts([]);
    } else {
      const districts = statesData.find(state => state.name === stateFilter)?.districts || [];
      setAvailableDistricts(districts);
      if (districtFilter !== 'all' && !districts.includes(districtFilter)) {
        setDistrictFilter('all');
      }
    }
  }, [stateFilter]);
  
  // Filter colleges based on all criteria
  const filteredColleges = uniqueColleges.filter(college => {
    const matchesSearch = searchTerm === '' || 
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // In a real application, colleges would have type and status properties
    // For this demo, we'll simulate by checking if the name includes certain keywords
    const matchesType = collegeTypeFilter === 'all' || 
      coursesData.some(course => 
        course.field === collegeTypeFilter && 
        course.topColleges.some(c => c.name === college.name)
      );
    
    const matchesStatus = collegeStatusFilter === 'all' || 
      (collegeStatusFilter === 'government' && college.name.includes('Institute')) || 
      (collegeStatusFilter === 'private' && !college.name.includes('Institute')) ||
      (collegeStatusFilter === 'autonomous' && (college.name.includes('University') || college.name.includes('Institute'))) ||
      (collegeStatusFilter === 'non-autonomous' && !college.name.includes('University') && !college.name.includes('Institute'));
    
    // For demo purposes, we'll match states based on college location containing the state name
    const matchesState = stateFilter === 'all' || 
      college.location.includes(stateFilter);
    
    // For demo purposes, we'll match districts if they appear in the college location
    const matchesDistrict = districtFilter === 'all' || 
      college.location.includes(districtFilter);
    
    return matchesSearch && matchesType && matchesStatus && matchesState && matchesDistrict;
  });

  // Generate star rating display (simplified version)
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-3 w-3 fill-primary text-primary" />
        ))}
        {hasHalfStar && <Star className="h-3 w-3 fill-primary text-primary opacity-50" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-3 w-3 text-muted-foreground" />
        ))}
        <span className="ml-1 text-xs">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleViewDetails = (college: College & { rating?: number }) => {
    toast({
      title: "Viewing college details",
      description: `Loading details for ${college.name}`,
      duration: 2000,
    });
    navigate(`/colleges/${encodeURIComponent(college.name)}`);
  };

  const handleFilterChange = (type: string, value: string) => {
    toast({
      description: `Filter updated: ${type} set to ${value === 'all' ? 'All' : value}`,
      duration: 1500,
    });
    
    if (type === 'type') {
      setCollegeTypeFilter(value);
    } else if (type === 'status') {
      setCollegeStatusFilter(value);
    } else if (type === 'state') {
      setStateFilter(value);
      setDistrictFilter('all'); // Reset district when state changes
    } else if (type === 'district') {
      setDistrictFilter(value);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <h1 className="text-3xl font-bold mb-8 text-gradient">Top Colleges</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card className="glass-panel hover:shadow-lg transition-all duration-300">
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
                        className="pl-10 glass-input active:scale-[0.99] focus:scale-[1.01] transition-all hover:border-primary/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">College Type</label>
                    <Select
                      value={collegeTypeFilter}
                      onValueChange={(value) => handleFilterChange('type', value)}
                    >
                      <SelectTrigger className="glass-input active:scale-[0.98] hover:shadow-md transition-all">
                        <SelectValue placeholder="Select college type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueCollegeTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">College Status</label>
                    <Select
                      value={collegeStatusFilter}
                      onValueChange={(value) => handleFilterChange('status', value)}
                    >
                      <SelectTrigger className="glass-input active:scale-[0.98] hover:shadow-md transition-all">
                        <SelectValue placeholder="Select college status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {collegeStatusTypes.map((status) => (
                          <SelectItem key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Select
                      value={stateFilter}
                      onValueChange={(value) => handleFilterChange('state', value)}
                    >
                      <SelectTrigger className="glass-input active:scale-[0.98] hover:shadow-md transition-all">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        {statesData.map((state) => (
                          <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {stateFilter !== 'all' && availableDistricts.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">District</label>
                      <Select
                        value={districtFilter}
                        onValueChange={(value) => handleFilterChange('district', value)}
                      >
                        <SelectTrigger className="glass-input active:scale-[0.98] hover:shadow-md transition-all">
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Districts</SelectItem>
                          {availableDistricts.map((district) => (
                            <SelectItem key={district} value={district}>{district}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-[0.97] transition-all"
                    onClick={() => {
                      setSearchTerm('');
                      setCollegeTypeFilter('all');
                      setCollegeStatusFilter('all');
                      setStateFilter('all');
                      setDistrictFilter('all');
                      toast({
                        description: "All filters reset",
                        duration: 1500,
                      });
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
                        setCollegeTypeFilter('all');
                        setCollegeStatusFilter('all');
                        setStateFilter('all');
                        setDistrictFilter('all');
                        toast({
                          description: "All filters reset",
                          duration: 1500,
                        });
                      }}
                      className="hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-[0.97] transition-all"
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  filteredColleges.map((college, index) => (
                    <Card key={index} className="h-full cursor-pointer hover:border-primary transition-colors hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {collegeTypeFilter !== 'all' ? collegeTypeFilter : 
                            coursesData.find(course => course.topColleges.some(c => c.name === college.name))?.field || 'General'}
                          </Badge>
                          <div className="ml-auto">
                            {renderStarRating(college.rating || 4.5)}
                          </div>
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
                          className="w-full hover:bg-primary/90 hover:shadow-md active:scale-[0.96] transition-all" 
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
