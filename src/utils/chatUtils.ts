
import { CourseLevel, SubjectArea } from '@/contexts/ChatContext';
import { coursesData } from '@/data/coursesData';

// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to find courses based on user's query and filters
export const findRelevantCourses = (
  query: string, 
  filter: { level: CourseLevel; subject: SubjectArea }
) => {
  let filteredCourses = [...coursesData];
  
  // Apply level filter
  if (filter.level !== 'all') {
    filteredCourses = filteredCourses.filter(course => 
      course.level === filter.level
    );
  }
  
  // Apply subject filter
  if (filter.subject !== 'all') {
    filteredCourses = filteredCourses.filter(course => 
      course.field === filter.subject
    );
  }
  
  // Apply text search if query is not empty
  if (query.trim()) {
    const searchTerms = query.toLowerCase().split(' ');
    filteredCourses = filteredCourses.filter(course => {
      const courseText = `${course.name} ${course.description} ${course.field} ${course.level}`.toLowerCase();
      return searchTerms.some(term => courseText.includes(term));
    });
  }
  
  return filteredCourses;
};

// Function to process the user message and generate a response
export const processMessage = (
  message: string,
  filter: { level: CourseLevel; subject: SubjectArea }
): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check if the message is asking about courses
  if (
    lowerMessage.includes('course') || 
    lowerMessage.includes('program') || 
    lowerMessage.includes('degree') ||
    lowerMessage.includes('study')
  ) {
    const courses = findRelevantCourses(message, filter);
    
    if (courses.length === 0) {
      return "I couldn't find any courses matching your criteria. Could you try a different search or be more specific about what you're looking for?";
    }
    
    // Limit to 3 courses for a concise response
    const displayCourses = courses.slice(0, 3);
    
    let response = "Here are some courses that might interest you:\n\n";
    
    displayCourses.forEach((course, index) => {
      response += `**${course.name}** (${course.level})\n`;
      response += `${course.description}\n`;
      response += `**Duration:** ${course.duration}\n`;
      response += `**Career Prospects:** ${course.careerProspects.join(', ')}\n`;
      
      if (index < displayCourses.length - 1) {
        response += "\n---\n\n";
      }
    });
    
    if (courses.length > 3) {
      response += "\n\nThere are more courses available. Would you like me to show you more options or refine your search?";
    }
    
    return response;
  }
  
  // Check if the message is asking about colleges
  if (
    lowerMessage.includes('college') || 
    lowerMessage.includes('university') || 
    lowerMessage.includes('institution') ||
    lowerMessage.includes('school')
  ) {
    // Find relevant courses first
    const courses = findRelevantCourses(message, filter);
    
    if (courses.length === 0) {
      return "I couldn't find any colleges matching your criteria. Could you try a different search or be more specific about what you're looking for?";
    }
    
    // Get a random course to recommend colleges for
    const selectedCourse = getRandomItem(courses);
    
    let response = `Here are some top colleges offering **${selectedCourse.name}**:\n\n`;
    
    selectedCourse.topColleges.slice(0, 3).forEach((college, index) => {
      response += `**${college.name}**\n`;
      response += `**Location:** ${college.location}\n`;
      response += `**Ranking:** ${college.ranking}\n`;
      response += `**Notable Features:** ${college.features.join(', ')}\n`;
      
      if (index < Math.min(selectedCourse.topColleges.length, 3) - 1) {
        response += "\n---\n\n";
      }
    });
    
    return response;
  }
  
  // Check if the message is asking about jobs or careers
  if (
    lowerMessage.includes('job') || 
    lowerMessage.includes('career') || 
    lowerMessage.includes('work') ||
    lowerMessage.includes('profession') ||
    lowerMessage.includes('salary') ||
    lowerMessage.includes('opportunity')
  ) {
    // Find relevant courses first
    const courses = findRelevantCourses(message, filter);
    
    if (courses.length === 0) {
      return "I couldn't find any career paths matching your criteria. Could you try a different search or be more specific about what you're looking for?";
    }
    
    // Get a random course to recommend careers for
    const selectedCourse = getRandomItem(courses);
    
    let response = `After completing **${selectedCourse.name}**, you could pursue these career paths:\n\n`;
    
    selectedCourse.careerProspects.forEach((career, index) => {
      response += `**${career}**\n`;
      
      // Generate a random salary range for demonstration purposes
      const baseSalary = 40000 + Math.floor(Math.random() * 60000);
      const maxSalary = baseSalary + 20000 + Math.floor(Math.random() * 40000);
      
      response += `**Salary Range:** $${baseSalary.toLocaleString()} - $${maxSalary.toLocaleString()} per year\n`;
      
      // Generate random growth rate
      const growthRate = 5 + Math.floor(Math.random() * 15);
      response += `**Industry Growth:** ${growthRate}% annually\n`;
      
      if (index < selectedCourse.careerProspects.length - 1) {
        response += "\n---\n\n";
      }
    });
    
    response += "\n\nWould you like more specific information about any of these career paths?";
    
    return response;
  }
  
  // General greeting or introduction
  if (
    lowerMessage.includes('hi') || 
    lowerMessage.includes('hello') || 
    lowerMessage.includes('hey') ||
    lowerMessage.includes('greetings') ||
    lowerMessage.includes('start')
  ) {
    return "Hello! I'm your AI Career Assistant. I can help you with:\n\n" +
      "1. Finding the right courses based on your interests\n" +
      "2. Discovering top colleges and universities\n" +
      "3. Exploring job opportunities and career paths\n" +
      "4. Understanding salary expectations and industry growth\n\n" +
      "What would you like to explore today? You can ask me about specific courses, colleges, or careers.";
  }
  
  // Default response
  return "I'm here to help with your education and career questions. You can ask me about courses, colleges, job opportunities, or salary expectations. What specific information are you looking for?";
};
