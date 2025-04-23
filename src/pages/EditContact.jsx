import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getContactById, updateContact } from '../services/apiService.js';
import { ContactForm } from '../components/ContactForm.jsx';
import toast from 'react-hot-toast';
import { ArrowLeft, Loader } from 'lucide-react';

export const EditContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchContact(id);
    }
  }, [id]);

  const fetchContact = async (contactId) => {
    try {
      setIsLoading(true);
      const data = await getContactById(contactId);
      setContact(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
      toast.error('Failed to load contact');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    if (!id) return;
    
    try {
      await updateContact(id, data);
      toast.success('Contact updated successfully');
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link 
          to={id ? `/contacts/${id}` : '/'}
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Contact
        </Link>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Edit Contact</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Update the contact information below.
        </p>
      </div>
      
      {contact && (
        <ContactForm 
          initialData={contact}
          onSubmit={handleSubmit} 
          submitButtonText="Update Contact"
          isEditing={true}
        />
      )}
    </div>
  );
}; 