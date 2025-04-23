import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContacts, filterContactsByCategory } from '../services/apiService.js';
import { ContactList } from '../components/ContactList.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
import { FilterButtons } from '../components/FilterButtons.jsx';
import { UserPlus, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const data = await getContacts();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    // Apply filters (search, category, favorites)
    let result = contacts;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (contact.company && contact.company.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (activeCategory) {
      result = result.filter((contact) => contact.category === activeCategory);
    }

    // Apply favorites filter
    if (showFavorites) {
      result = result.filter((contact) => contact.favorite);
    }

    setFilteredContacts(result);
  }, [contacts, searchQuery, activeCategory, showFavorites]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = async (category) => {
    setActiveCategory(category);
  };

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-neutral-900"
        >
          Contacts
        </motion.h1>
        
        <Link
          to="/contacts/add"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Contact
        </Link>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchBar onSearch={handleSearch} />
        
        <div className="w-full sm:w-auto">
          <FilterButtons
            activeCategory={activeCategory}
            onFilterChange={handleCategoryChange}
            showFavorites={showFavorites}
            onToggleFavorites={handleToggleFavorites}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 animate-spin text-primary-500" />
        </div>
      ) : (
        <>
          {filteredContacts.length === 0 && !isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow p-8 text-center"
            >
              {searchQuery || activeCategory || showFavorites ? (
                <>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No contacts found</h3>
                  <p className="text-neutral-500 mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('');
                      setShowFavorites(false);
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No contacts yet</h3>
                  <p className="text-neutral-500 mb-4">Add your first contact to get started</p>
                  <Link
                    to="/contacts/add"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Link>
                </>
              )}
            </motion.div>
          ) : (
            <ContactList contacts={filteredContacts} onContactUpdated={fetchContacts} />
          )}
        </>
      )}
    </div>
  );
}; 