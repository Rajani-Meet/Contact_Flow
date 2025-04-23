import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchBar = ({
  onSearch,
  placeholder = 'Search contacts...',
}) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsTyping(true);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    onSearch('');
  };

  // Debounce search to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search on debounced query change
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={`h-5 w-5 ${isTyping ? 'text-primary-500' : 'text-neutral-400'}`} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-md shadow-sm placeholder:text-neutral-400 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
      />
      
      {query && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <button 
            onClick={handleClear}
            className="text-neutral-400 hover:text-neutral-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}; 