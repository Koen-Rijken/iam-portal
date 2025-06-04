import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface DemoDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  demo: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    demoUrl: string;
    icon?: React.ReactNode;
  } | null;
  onRunDemo: () => void;
  onUpdate: (demo: any) => void;
}

export const DemoDetailPopup: React.FC<DemoDetailPopupProps> = ({
  isOpen,
  onClose,
  demo,
  isAdmin,
  onRunDemo,
  onUpdate,
}) => {
  if (!isOpen || !demo) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDemo, setEditedDemo] = useState(demo);

  const handleQRCodeClick = () => {
    if (demo.demoUrl && demo.demoUrl !== '#') {
      window.open(demo.demoUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  const handleSave = () => {
    onUpdate(editedDemo);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Left side - Demo info */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={editedDemo.title}
                    onChange={(e) => setEditedDemo({ ...editedDemo, title: e.target.value })}
                    className="text-2xl font-bold"
                  />
                ) : (
                  <div className="flex items-center">
                    {demo.icon && <span className="mr-2 text-blue-600 dark:text-blue-400">{demo.icon}</span>}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {demo.title}
                    </h2>
                  </div>
                )}
              </div>
              {isAdmin && (
                <div className="ml-4">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button size="sm\" onClick={handleSave}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        setIsEditing(false);
                        setEditedDemo(demo);
                      }}>Cancel</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {(isEditing ? editedDemo.tags : demo.tags).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mb-6">
              <img 
                src={demo.imageUrl} 
                alt={demo.title} 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Overview</h3>
              {isEditing ? (
                <textarea
                  value={editedDemo.description}
                  onChange={(e) => setEditedDemo({ ...editedDemo, description: e.target.value })}
                  className="w-full h-32 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{demo.description}</p>
              )}
            </div>
          </div>
          
          {/* Right side - QR code and demo features */}
          <div className="md:w-1/2 bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-r-lg flex flex-col">
            {/* QR Code Section */}
            <div className="flex-1 flex flex-col items-center justify-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Scan to Access Demo
              </h3>
              <div 
                className={cn(
                  "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative max-w-xs w-full mx-auto",
                  demo.demoUrl !== '#' && "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                )}
                onClick={handleQRCodeClick}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg"></div>
                <div className="relative">
                  <svg height="200" width="200" viewBox="0 0 21 21" className="mx-auto">
                    <path fill="#FFFFFF" d="M0,0 h21v21H0z" shapeRendering="crispEdges"></path>
                    <path fill="#000000" d="M0 0h7v1H0zM14,0 h7v1H14zM0 1h1v1H0zM6 1h1v1H6zM8 1h1v1H8zM11 1h2v1H11zM14 1h1v1H14zM20,1 h1v1H20zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM11 2h1v1H11zM14 2h1v1H14zM16 2h3v1H16zM20,2 h1v1H20zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h3v1H8zM14 3h1v1H14zM16 3h3v1H16zM20,3 h1v1H20zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM10 4h1v1H10zM14 4h1v1H14zM16 4h3v1H16zM20,4 h1v1H20zM0 5h1v1H0zM6 5h1v1H6zM8 5h5v1H8zM14 5h1v1H14zM20,5 h1v1H20zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14,6 h7v1H14zM9 7h1v1H9zM11 7h1v1H11zM0 8h5v1H0zM6 8h4v1H6zM11 8h1v1H11zM13 8h1v1H13zM15 8h1v1H15zM17 8h1v1H17zM19 8h1v1H19zM0 9h1v1H0zM2 9h1v1H2zM5 9h1v1H5zM7 9h2v1H7zM15 9h2v1H15zM18,9 h3v1H18zM4 10h3v1H4zM8 10h2v1H8zM11 10h3v1H11zM17 10h1v1H17zM19 10h1v1H19zM1 11h1v1H1zM3 11h1v1H3zM9 11h2v1H9zM12 11h2v1H12zM17 11h3v1H17zM0 12h1v1H0zM2 12h1v1H2zM4 12h1v1H4zM6 12h1v1H6zM9 12h1v1H9zM11 12h4v1H11zM16 12h1v1H16zM19 12h1v1H19zM8 13h2v1H8zM11 13h1v1H11zM13 13h1v1H13zM15,13 h6v1H15zM0 14h7v1H0zM8 14h6v1H8zM15 14h1v1H15zM17 14h3v1H17zM0 15h1v1H0zM6 15h1v1H6zM11 15h3v1H11zM17 15h3v1H17zM0 16h1v1H0zM2 16h3v1H2zM6 16h1v1H6zM8 16h2v1H8zM11 16h1v1H11zM13 16h3v1H13zM17 16h1v1H17zM0 17h1v1H0zM2 17h3v1H2zM6 17h1v1H6zM8 17h3v1H8zM13 17h1v1H13zM16 17h1v1H16zM18 17h2v1H18zM0 18h1v1H0zM2 18h3v1H2zM6 18h1v1H6zM8 18h1v1H8zM10 18h1v1H10zM12 18h1v1H12zM15 18h1v1H15zM0 19h1v1H0zM6 19h1v1H6zM8 19h1v1H8zM12 19h2v1H12zM18 19h1v1H18zM0 20h7v1H0zM8 20h1v1H8zM10 20h1v1H10zM14 20h1v1H14zM16 20h1v1H16zM19 20h1v1H19z" shapeRendering="crispEdges"></path>
                  </svg>
                  <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                    <div className="h-1 w-full bg-blue-500/50 absolute top-0 animate-scan"></div>
                  </div>
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-600"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-600"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-600"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-600"></div>
                </div>
              </div>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
                {demo.demoUrl !== '#' ? (
                  <>Click or scan the QR code to access the demo</>
                ) : (
                  <>Use the I-AM Mobile App to scan and access the demo</>
                )}
              </p>
            </div>

            {/* Demo Features Section */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Demo Features
              </h3>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Explore the interface and features</li>
                <li>• Test different user scenarios</li>
                <li>• View sample data and workflows</li>
                <li>• Experience real-time updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};