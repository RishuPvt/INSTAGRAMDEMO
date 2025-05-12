import React from 'react';
import { Heart } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface NavbarProps {
  items: NavItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ items, activeSection, setActiveSection }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-500 fill-pink-500 mr-2" />
            <span className="font-bold text-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              Happy Birthday!
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="grid grid-cols-4 h-16">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center justify-center ${
                activeSection === item.id
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-pink-500'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;