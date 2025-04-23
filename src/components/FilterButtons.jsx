import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Briefcase, Activity } from 'lucide-react';

export const FilterButtons = ({
  activeCategory,
  onFilterChange,
  showFavorites,
  onToggleFavorites,
}) => {
  const categories = [
    { value: '', label: 'All', icon: <Activity className="h-4 w-4" /> },
    { value: 'Family', label: 'Family', icon: <Users className="h-4 w-4" /> },
    { value: 'Friend', label: 'Friends', icon: <Users className="h-4 w-4" /> },
    { value: 'Work', label: 'Work', icon: <Briefcase className="h-4 w-4" /> },
    { value: 'Other', label: 'Other', icon: <Activity className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <motion.button
          key={category.value}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(category.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1
            ${activeCategory === category.value
              ? 'bg-primary-100 text-primary-700 border border-primary-200'
              : 'bg-white text-neutral-600 border border-neutral-300 hover:bg-neutral-50'
            }`}
        >
          {category.icon}
          <span>{category.label}</span>
        </motion.button>
      ))}
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggleFavorites}
        className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1
          ${showFavorites
            ? 'bg-warning-100 text-warning-700 border border-warning-200'
            : 'bg-white text-neutral-600 border border-neutral-300 hover:bg-neutral-50'
          }`}
      >
        <Heart className={`h-4 w-4 ${showFavorites ? 'fill-warning-500' : ''}`} />
        <span>Favorites</span>
      </motion.button>
    </div>
  );
}; 