import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Building2, Star, StarOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactCard = ({ contact, onToggleFavorite }) => {
  const { _id, name, email, phone, company, favorite, category } = contact;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Family':
        return 'bg-success-100 text-success-800';
      case 'Friend':
        return 'bg-accent-100 text-accent-800';
      case 'Work':
        return 'bg-secondary-100 text-secondary-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const categoryClass = getCategoryColor(category || 'Other');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 flex items-center space-x-2">
              <Link to={`/contacts/${_id}`} className="hover:text-primary-600 transition-colors">
                {name}
              </Link>
              {category && (
                <span className={`text-xs px-2 py-1 rounded-full ${categoryClass}`}>
                  {category}
                </span>
              )}
            </h3>
            {company && (
              <div className="flex items-center text-neutral-600 mt-1">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="text-sm">{company}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => _id && onToggleFavorite(_id, !favorite)}
            className="text-warning-500 hover:text-warning-600 transition-colors"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? (
              <Star className="h-5 w-5 fill-warning-500" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="mt-4 space-y-2">
          {email && (
            <div className="flex items-center text-neutral-500">
              <Mail className="h-4 w-4 mr-2 text-neutral-400" />
              <a 
                href={`mailto:${email}`} 
                className="text-sm hover:text-primary-600 transition-colors truncate"
              >
                {email}
              </a>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center text-neutral-500">
              <Phone className="h-4 w-4 mr-2 text-neutral-400" />
              <a 
                href={`tel:${phone}`} 
                className="text-sm hover:text-primary-600 transition-colors"
              >
                {phone}
              </a>
            </div>
          )}
        </div>
        
        <div className="mt-5 flex justify-end">
          <Link 
            to={`/contacts/${_id}`}
            className="text-sm text-primary-600 hover:text-primary-800 transition-colors font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}; 