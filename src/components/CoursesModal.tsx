
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { coursesData } from '@/data/coursesData';
import { BookOpen } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface CoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoursesModal: React.FC<CoursesModalProps> = ({ isOpen, onClose }) => {
  // Extract unique course names from coursesData
  const courses = coursesData.map(course => course.name);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Available Courses in India</span>
          </DialogTitle>
          <DialogDescription>
            Browse through our comprehensive list of courses available across Indian universities.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[300px] mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="p-2 border rounded-md hover:bg-accent transition-colors flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>{course}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoursesModal;
