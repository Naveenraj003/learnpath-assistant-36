
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { GraduationCap, User, MapPin, Home } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useAuth } from '@/contexts/AuthContext';

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
  const { login, isLoggedIn } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    educationLevel: '',
    currentInstitution: '',
    state: '',
    city: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    educationLevel: '',
    state: '',
  });

  useEffect(() => {
    // Redirect if already logged in
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is selected
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step: number) => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        valid = false;
      }
    } 
    else if (step === 2) {
      if (!formData.educationLevel) {
        newErrors.educationLevel = 'Education level is required';
        valid = false;
      }
    }
    else if (step === 3) {
      if (!formData.state) {
        newErrors.state = 'State is required';
        valid = false;
      }
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.error("Please fix the errors before continuing");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.name || !formData.email || !formData.educationLevel || !formData.state) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Call the login function from AuthContext and check its return value
    const loginSuccess = login(formData);
    
    if (loginSuccess) {
      toast.success("Login successful! Welcome to Career Compass");
      // Redirect to home page
      navigate('/');
    } else {
      toast.error("Login failed. Please check your information.");
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center">
                  Full Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`hover:shadow-md focus:shadow-md active:scale-[1.01] transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center">
                  Email Address <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`hover:shadow-md focus:shadow-md active:scale-[1.01] transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </AnimatedTransition>
        );
        
      case 2:
        return (
          <AnimatedTransition>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="educationLevel" className="flex items-center">
                  Highest Education Level Completed <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  value={formData.educationLevel}
                  onValueChange={(value) => handleSelectChange('educationLevel', value)}
                >
                  <SelectTrigger 
                    id="educationLevel" 
                    className={`w-full hover:shadow-md active:scale-[1.01] transition-all ${errors.educationLevel ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem 
                        key={level} 
                        value={level}
                        className="hover:bg-primary/10 cursor-pointer transition-colors"
                      >
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentInstitution">Current/Last Institution</Label>
                <Input
                  id="currentInstitution"
                  name="currentInstitution"
                  placeholder="Name of your institution"
                  value={formData.currentInstitution}
                  onChange={handleChange}
                  className="hover:shadow-md focus:shadow-md active:scale-[1.01] transition-all"
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
                <Label htmlFor="state" className="flex items-center">
                  State <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange('state', value)}
                >
                  <SelectTrigger 
                    id="state" 
                    className={`w-full hover:shadow-md active:scale-[1.01] transition-all ${errors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem 
                        key={state} 
                        value={state}
                        className="hover:bg-primary/10 cursor-pointer transition-colors"
                      >
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City/District</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Your city or district"
                  value={formData.city}
                  onChange={handleChange}
                  className="hover:shadow-md focus:shadow-md active:scale-[1.01] transition-all"
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
          <Card className="glass-panel hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                  {currentStep === 1 && <User className="h-8 w-8 text-primary" />}
                  {currentStep === 2 && <GraduationCap className="h-8 w-8 text-primary" />}
                  {currentStep === 3 && <MapPin className="h-8 w-8 text-primary" />}
                </div>
              </div>
              <CardTitle className="text-xl text-center">
                {currentStep === 1 && "Welcome to Career Compass"}
                {currentStep === 2 && "Educational Background"}
                {currentStep === 3 && "Your Location"}
              </CardTitle>
              <CardDescription className="text-center">
                {currentStep === 1 && "Let's get to know you better"}
                {currentStep === 2 && "Tell us about your education"}
                {currentStep === 3 && "Where are you located?"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                {renderForm()}
              </form>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-1">
                  {[1, 2, 3].map((step) => (
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
                  Step {currentStep} of 3
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={handleBack} 
                  type="button"
                  className="hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95 transition-all"
                >
                  Back
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  type="button"
                  className="hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95 transition-all"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button 
                  onClick={handleNext} 
                  type="button"
                  className="hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  type="submit"
                  className="hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all"
                >
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
