import React from 'react';
import { ContactCard } from './ContactCard.jsx';
import { updateContact } from '../services/apiService.js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const ContactList = ({ contacts, onContactUpdated }) => {
  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const contact = contacts.find(c => c._id === id);
      if (contact) {
        await updateContact(id, {
          ...contact,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          category: contact.category || 'Other',
          favorite: isFavorite,
          street: contact.address?.street,
          city: contact.address?.city,
          state: contact.address?.state,
          zipCode: contact.address?.zipCode,
          country: contact.address?.country,
          company: contact.company,
          jobTitle: contact.jobTitle,
          notes: contact.notes
        });
        onContactUpdated();
        toast.success(`${contact.name} ${isFavorite ? 'added to' : 'removed from'} favorites`);
      }
    } catch (error) {
      toast.error('Failed to update favorite status');
      console.error('Error toggling favorite:', error);
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-neutral-500">No contacts found</h3>
        <p className="mt-2 text-neutral-400">Add a new contact to get started</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      {contacts.map((contact) => (
        <ContactCard 
          key={contact._id} 
          contact={contact}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </motion.div>
  );
}; 