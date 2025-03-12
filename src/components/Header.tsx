
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { 
  GraduationCap,
  Menu,
  X,
  BookOpen, 
  Building, 
  BriefcaseIcon,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/courses', label: 'Courses', icon: <BookOpen className="h-4 w-4" /> },
    { path: '/colleges', label: 'Colleges', icon: <Building className="h-4 w-4" /> },
    { path: '/careers', label: 'Careers', icon: <BriefcaseIcon className="h-4 w-4" /> },
    { path: '/about', label: 'About', icon: null }
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className={cn("w-full py-4 px-6 flex items-center justify-between bg-background/60 backdrop-blur-md border-b", className)}>
      <Link to="/" className="flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">Career Compass</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogin}
          className="hidden md:flex items-center gap-1"
        >
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Button>
        
        <ModeToggle />
        
        {/* Mobile navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-6 mt-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <Button 
                variant="outline"
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
