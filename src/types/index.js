// Contact type definition
export const Contact = {
  _id: String,
  name: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  company: String,
  jobTitle: String,
  category: ['Family', 'Friend', 'Work', 'Other'],
  notes: String,
  favorite: Boolean,
  createdAt: String,
  updatedAt: String,
};

// ContactFormData type definition
export const ContactFormData = {
  name: String,
  email: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  company: String,
  jobTitle: String,
  category: ['Family', 'Friend', 'Work', 'Other'],
  notes: String,
  favorite: Boolean,
}; 