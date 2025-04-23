import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Contact as ContactBook, Plus, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Contacts', icon: <ContactBook className="h-5 w-5" /> },
    { to: '/contacts/add', label: 'Add Contact', icon: <Plus className="h-5 w-5" /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <ContactBook className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">ContactFlow</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                      isActive 
                        ? 'text-primary-600 bg-primary-50 hover:bg-primary-100' 
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-100'
                    }`
                  }
                  end={item.to === '/'}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </NavLink>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out ${
                      isActive 
                        ? 'text-primary-600 bg-primary-50 hover:bg-primary-100' 
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-100'
                    }`
                  }
                  end={item.to === '/'}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </header>
      
      <main className="flex-grow px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      
      <footer className="bg-white shadow-sm mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} ContactFlow — Your Contact Management Solution
          </p>
        </div>
      </footer>
    </div>
  );
}; 