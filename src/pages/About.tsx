
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, BriefcaseIcon, Compass, Heart, Goal, GraduationCap, Building } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedTransition>
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">About EduPathfinder</Badge>
            <h1 className="text-4xl font-bold mb-4">Guiding Students Towards Their Ideal Future</h1>
            <p className="text-lg text-muted-foreground mb-8">
              EduPathfinder is an AI-powered educational guidance platform designed to help students make informed decisions about their academic and career paths.
            </p>
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 glass-panel">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower students with personalized guidance and comprehensive information, helping them navigate their educational journey with confidence.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-panel">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Our Values</h3>
                    <p className="text-muted-foreground">
                      We believe in accessible education, personalized learning paths, and data-driven guidance to help every student reach their full potential.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={200}>
            <h2 className="text-2xl font-bold mb-6">How We Help Students</h2>
            
            <div className="space-y-6 mb-12">
              <FeatureCard 
                icon={<BookOpen className="h-6 w-6 text-primary" />}
                title="Course Exploration"
                description="Discover undergraduate and postgraduate programs across various fields, with detailed information about duration, curriculum, and requirements."
              />
              
              <FeatureCard 
                icon={<Building className="h-6 w-6 text-primary" />}
                title="College Recommendations"
                description="Get personalized college recommendations based on your academic interests, location preferences, and career goals."
              />
              
              <FeatureCard 
                icon={<BriefcaseIcon className="h-6 w-6 text-primary" />}
                title="Career Insights"
                description="Explore potential career paths linked to different courses, including salary expectations, industry growth, and required skills."
              />
              
              <FeatureCard 
                icon={<GraduationCap className="h-6 w-6 text-primary" />}
                title="Personalized Guidance"
                description="Receive tailored advice that considers your academic background, interests, and career aspirations."
              />
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition showDelay={300}>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground mb-6">
                Our AI assistant is available 24/7 to answer your questions and guide you through your educational choices.
              </p>
              <Link to="/">
                <Button size="lg" className="animate-float">
                  Begin Exploring
                </Button>
              </Link>
            </div>
          </AnimatedTransition>
        </div>
      </main>
      
      <footer className="bg-white border-t py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduPathfinder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="p-6 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-md">
    <div className="flex items-start gap-4">
      <div className="bg-primary/10 p-3 rounded-md">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </Card>
);

export default About;
