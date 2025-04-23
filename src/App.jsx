import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Contacts } from './pages/Contacts.jsx';
import { ContactDetails } from './pages/ContactDetails.jsx';
import { AddContact } from './pages/AddContact.jsx';
import { EditContact } from './pages/EditContact.jsx';
import { Layout } from './components/Layout.jsx';
import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-neutral-50 text-neutral-900 font-sans"
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/edit/:id" element={<EditContact />} />
        </Routes>
      </Layout>
    </motion.div>
  );
}

export default App; 