import axios from 'axios';

// Use the deployed API URL in production, fallback to localhost in development
const API_URL = import.meta.env.VITE_API_URL || 'https://contact-flow-backend.onrender.com/api';
const CONTACTS_URL = `${API_URL}/contacts`;

// Transform form data to match the API model structure
const transformFormData = (formData) => {
  const {
    name, email, phone, street, city, state, zipCode, country,
    company, jobTitle, category, notes, favorite
  } = formData;

  return {
    name,
    email,
    phone,
    address: {
      street: street || '',
      city: city || '',
      state: state || '',
      zipCode: zipCode || '',
      country: country || '',
    },
    company: company || '',
    jobTitle: jobTitle || '',
    category,
    notes: notes || '',
    favorite: favorite || false,
  };
};

// Get all contacts
export const getContacts = async () => {
  try {
    const response = await axios.get(CONTACTS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Get a single contact by ID
export const getContactById = async (id) => {
  try {
    const response = await axios.get(`${CONTACTS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching contact with id ${id}:`, error);
    throw error;
  }
};

// Create a new contact
export const createContact = async (contactData) => {
  try {
    const transformedData = transformFormData(contactData);
    const response = await axios.post(CONTACTS_URL, transformedData);
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

// Update a contact
export const updateContact = async (id, contactData) => {
  try {
    const transformedData = transformFormData(contactData);
    const response = await axios.put(`${CONTACTS_URL}/${id}`, transformedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating contact with id ${id}:`, error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    await axios.delete(`${CONTACTS_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting contact with id ${id}:`, error);
    throw error;
  }
};

// Search contacts
export const searchContacts = async (query) => {
  try {
    const response = await axios.get(`${CONTACTS_URL}/search/${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching contacts with query ${query}:`, error);
    throw error;
  }
};

// Filter contacts by category
export const filterContactsByCategory = async (category) => {
  try {
    const response = await axios.get(`${CONTACTS_URL}/filter/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error filtering contacts by category ${category}:`, error);
    throw error;
  }
}; 
