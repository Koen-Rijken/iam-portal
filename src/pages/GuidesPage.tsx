import React, { useState, useEffect } from 'react';
import { Search, Book, Code, Server, Database, Filter, X, Youtube } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

export const GuidesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Guides', icon: <Book size={20} /> },
    { id: 'getting-started', name: 'Getting Started', icon: <Code size={20} /> },
    { id: 'integration', name: 'Integration', icon: <Server size={20} /> },
    { id: 'advanced', name: 'Advanced', icon: <Database size={20} /> },
  ];

  const guides = [
    {
      id: 9,
      title: 'Integrate I-AM with n8n',
      description: 'Learn how to connect I.AM authentication with n8n workflows for automated user onboarding.',
      category: 'integration',
      readTime: '12 min',
      url: '#',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1607968565043-36af90dde238?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 10,
      title: 'Integrate I-AM with Bolt.new',
      description: 'Set up passwordless authentication in your Bolt.new projects with I.AM.',
      category: 'integration',
      readTime: '8 min',
      url: '#',
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 1,
      title: 'Getting Started with I-AM',
      description: 'Learn the basics of I.AM and set up your first project.',
      category: 'getting-started',
      readTime: '5 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Implementing WebAuthn Authentication',
      description: 'Step-by-step guide to implementing WebAuthn in your application.',
      category: 'integration',
      readTime: '10 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Building a React Application with I-AM',
      description: 'Learn how to integrate I.AM into a React application.',
      category: 'integration',
      readTime: '15 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Advanced Security Configurations',
      description: 'Fine-tune security settings for enterprise applications.',
      category: 'advanced',
      readTime: '12 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'I.AM with Node.js Backend',
      description: 'Integrate I.AM with a Node.js backend service.',
      category: 'integration',
      readTime: '8 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title: 'Custom Authentication Flows',
      description: 'Create tailored authentication experiences for your users.',
      category: 'advanced',
      readTime: '20 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 7,
      title: 'Migrating from Password-Based Auth',
      description: 'Transition your existing auth system to I-AM passwordless.',
      category: 'getting-started',
      readTime: '15 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 8,
      title: 'I-AM for Mobile Applications',
      description: 'Implement I-AM in iOS and Android applications.',
      category: 'integration',
      readTime: '18 min',
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
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

  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = activeFilters.length === 0 || activeFilters.includes(guide.category);
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset filters when search query changes
  useEffect(() => {
    if (searchQuery) {
      setActiveFilters([]);
    }
  }, [searchQuery]);

  // Sort guides to show featured ones first
  const sortedGuides = [...filteredGuides].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          How-To Guides
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Learn how to implement and use I-AM in your applications.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search guides..."
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
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center",
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
        Showing {sortedGuides.length} of {guides.length} guides
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedGuides.length > 0 ? (
          sortedGuides.map((guide) => (
            <a
              key={guide.id}
              href={guide.url}
              className={`block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${guide.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={guide.imageUrl} 
                  alt={guide.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {/* YouTube logo in the upper left corner */}
                <div className="absolute top-3 left-3 bg-red-600 text-white p-1.5 rounded-lg shadow-md flex items-center justify-center">
                  <Youtube size={20} className="text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {guide.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {guide.readTime}
                  </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {guide.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    Read guide
                  </span>
                  <div className="flex items-center space-x-2">
                    {guide.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Featured
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {guide.category === 'getting-started' ? 'Beginner' : 
                      guide.category === 'integration' ? 'Intermediate' : 'Advanced'}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-3 text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No guides found matching your criteria.
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
      </div>
    </div>
  );
};