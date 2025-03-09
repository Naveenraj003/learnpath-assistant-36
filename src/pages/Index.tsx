import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, GraduationCap, BookOpen, Building, BriefcaseIcon, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import AnimatedTransition from '@/components/AnimatedTransition';
import ChatInterface from '@/components/ChatInterface';
import CourseExplorer from '@/components/CourseExplorer';
import { ChatProvider, useChat } from '@/contexts/ChatContext';
import CoursesModal from '@/components/CoursesModal';

const HeroSection = () => {
  const { sendMessage } = useChat();
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 pt-24 pb-16 relative z-10">
        <AnimatedTransition className="flex flex-col justify-center">
          <div className="inline-flex items-center mb-6 px-3 py-1 bg-primary/10 text-primary rounded-full w-fit">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Guidance</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Find Your Perfect <span className="text-primary">Educational Path</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            Get personalized course recommendations, college insights, and career guidance to make informed decisions about your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="group" onClick={() => {
              const explorerSection = document.getElementById('explorer-section');
              explorerSection?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat 
              icon={<BookOpen className="h-5 w-5 text-primary" />} 
              value="300+" 
              label="Courses" 
              onClick={() => setIsCoursesModalOpen(true)}
            />
            <Stat icon={<Building className="h-5 w-5 text-primary" />} value="1000+" label="Colleges" />
            <Stat icon={<BriefcaseIcon className="h-5 w-5 text-primary" />} value="500+" label="Careers" />
            <Stat icon={<GraduationCap className="h-5 w-5 text-primary" />} value="24/7" label="Assistance" />
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition className="relative" showDelay={200}>
          <div className="relative lg:mt-12 h-[600px] z-10">
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <ChatInterface />
            </div>
          </div>
        </AnimatedTransition>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full"
          onClick={() => {
            const featuresSection = document.getElementById('features-section');
            featuresSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
      
      <CoursesModal 
        isOpen={isCoursesModalOpen} 
        onClose={() => setIsCoursesModalOpen(false)} 
      />
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features-section" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <AnimatedTransition>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How EduPathfinder Helps You</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform guides you through every step of your educational journey
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedTransition showDelay={100}>
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6 text-white" />}
              title="Course Discovery"
              description="Explore hundreds of courses across different fields and levels, with detailed information about curriculum, duration, and requirements."
            />
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={200}>
            <FeatureCard 
              icon={<Building className="h-6 w-6 text-white" />}
              title="College Insights"
              description="Get recommendations for top colleges based on your chosen course, with details on ranking, campus facilities, and admission criteria."
              variant="secondary"
            />
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={300}>
            <FeatureCard 
              icon={<BriefcaseIcon className="h-6 w-6 text-white" />}
              title="Career Guidance"
              description="Discover potential career paths, salary expectations, and industry growth trends to make informed decisions about your future."
              variant="tertiary"
            />
          </AnimatedTransition>
        </div>
      </div>
    </section>
  );
};

const ExplorerSection = () => {
  const { sendMessage } = useChat();
  
  const handleAskAboutCourse = (courseName: string) => {
    sendMessage(`Tell me about ${courseName}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <section id="explorer-section" className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <AnimatedTransition>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Educational Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse through courses, colleges, and careers to find your perfect match
            </p>
          </div>
        </AnimatedTransition>
        
        <CourseExplorer onAskAboutCourse={handleAskAboutCourse} />
      </div>
    </section>
  );
};

const CoursesSection = () => {
  return (
    <section id="courses-section" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <AnimatedTransition>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Course Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover trending educational paths across various disciplines
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedTransition showDelay={100}>
            <CategoryCard 
              icon={<div className="bg-blue-100 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>}
              title="Engineering & Technology"
              courses={["Computer Science", "Electrical Engineering", "Mechanical Engineering"]}
            />
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={150}>
            <CategoryCard 
              icon={<div className="bg-green-100 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>}
              title="Medicine & Healthcare"
              courses={["MBBS", "Nursing", "Pharmacy"]}
            />
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={200}>
            <CategoryCard 
              icon={<div className="bg-purple-100 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>}
              title="Business & Management"
              courses={["BBA", "MBA", "Finance"]}
            />
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={250}>
            <CategoryCard 
              icon={<div className="bg-orange-100 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>}
              title="Arts & Design"
              courses={["Fine Arts", "Graphic Design", "Fashion Design"]}
            />
          </AnimatedTransition>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="container mx-auto max-w-4xl text-center">
        <AnimatedTransition>
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Educational Path?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our AI assistant and start planning your future today.
          </p>
          <Button 
            size="lg" 
            className="group"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Start Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedTransition>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <ExplorerSection />
        <CoursesSection />
        <CTASection />
        
        <footer className="bg-white border-t py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-medium text-sm mb-4">Platform</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="hover:text-primary">Home</Link></li>
                  <li><Link to="/about" className="hover:text-primary">About</Link></li>
                  <li><a href="#features-section" className="hover:text-primary">Features</a></li>
                  <li><a href="#explorer-section" className="hover:text-primary">Explorer</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Blog</a></li>
                  <li><a href="#" className="hover:text-primary">Guides</a></li>
                  <li><a href="#" className="hover:text-primary">FAQ</a></li>
                  <li><a href="#" className="hover:text-primary">Help Center</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                  <li><a href="#" className="hover:text-primary">Twitter</a></li>
                  <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-primary">Instagram</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} EduPathfinder. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ChatProvider>
  );
};

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  onClick?: () => void;
}

const Stat: React.FC<StatProps> = ({ icon, value, label, onClick }) => (
  <div 
    className={`flex flex-col items-center bg-white p-3 rounded-lg shadow-sm border border-border/50 ${onClick ? 'cursor-pointer hover:bg-accent/30 hover:shadow-md transition-all' : ''}`}
    onClick={onClick}
    role={onClick ? "button" : undefined}
  >
    <div className="mb-2">{icon}</div>
    <div className="text-xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  variant = 'primary'
}) => {
  const getBgColor = () => {
    switch (variant) {
      case 'primary': return 'bg-blue-600';
      case 'secondary': return 'bg-indigo-600';
      case 'tertiary': return 'bg-violet-600';
      default: return 'bg-blue-600';
    }
  };
  
  return (
    <div className="group rounded-xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-border/50 bg-white">
      <div className={`p-6 ${getBgColor()}`}>
        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg w-fit mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  courses: string[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, courses }) => (
  <div className="card-hover rounded-xl border border-border/50 p-6 bg-white">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <ul className="space-y-2">
      {courses.map((course, index) => (
        <li key={index} className="flex items-center gap-2 text-muted-foreground text-sm">
          <div className="w-1 h-1 rounded-full bg-primary" />
          {course}
        </li>
      ))}
    </ul>
  </div>
);

export default Index;
