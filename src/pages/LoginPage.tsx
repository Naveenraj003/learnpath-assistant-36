
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { GraduationCap, User, MapPin, BookOpen, Home } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';

const educationLevels = [
  "10th Standard",
  "12th Standard",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other"
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Delhi", "Other"
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    educationLevel: '',
    currentInstitution: '',
    state: '',
    city: '',
    interests: '',
    careerGoals: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.educationLevel) {
        toast.error("Please select your education level");
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user data to localStorage
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(formData));
    
    toast.success("Login successful! Welcome to Career Compass");
    
    // Redirect to home page
    navigate('/');
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </AnimatedTransition>
        );
        
      case 2:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="educationLevel">Highest Education Level Completed</Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value) => handleSelectChange('educationLevel', value)}
                >
                  <SelectTrigger id="educationLevel" className="w-full">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentInstitution">Current/Last Institution</Label>
                <Input
                  id="currentInstitution"
                  name="currentInstitution"
                  placeholder="Name of your institution"
                  value={formData.currentInstitution}
                  onChange={handleChange}
                />
              </div>
            </div>
          </AnimatedTransition>
        );
        
      case 3:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange('state', value)}
                >
                  <SelectTrigger id="state" className="w-full">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City/District</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Your city or district"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </AnimatedTransition>
        );
        
      case 4:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interests">Areas of Interest</Label>
                <Textarea
                  id="interests"
                  name="interests"
                  placeholder="E.g., Computer Science, Medicine, Business..."
                  value={formData.interests}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="careerGoals">Career Goals</Label>
                <Textarea
                  id="careerGoals"
                  name="careerGoals"
                  placeholder="What are your career aspirations?"
                  value={formData.careerGoals}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>
          </AnimatedTransition>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-md">
        <AnimatedTransition>
          <Card className="glass-panel">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                  {currentStep === 1 && <User className="h-8 w-8 text-primary" />}
                  {currentStep === 2 && <GraduationCap className="h-8 w-8 text-primary" />}
                  {currentStep === 3 && <MapPin className="h-8 w-8 text-primary" />}
                  {currentStep === 4 && <BookOpen className="h-8 w-8 text-primary" />}
                </div>
              </div>
              <CardTitle className="text-xl text-center">
                {currentStep === 1 && "Welcome to Career Compass"}
                {currentStep === 2 && "Educational Background"}
                {currentStep === 3 && "Your Location"}
                {currentStep === 4 && "Interests & Goals"}
              </CardTitle>
              <CardDescription className="text-center">
                {currentStep === 1 && "Let's get to know you better"}
                {currentStep === 2 && "Tell us about your education"}
                {currentStep === 3 && "Where are you located?"}
                {currentStep === 4 && "Help us personalize your experience"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                {renderForm()}
              </form>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${
                        currentStep === step
                          ? 'bg-primary'
                          : currentStep > step
                          ? 'bg-primary/50'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of 4
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handleBack} type="button">
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={() => navigate('/')} type="button">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button onClick={handleNext} type="button">
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} type="submit">
                  Complete
                </Button>
              )}
            </CardFooter>
          </Card>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default LoginPage;
