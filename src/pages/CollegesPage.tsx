
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, Building, GraduationCap } from 'lucide-react';
import { coursesData, College } from '@/data/coursesData';
import { ScrollArea } from "@/components/ui/scroll-area";
import AnimatedTransition from '@/components/AnimatedTransition';

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  // Extract all colleges from all courses
  const allColleges = coursesData.flatMap(course => course.topColleges);
  
  // Remove duplicates based on name
  const uniqueColleges = allColleges.filter((college, index, self) =>
    index === self.findIndex((c) => c.name === college.name)
  );
  
  // Extract unique locations in India
  const uniqueLocations = [...new Set(
    uniqueColleges
      .filter(college => college.location.includes('India'))
      .map(college => college.location)
  )];
  
  // Extract states from location (assume format: District, State, India)
  const uniqueStates = [...new Set(
    uniqueColleges
      .filter(college => college.location.includes('India'))
      .map(college => {
        const parts = college.location.split(',');
        return parts.length > 1 ? parts[1].trim() : '';
      })
      .filter(state => state !== '')
  )];
  
  // Extract districts filtered by selected state
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
  
  // Filter colleges based on user selections
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

  // Find courses for a specific college
  const getCoursesForCollege = (collegeName: string) => {
    return coursesData.filter(course => 
      course.topColleges.some(college => college.name === collegeName)
    );
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
                        setDistrictFilter('all'); // Reset district when state changes
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
                          // Reset state and district when specific location is selected
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
                    <Card key={index} className="h-full cursor-pointer hover:border-primary transition-colors" onClick={() => setSelectedCollege(college)}>
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
                        <Button size="sm" className="w-full" variant="outline">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {selectedCollege && (
            <Card className="mt-6">
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
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Available Courses
                    </h3>
                    <ul className="space-y-1">
                      {getCoursesForCollege(selectedCollege.name).map((course, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span>{course.name}</span>
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

export default CollegesPage;
