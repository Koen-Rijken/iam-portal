import React, { useState } from 'react';
import { Search, Book, Code, Server, Database, Filter, X, Building, HardHat, Scale, Heart, FileText } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';
import { DemoRequestPopup } from '../components/DemoRequestPopup';

export const DemosPage: React.FC = () => {
  const demos = [
    // 1. Secure Document Sharing
    {
      id: 1,
      title: 'Your First I-AM Authentication',
      description: "Experience a true passwordless authentication process. Since you requested Demo Access you are authorised to access the application.",
      tags: ['Passwordless', 'Authentication'],
      demoUrl: 'https://iam-login.netlify.app/',
      imageUrl: '/images/Screenshot 2025-06-03 at 17.50.17.png',
      icon: <FileText size={20} />,
      segments: ['core'],
      isNew: true,
      featured: true,
      dateAdded: '19-3-25',
    },
    {
      id: 2,
      title: 'Registration and Authentication',
      description: "Experience a true passwordless authentication process. Since you requested Demo Access you are authorised to access the application.",
      tags: ['Passwordless', 'Authentication', 'Registration'],
      demoUrl: 'https://iam-self-registration.netlify.app/',
      imageUrl: '/images/Screenshot 2025-06-03 at 17.51.14.png',
      icon: <FileText size={20} />,
      segments: ['core'],
      isNew: true,
      featured: true,
      dateAdded: '19-3-25',
    },
    {
      id: 3,
      title: 'I-AM Authentication with User Management',
      description: "Delegate user management to a member in the team. Regardless inside or outside your organisation",
      tags: ['Passwordless', 'Authentication', 'User Management'],
      demoUrl: 'https://iam-user-management.netlify.app/',
      imageUrl: '/images/Screenshot 2025-06-04 at 15.26.34.png',
      icon: <FileText size={20} />,
      segments: ['core'],
      isNew: true,
      featured: true,
      dateAdded: '19-3-25',
    },
  ];

  const [localDemos, setLocalDemos] = useState(demos);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showRequestPopup, setShowRequestPopup] = useState(false);

  const categories = [
    { id: 'all', name: 'All Guides', icon: <Book size={20} /> },
    { id: 'getting-started', name: 'Getting Started', icon: <Code size={20} /> },
    { id: 'integration', name: 'Integration', icon: <Server size={20} /> },
    { id: 'advanced', name: 'Advanced', icon: <Database size={20} /> },
  ];

  const toggleFilter = (category: string) => {
    if (category === 'all') {
      setActiveFilters([]);
      return;
    }
    
    setActiveFilters(prev => {
      if (prev.includes(category)) {
        return prev.filter(s => s !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const filteredDemos = localDemos.filter(demo => {
    const matchesCategory = activeFilters.length === 0 || activeFilters.includes(demo.category);
    const matchesSearch = demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          demo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          demo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Interactive Demos
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Experience I-AM's capabilities with our interactive demonstrations.
        </p>
      </div>
      
      <div className="mt-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Request Access to All Demos
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => setShowRequestPopup(true)}>
              Request Demo Access
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="mt-12 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search demos..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 self-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filters
            {activeFilters.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {activeFilters.length}
              </span>
            )}
          </Button>
          
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveFilters([])}
              className="text-gray-500 dark:text-gray-400"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Filter by Category */}
      {showFilters && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="mb-2 flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">Filter by Category</h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleFilter(category.id)}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                  category.id === 'all' && activeFilters.length === 0
                    ? "bg-blue-600 text-white"
                    : activeFilters.includes(category.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-6 text-gray-500 dark:text-gray-400">
        Showing {filteredDemos.length} of {demos.length} demos
      </div>

      {filteredDemos.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <div key={demo.id} className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
              <div className="h-48 overflow-hidden">
                <img 
                  src={demo.imageUrl} 
                  alt={demo.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-2">
                  {demo.icon && <span className="mr-2 text-blue-600 dark:text-blue-400">{demo.icon}</span>}
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {demo.title}
                  </h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {demo.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button 
                  className="w-full"
                  onClick={() => window.open(demo.demoUrl, '_blank', 'noopener,noreferrer')}
                >
                  Run Demo
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No demos found matching your criteria.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('');
              setActiveFilters([]);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}


      <DemoRequestPopup
        isOpen={showRequestPopup}
        onClose={() => setShowRequestPopup(false)}
      />
    </div>
  );
};