import React, { useState } from 'react';
import { X, Building, Mail, Phone, Calendar, DollarSign, User, Tag, MessageSquare, FileText, Clock, Star } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { cn } from '../lib/utils';

interface OpportunityDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: {
    id: number;
    title: string;
    amount: number;
    company: string;
    tags: string[];
    rating: number;
    contactType: string;
    assignedTo: {
      name: string;
      avatar: string;
    };
  } | null;
}

export const OpportunityDetailPopup: React.FC<OpportunityDetailPopupProps> = ({
  isOpen,
  onClose,
  opportunity
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'activities' | 'notes'>('details');

  if (!isOpen || !opportunity) return null;

  const activities = [
    {
      id: 1,
      type: 'email',
      title: 'Email sent',
      description: 'Proposal document sent to client',
      date: '2025-03-15 14:30',
      user: opportunity.assignedTo
    },
    {
      id: 2,
      type: 'call',
      title: 'Call scheduled',
      description: 'Follow-up call to discuss proposal',
      date: '2025-03-16 10:00',
      user: opportunity.assignedTo
    }
  ];

  const notes = [
    {
      id: 1,
      content: 'Client expressed interest in additional customization options',
      date: '2025-03-14',
      user: opportunity.assignedTo
    },
    {
      id: 2,
      content: 'Budget approval pending from client\'s finance department',
      date: '2025-03-13',
      user: opportunity.assignedTo
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {opportunity.title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-[calc(100vh-200px)]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Tabs */}
              <div className="px-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  {['details', 'activities', 'notes'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className={cn(
                        "py-4 px-1 border-b-2 font-medium text-sm",
                        activeTab === tab
                          ? "border-blue-500 text-blue-600 dark:text-blue-400"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                      )}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Company
                        </label>
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-900 dark:text-white">
                            {opportunity.company}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expected Revenue
                        </label>
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-900 dark:text-white">
                            ${opportunity.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            <Tag className="h-4 w-4 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Contact Information
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">contact@example.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">+1 (555) 123-4567</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Additional Details
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Priority
                            </label>
                            <div className="flex">
                              {[...Array(3)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-5 w-5",
                                    i < opportunity.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300 dark:text-gray-600"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Next Action
                            </label>
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-gray-900 dark:text-white">
                                Follow-up meeting scheduled for March 20, 2025
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activities' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        Recent Activities
                      </h4>
                      <Button>
                        Log Activity
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="bg-white dark:bg-gray-700 rounded-lg shadow p-4"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={activity.user.avatar}
                                alt={activity.user.name}
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {activity.title}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {activity.date}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {activity.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        Notes
                      </h4>
                      <Button>
                        Add Note
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {notes.map((note) => (
                        <div
                          key={note.id}
                          className="bg-white dark:bg-gray-700 rounded-lg shadow p-4"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={note.user.avatar}
                                alt={note.user.name}
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {note.user.name}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {note.date}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                {note.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Assigned To */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Assigned To
                  </h4>
                  <div className="flex items-center">
                    <img
                      src={opportunity.assignedTo.avatar}
                      alt={opportunity.assignedTo.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {opportunity.assignedTo.name}
                    </span>
                  </div>
                </div>

                {/* Stage */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Stage
                  </h4>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white">
                    <option>New</option>
                    <option>Qualified</option>
                    <option>Proposition</option>
                    <option>Won</option>
                  </select>
                </div>

                {/* Quick Stats */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Quick Stats
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Created</span>
                      <span className="text-sm text-gray-900 dark:text-white">March 10, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Last Modified</span>
                      <span className="text-sm text-gray-900 dark:text-white">March 15, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Probability</span>
                      <span className="text-sm text-gray-900 dark:text-white">75%</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Quote
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};