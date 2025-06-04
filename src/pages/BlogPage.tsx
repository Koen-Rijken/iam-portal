import React, { useState } from 'react';
import { Search, Calendar, User, Clock, ArrowRight, Rocket, Zap, Brain, Building, Sparkles } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const blogs = [
    {
      id: 6,
      title: "From Observation to Co-Creation: The Age of AI-Driven Building Has Begun",
      excerpt: "Explore how AI is transforming from a tool to a true co-creator, revolutionizing organizational structures and the future of work.",
      author: "Stefan Ebner",
      date: "March 18, 2025",
      readTime: "7 min",
      category: "AI & Innovation",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      authorImage: "https://i.imgur.com/YhOqtpJ.png",
      featured: true
    },
    {
      id: 1,
      title: "The Future of Identity Management: Moving Beyond Passwords",
      excerpt: "Explore how passwordless authentication and biometric verification are reshaping the landscape of digital identity management in 2025 and beyond.",
      author: "Dr. Emma Wilson",
      date: "March 15, 2025",
      readTime: "8 min",
      category: "Identity Management",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      title: "Understanding OpenID Connect: A Comprehensive Guide",
      excerpt: "A deep dive into OpenID Connect protocol, its benefits for modern authentication, and how it differs from traditional OAuth 2.0.",
      author: "Michael Chen",
      date: "March 12, 2025",
      readTime: "12 min",
      category: "OpenID Connect",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 3,
      title: "SAML 2.0 in Enterprise Environments: Best Practices",
      excerpt: "Learn how to implement SAML 2.0 effectively in enterprise environments, including security considerations and integration patterns.",
      author: "Sarah Johnson",
      date: "March 10, 2025",
      readTime: "10 min",
      category: "SAML2",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 4,
      title: "Implementing Single Sign-On with OpenID Connect",
      excerpt: "A step-by-step guide to implementing SSO using OpenID Connect, including code examples and security considerations.",
      author: "Alex Rodriguez",
      date: "March 8, 2025",
      readTime: "15 min",
      category: "OpenID Connect",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 5,
      title: "SAML vs OpenID Connect: Choosing the Right Protocol",
      excerpt: "Compare SAML 2.0 and OpenID Connect to understand which protocol best suits your authentication needs.",
      author: "Lisa Chen",
      date: "March 5, 2025",
      readTime: "11 min",
      category: "Identity Management",
      image: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Featured blog is the first one with featured: true
  const featuredBlog = blogs.find(blog => blog.featured);
  const regularBlogs = blogs.filter(blog => !blog.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Insights and updates from the I-AM team
        </p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Article */}
      {featuredBlog && !searchQuery && (
        <div className="mb-12">
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="lg:flex">
              <div className="lg:w-1/2">
                <img
                  className="h-96 w-full object-cover"
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                />
              </div>
              <div className="lg:w-1/2 p-8">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Featured
                  </span>
                  <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {featuredBlog.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {featuredBlog.title}
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">
                  {featuredBlog.excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={featuredBlog.authorImage}
                    alt={featuredBlog.author}
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {featuredBlog.author}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={featuredBlog.date}>{featuredBlog.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <Clock className="h-4 w-4" />
                      <span>{featuredBlog.readTime} read</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredBlog.id}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  Read full article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Regular Articles Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {(searchQuery ? filteredBlogs : regularBlogs).map((blog) => (
          <article
            key={blog.id}
            className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 w-full relative">
              <img
                className="w-full h-full object-cover"
                src={blog.image}
                alt={blog.title}
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {blog.category}
                </span>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="flex items-center mb-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src={blog.authorImage}
                  alt={blog.author}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {blog.author}
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={blog.date}>{blog.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime} read</span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {blog.title}
                </h3>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  {blog.excerpt}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500"
                >
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};