import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

export const DeleteContactModal = ({
  contactName,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div 
          className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-6 max-w-md mx-auto z-10 shadow-xl overflow-hidden transform w-full"
        >
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-500 focus:outline-none p-1 rounded-full hover:bg-neutral-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-error-100">
              <AlertTriangle className="h-6 w-6 text-error-600" />
            </div>
            
            <h3 className="mt-4 text-lg font-medium text-neutral-900">Delete Contact</h3>
            
            <div className="mt-2">
              <p className="text-sm text-neutral-500">
                Are you sure you want to delete <span className="font-medium">{contactName}</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="mt-6 flex justify-center space-x-3 w-full">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="rounded-md border border-neutral-300 bg-white py-2 px-4 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className={`rounded-md bg-error-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-error-600 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 ${
                  isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 