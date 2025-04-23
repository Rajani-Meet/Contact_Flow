import React from 'react';
import { createContact } from '../services/apiService.js';
import { ContactForm } from '../components/ContactForm.jsx';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AddContact = () => {
  const handleSubmit = async (data) => {
    try {
      await createContact(data);
      toast.success('Contact added successfully');
    } catch (error) {
      console.error('Error creating contact:', error);
      toast.error('Failed to add contact');
      throw error; // Re-throw to let the form component handle the error state
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          to="/"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Contacts
        </Link>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Add New Contact</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Fill in the information below to create a new contact.
        </p>
      </div>
      
      <ContactForm 
        onSubmit={handleSubmit} 
        submitButtonText="Create Contact"
      />
    </div>
  );
}; 