
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../lib/utils';

interface NavigationProps {
  navigationItems: Array<{
    id: string;
    icon: JSX.Element;
    target?: string;
  }>;
  activeSection: string;
  scrollToSection: (section: string) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
}

const Navigation = ({
  navigationItems,
  activeSection,
  scrollToSection,
  language,
  setLanguage,
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref } = useInView({
    threshold: 0,
    initialInView: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      ref={ref}
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled ? 'backdrop-blur-md shadow-lg bg-white bg-opacity-90' : 'shadow-md bg-white'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button - Shows on screens smaller than lg (1024px) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Shows on lg screens and larger (1024px+) */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.target || item.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300',
                  activeSection === (item.target || item.id)
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <div className="w-5 h-5">
                  {item.icon}
                </div>
                <span className="font-medium">
                  {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300',
              'bg-gradient-to-r from-green-600 to-green-700 text-white',
              'hover:from-green-500 hover:to-green-600',
              'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            )}
          >
            {language === 'en' ? 'বাংলা' : 'English'}
          </button>
        </div>

        {/* Mobile Menu - Shows on screens smaller than lg (1024px) */}
        {isMenuOpen && (
          <div className="lg:hidden overflow-hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.target || item.id);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300',
                    activeSection === (item.target || item.id)
                      ? 'bg-green-100 text-green-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <div className="w-6 h-6">
                    {item.icon}
                  </div>
                  <span className="font-medium">
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
