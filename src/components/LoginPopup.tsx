import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  demoTitle: string;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  demoTitle
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const { startAuthentication, error, qrCodeData, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div ref={popupRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login to {demoTitle}</h2>

          {/* QR Code */}
          <div 
            className={cn(
              "mb-6 p-4 bg-white rounded-lg shadow-inner relative"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg"></div>
            <div className="relative">
              {qrCodeData ? (
                <img
                  src={`data:image/png;base64,${qrCodeData}`}
                  alt="Authentication QR Code"
                  className="w-48 h-48 mx-auto"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Loading QR Code...</span>
                </div>
              )}
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <div className="h-1 w-full bg-blue-500/50 absolute top-0 animate-scan"></div>
              </div>
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-600"></div>
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-600"></div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Scan the QR code with the I-AM mobile app to authenticate
          </p>

          <Button
            onClick={startAuthentication}
            className="mt-4"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Generate New QR Code'}
          </Button>

          {error && (
            <div className="w-full mt-4 p-3 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};