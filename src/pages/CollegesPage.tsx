
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Building } from 'lucide-react';
import { coursesData, College } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';
import CoursesModal from '@/components/CoursesModal';

const CollegesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
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

  const handleViewDetails = (college: College) => {
    navigate(`/colleges/${encodeURIComponent(college.name)}`);
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

