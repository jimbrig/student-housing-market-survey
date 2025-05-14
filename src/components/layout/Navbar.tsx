import React from 'react';
import { Building, BarChart2, MapPin, GraduationCap, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onNavItemClick: (view: string) => void;
  activeView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavItemClick, activeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={18} /> },
    { id: 'properties', label: 'Properties', icon: <Building size={18} /> },
    { id: 'map', label: 'Map View', icon: <MapPin size={18} /> },
    { id: 'universities', label: 'Universities', icon: <GraduationCap size={18} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavItemClick = (view: string) => {
    onNavItemClick(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Building size={24} className="text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PropInsight</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? 'primary' : 'ghost'}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeView === item.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => handleNavItemClick(item.id)}
                  icon={item.icon}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              className="p-2"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? 'primary' : 'ghost'}
                className={`w-full flex items-center px-3 py-2 text-base font-medium ${
                  activeView === item.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => handleNavItemClick(item.id)}
                icon={item.icon}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};