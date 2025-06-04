import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface DemoRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoRequestPopup: React.FC<DemoRequestPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.i-am.technology/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail('');
      }, 2000);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Request Demo Access</h2>

          {success ? (
            <div className="text-center">
              <div className="text-green-500 dark:text-green-400 mb-4">
                Request submitted successfully!
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Check your email for the QR code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {error && (
                <div className="text-red-500 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Request Access'}
              </Button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                You will receive a QR code via email to scan with the I-AM App.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};