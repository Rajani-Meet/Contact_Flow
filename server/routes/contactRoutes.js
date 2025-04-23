import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Get a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error creating contact', error: error.message });
  }
});

// Update a contact
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contact', error: error.message });
  }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

// Search contacts
router.get('/search/:query', async (req, res) => {
  const { query } = req.params;
  try {
    const contacts = await Contact.find({ 
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { 'address.city': { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error searching contacts', error: error.message });
  }
});

// Filter contacts by category
router.get('/filter/category/:category', async (req, res) => {
  try {
    const contacts = await Contact.find({ category: req.params.category }).sort({ name: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering contacts', error: error.message });
  }
});

export default router;