
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  educationLevel: string;
  currentInstitution: string;
  state: string;
  city: string;
  interests: string;
  careerGoals: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (data: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const loggedIn = localStorage.getItem('userLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    
    if (loggedIn === 'true' && storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const login = (data: UserData) => {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(data));
    setIsLoggedIn(true);
    setUserData(data);
  };

  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
