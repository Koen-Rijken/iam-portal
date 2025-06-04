import React, { useState } from 'react';
import { MessageSquare, Search, Filter, ArrowUp, ArrowDown, Clock, Users } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const DiscussionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'webauthn', name: 'WebAuthn' },
    { id: 'integration', name: 'Integration' },
    { id: 'security', name: 'Security' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'enterprise', name: 'Enterprise' },
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best practices for WebAuthn implementation',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'webauthn',
      replies: 24,
      views: 342,
      lastActivity: '2 hours ago',
      createdAt: '3 days ago',
      isPinned: true,
      excerpt: 'I\'ve been implementing WebAuthn for our application and wanted to share some best practices I\'ve discovered along the way...',
      url: '#',
    },
    {
      id: 2,
      title: 'How to handle authentication across multiple devices?',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'mobile',
      replies: 18,
      views: 256,
      lastActivity: '1 day ago',
      createdAt: '5 days ago',
      isPinned: false,
      excerpt: 'Our users often switch between their phone, tablet, and desktop. What\'s the best approach for maintaining authentication state across all devices?',
      url: '#',
    },
    {
      id: 3,
      title: 'I-AM integration with Next.js',
      author: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'integration',
      replies: 12,
      views: 189,
      lastActivity: '3 days ago',
      createdAt: '1 week ago',
      isPinned: false,
      excerpt: 'I\'m building a Next.js application and want to integrate I-AM for authentication. Has anyone done this before?',
      url: '#',
    },
    {
      id: 4,
      title: 'Enterprise SSO integration challenges',
      author: {
        name: 'Emily Wong',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'enterprise',
      replies: 32,
      views: 412,
      lastActivity: '6 hours ago',
      createdAt: '2 weeks ago',
      isPinned: false,
      excerpt: 'We\'re trying to integrate I-AM with our existing enterprise SSO solution and running into some challenges...',
      url: '#',
    },
    {
      id: 5,
      title: 'Security considerations for financial applications',
      author: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'security',
      replies: 27,
      views: 378,
      lastActivity: '12 hours ago',
      createdAt: '10 days ago',
      isPinned: true,
      excerpt: 'We\'re building a financial application and need to ensure the highest level of security. What additional measures should we take beyond the standard I-AM implementation?',
      url: '#',
    },
    {
      id: 6,
      title: 'React Native implementation guide',
      author: {
        name: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'mobile',
      replies: 15,
      views: 203,
      lastActivity: '2 days ago',
      createdAt: '2 weeks ago',
      isPinned: false,
      excerpt: 'I\'ve successfully implemented I-AM in our React Native application and wanted to share a step-by-step guide for others...',
      url: '#',
    },
    {
      id: 7,
      title: 'Performance optimization for high-traffic sites',
      author: {
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'enterprise',
      replies: 21,
      views: 287,
      lastActivity: '4 days ago',
      createdAt: '3 weeks ago',
      isPinned: false,
      excerpt: 'Our site handles millions of authentication requests daily. What are some strategies for optimizing I-AM performance at scale?',
      url: '#',
    },
    {
      id: 8,
      title: 'Implementing biometric authentication with I-AM',
      author: {
        name: 'Olivia Kim',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'security',
      replies: 19,
      views: 245,
      lastActivity: '1 day ago',
      createdAt: '2 weeks ago',
      isPinned: false,
      excerpt: 'Has anyone successfully implemented fingerprint or facial recognition with I-AM? I\'d love to hear about your experience and any challenges you faced.',
      url: '#',
    },
    {
      id: 9,
      title: 'I-AM with GraphQL API',
      author: {
        name: 'Ryan Thompson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'integration',
      replies: 8,
      views: 132,
      lastActivity: '5 days ago',
      createdAt: '3 weeks ago',
      isPinned: false,
      excerpt: 'We\'re using a GraphQL API and want to integrate I-AM for authentication. Has anyone done this before?',
      url: '#',
    },
    {
      id: 10,
      title: 'Compliance requirements for healthcare applications',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      category: 'security',
      replies: 29,
      views: 356,
      lastActivity: '8 hours ago',
      createdAt: '1 month ago',
      isPinned: false,
      excerpt: 'We\'re building a healthcare application and need to ensure compliance with HIPAA and other regulations. How does I-AM help with these requirements?',
      url: '#',
    },
  ];

  // Filter and sort discussions
  const filteredDiscussions = discussions
    .filter((discussion) => {
      const matchesCategory = activeCategory === 'all' || discussion.category === activeCategory;
      const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           discussion.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // Always show pinned discussions first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Then sort by selected criteria
      if (sortBy === 'recent') {
        return a.lastActivity < b.lastActivity ? 1 : -1;
      } else {
        return a.replies < b.replies ? 1 : -1;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Community Discussions
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Connect with other developers and share your experiences with I-AM.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search discussions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortBy === 'recent' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('recent')}
            className="flex items-center"
          >
            <Clock size={16} className="mr-2" />
            Recent
          </Button>
          <Button
            variant={sortBy === 'popular' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('popular')}
            className="flex items-center"
          >
            <Users size={16} className="mr-2" />
            Popular
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button
            variant="primary"
            size="sm"
          >
            New Discussion
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">Categories</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeCategory === category.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Discussions
                </h2>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {filteredDiscussions.length} discussions
              </span>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion) => (
                  <a
                    key={discussion.id}
                    href={discussion.url}
                    className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={discussion.author.avatar}
                            alt={discussion.author.name}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            {discussion.isPinned && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
                                Pinned
                              </span>
                            )}
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 mr-2">
                              {categories.find(c => c.id === discussion.category)?.name}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                            {discussion.title}
                          </h3>
                          <p className="mt-1 text-gray-500 dark:text-gray-400 line-clamp-2">
                            {discussion.excerpt}
                          </p>
                          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{discussion.author.name}</span>
                            <span className="mx-2">&middot;</span>
                            <span>Started {discussion.createdAt}</span>
                            <span className="mx-2">&middot;</span>
                            <span>Last activity {discussion.lastActivity}</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex flex-col items-end space-y-2">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No discussions found matching your criteria.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page 1 of 1
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};