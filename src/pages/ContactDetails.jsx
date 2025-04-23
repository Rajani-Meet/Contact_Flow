import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getContactById, deleteContact } from '../services/apiService.js';
import { DeleteContactModal } from '../components/DeleteContactModal.jsx';
import { Phone, Mail, MapPin, Building2, Briefcase, Heart, Trash2, Pencil, ArrowLeft, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      console.error('Error fetching contact details:', error);
      toast.error('Failed to load contact details');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deleteContact(id);
      toast.success('Contact deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-lg font-medium text-neutral-900">Contact not found</h3>
        <p className="mt-2 text-neutral-500">The contact you're looking for doesn't exist or was deleted.</p>
        <div className="mt-6">
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contacts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Contacts
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-neutral-900">{contact.name}</h1>
                  {contact.favorite && (
                    <Heart className="h-5 w-5 text-warning-500 fill-warning-500" />
                  )}
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {contact.category && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(contact.category)}`}>
                      {contact.category}
                    </span>
                  )}
                  {contact.company && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                      {contact.company}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/contacts/edit/${id}`)}
                  className="inline-flex items-center px-3 py-1.5 border border-neutral-300 text-sm font-medium rounded-md bg-white text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </button>
                
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md bg-error-100 text-error-700 hover:bg-error-200 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Contact Information</h2>
                <dl className="space-y-4">
                  {contact.phone && (
                    <div className="flex items-start">
                      <dt className="flex-shrink-0 text-neutral-500">
                        <Phone className="h-5 w-5" />
                      </dt>
                      <dd className="ml-3">
                        <p className="text-neutral-900">{contact.phone}</p>
                        <a 
                          href={`tel:${contact.phone}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Call
                        </a>
                      </dd>
                    </div>
                  )}
                  
                  {contact.email && (
                    <div className="flex items-start">
                      <dt className="flex-shrink-0 text-neutral-500">
                        <Mail className="h-5 w-5" />
                      </dt>
                      <dd className="ml-3">
                        <p className="text-neutral-900 break-all">{contact.email}</p>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Send email
                        </a>
                      </dd>
                    </div>
                  )}
                  
                  {contact.address && (
                    Object.values(contact.address).some(value => value) && (
                      <div className="flex items-start">
                        <dt className="flex-shrink-0 text-neutral-500">
                          <MapPin className="h-5 w-5" />
                        </dt>
                        <dd className="ml-3">
                          <p className="text-neutral-900">
                            {contact.address.street && (
                              <span className="block">{contact.address.street}</span>
                            )}
                            {(contact.address.city || contact.address.state || contact.address.zipCode) && (
                              <span className="block">
                                {contact.address.city && contact.address.city}
                                {contact.address.city && contact.address.state && ', '}
                                {contact.address.state && contact.address.state}
                                {(contact.address.city || contact.address.state) && contact.address.zipCode && ' '}
                                {contact.address.zipCode && contact.address.zipCode}
                              </span>
                            )}
                            {contact.address.country && (
                              <span className="block">{contact.address.country}</span>
                            )}
                          </p>
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              [
                                contact.address.street,
                                contact.address.city,
                                contact.address.state,
                                contact.address.zipCode,
                                contact.address.country
                              ].filter(Boolean).join(', ')
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700"
                          >
                            View on map
                          </a>
                        </dd>
                      </div>
                    )
                  )}
                </dl>
              </section>
              
              <section>
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Professional Details</h2>
                <dl className="space-y-4">
                  {contact.company && (
                    <div className="flex items-start">
                      <dt className="flex-shrink-0 text-neutral-500">
                        <Building2 className="h-5 w-5" />
                      </dt>
                      <dd className="ml-3 text-neutral-900">
                        {contact.company}
                      </dd>
                    </div>
                  )}
                  
                  {contact.jobTitle && (
                    <div className="flex items-start">
                      <dt className="flex-shrink-0 text-neutral-500">
                        <Briefcase className="h-5 w-5" />
                      </dt>
                      <dd className="ml-3 text-neutral-900">
                        {contact.jobTitle}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            </div>
            
            {contact.notes && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">Notes</h2>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-neutral-700 whitespace-pre-wrap">{contact.notes}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      <DeleteContactModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        contactName={contact.name}
        isDeleting={isDeleting}
      />
    </>
  );
}; 