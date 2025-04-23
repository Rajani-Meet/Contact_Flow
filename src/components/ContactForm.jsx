import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ContactForm = ({
  initialData,
  onSubmit,
  submitButtonText,
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    company: '',
    jobTitle: '',
    category: 'Other',
    notes: '',
    favorite: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        street: initialData.address?.street || '',
        city: initialData.address?.city || '',
        state: initialData.address?.state || '',
        zipCode: initialData.address?.zipCode || '',
        country: initialData.address?.country || '',
        company: initialData.company || '',
        jobTitle: initialData.jobTitle || '',
        category: initialData.category || 'Other',
        notes: initialData.notes || '',
        favorite: initialData.favorite || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save contact');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-lg p-6 max-w-3xl mx-auto"
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-neutral-900">Basic Information</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                Name <span className="text-error-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email <span className="text-error-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
                Phone <span className="text-error-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              >
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-neutral-900">Professional Information</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-neutral-700">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-neutral-700">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-neutral-900">Address</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="sm:col-span-2">
              <label htmlFor="street" className="block text-sm font-medium text-neutral-700">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-neutral-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-neutral-700">
                State / Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700">
                Zip / Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-neutral-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-neutral-900">Additional Information</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-neutral-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-20"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="favorite"
                name="favorite"
                checked={formData.favorite}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="favorite" className="ml-2 block text-sm text-neutral-700">
                Mark as favorite
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </motion.form>
  );
}; 