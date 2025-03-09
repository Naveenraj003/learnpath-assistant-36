
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Graduation, BookOpen, BriefcaseIcon } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Graduation className="w-7 h-7 text-primary" />
          <span className="font-semibold text-xl">EduPathfinder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" isActive={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/about" isActive={location.pathname === '/about'}>
            About
          </NavLink>
          <NavLink 
            to="/" 
            isActive={false} 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Courses
          </NavLink>
          <Button size="sm" className="ml-2">
            <BookOpen className="w-4 h-4 mr-2" /> Start Exploring
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b shadow-lg animate-slide-down">
          <nav className="flex flex-col p-6 gap-4">
            <MobileNavLink to="/" isActive={location.pathname === '/'}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" isActive={location.pathname === '/about'}>
              About
            </MobileNavLink>
            <MobileNavLink 
              to="/" 
              isActive={false}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
            >
              Courses
            </MobileNavLink>
            <Button className="mt-2 w-full">
              <BookOpen className="w-4 h-4 mr-2" /> Start Exploring
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      'relative font-medium transition-colors hover:text-primary subtle-underline',
      isActive ? 'text-primary after:w-full' : 'text-foreground/80'
    )}
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ to, isActive, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      'py-2 px-4 rounded-md font-medium transition-colors',
      isActive 
        ? 'bg-primary/10 text-primary' 
        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
    )}
  >
    {children}
  </Link>
);

export default Header;
