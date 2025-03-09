
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { GraduationCap, BookOpen, Building, BriefcaseIcon } from "lucide-react";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-4 px-6 flex items-center justify-between bg-background/60 backdrop-blur-md border-b", className)}>
      <Link to="/" className="flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">EduPath India</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          
          <Link 
            to="/courses" 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <BookOpen className="h-4 w-4" />
            Courses
          </Link>
          
          <Link 
            to="/colleges" 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <Building className="h-4 w-4" />
            Colleges
          </Link>
          
          <Link 
            to="/careers" 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <BriefcaseIcon className="h-4 w-4" />
            Careers
          </Link>
          
          <Link 
            to="/about" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
        
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
