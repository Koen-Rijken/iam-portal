import React from 'react';
import { MessageSquare, Users, Calendar, ExternalLink, Github } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const CommunityPage: React.FC = () => {
  const discussions = [
    {
      id: 1,
      title: 'Best practices for WebAuthn implementation',
      author: 'Sarah Johnson',
      replies: 24,
      lastActivity: '2 hours ago',
      url: '#',
    },
    {
      id: 2,
      title: 'How to handle authentication across multiple devices?',
      author: 'Michael Chen',
      replies: 18,
      lastActivity: '1 day ago',
      url: '#',
    },
    {
      id: 3,
      title: 'I-AM integration with Next.js',
      author: 'Alex Rodriguez',
      replies: 12,
      lastActivity: '3 days ago',
      url: '#',
    },
  ];

  const events = [
    {
      id: 1,
      title: 'I-AM Community Meetup',
      date: 'June 15, 2025',
      location: 'Virtual',
      description: 'Join us for our monthly community meetup to discuss the latest in passwordless authentication.',
      url: '#',
    },
    {
      id: 2,
      title: 'Webinar: Enterprise Security with I-AM',
      date: 'June 22, 2025',
      location: 'Virtual',
      description: 'Learn how to implement I-AM in enterprise environments with advanced security requirements.',
      url: '#',
    },
  ];

  const specialists = [
    {
      id: 1,
      name: 'Dr. Emma Wilson',
      role: 'Security Specialist',
      bio: 'Expert in cryptography and secure authentication protocols.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'David Park',
      role: 'Integration Engineer',
      bio: 'Specializes in helping developers integrate I-AM into their applications.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      role: 'Developer Advocate',
      bio: 'Helps developers understand and implement passwordless authentication.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          I-AM Community
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Connect with other developers and I-AM specialists.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Discussions
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {discussions.map((discussion) => (
                <a
                  key={discussion.id}
                  href={discussion.url}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="p-6">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {discussion.title}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {discussion.replies} replies
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>By {discussion.author}</span>
                      <span className="mx-2">&middot;</span>
                      <span>Last activity {discussion.lastActivity}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 text-center">
              <Link to="/discussions">
                <Button variant="outline">
                  View All Discussions
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upcoming Events
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.map((event) => (
                <div key={event.id} className="p-6">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {event.location}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {event.date}
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>
                  <div className="mt-4">
                    <a href={event.url}>
                      <Button size="sm">
                        Register
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  I-AM Specialists
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {specialists.map((specialist) => (
                <div key={specialist.id} className="p-6">
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={specialist.avatar}
                      alt={specialist.name}
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {specialist.name}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {specialist.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {specialist.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 dark:bg-blue-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-white mb-2">
                Join Our GitHub
              </h2>
              <p className="text-blue-100 mb-4">
                Contribute to I-AM's open source projects and help shape the future of passwordless authentication.
              </p>
              <a
                href="https://github.com/iam-project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50"
              >
                <Github className="mr-2 h-5 w-5" />
                Visit GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};