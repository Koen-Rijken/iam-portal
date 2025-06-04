import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit2, Check, X, Shield, User, UserPlus, UserMinus, Filter, BarChart2, Users as UsersIcon, Settings, Layout, CreditCard, Activity, ChevronRight, MoreHorizontal, Info, FileText, Wallet, Sliders, DollarSign, ArrowUp, ArrowDown, Clock, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { cn } from '../lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'locked';
  group: string;
  logins: number;
  lastLogin: string;
  avatar?: string;
  initials?: string;
}

interface Application {
  id: string;
  name: string;
  protocol: 'SAML' | 'JWT' | 'OIDC';
  logins: number;
  lastLogin: string;
  logo: string;
  status: 'active' | 'inactive';
}

interface BillingInfo {
  creditBalance: number;
  autoRecharge: boolean;
  paymentMethods: {
    id: string;
    type: string;
    last4: string;
    expiryDate: string;
  }[];
  billingHistory: {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
    description: string;
  }[];
}

export const HubPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most active');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeSection, setActiveSection] = useState('insights');
  const [activeBillingTab, setActiveBillingTab] = useState('overview');

  const billingInfo: BillingInfo = {
    creditBalance: 8.24,
    autoRecharge: false,
    paymentMethods: [
      {
        id: '1',
        type: 'visa',
        last4: '4242',
        expiryDate: '12/25'
      }
    ],
    billingHistory: [
      {
        id: '1',
        date: '2025-03-15',
        amount: 50.00,
        status: 'paid',
        description: 'Monthly credit purchase'
      },
      {
        id: '2',
        date: '2025-02-15',
        amount: 50.00,
        status: 'paid',
        description: 'Monthly credit purchase'
      }
    ]
  };

  const applications: Application[] = [
    {
      id: '1',
      name: 'FleetOpsPro',
      protocol: 'SAML',
      logins: 300,
      lastLogin: 'Today',
      logo: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
      status: 'active'
    },
    {
      id: '2',
      name: 'Easy Contractor',
      protocol: 'JWT',
      logins: 236,
      lastLogin: 'Today',
      logo: 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
      status: 'active'
    },
    {
      id: '3',
      name: 'CustomerDesk',
      protocol: 'SAML',
      logins: 117,
      lastLogin: '18.06.2024',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'SupplyMe 2.0',
      protocol: 'OIDC',
      logins: 80,
      lastLogin: '17.06.2024',
      logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
      status: 'active'
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      status: 'active',
      group: 'Machine Operators',
      logins: 245,
      lastLogin: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      status: 'active',
      group: 'Contractors',
      logins: 189,
      lastLogin: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      status: 'locked',
      group: 'Suppliers',
      logins: 156,
      lastLogin: '3 days ago',
      initials: 'EW'
    }
  ];

  const mainSidebarItems = [
    { id: 'insights', label: 'Insights', icon: <BarChart2 size={20} /> },
    { id: 'users', label: 'Users', icon: <UsersIcon size={20} /> },
    { id: 'applications', label: 'Applications', icon: <Layout size={20} /> },
  ];

  const bottomSidebarItems = [
    { id: 'usage', label: 'Usage', icon: <Activity size={20} /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProtocolBadgeStyles = (protocol: Application['protocol']) => {
    switch (protocol) {
      case 'SAML':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'JWT':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'OIDC':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="flex h-[calc(100vh-7rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Title */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            I-AM Management Console
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {mainSidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Bottom sidebar items */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            {bottomSidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {activeSection === 'insights' && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Active Users Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Users</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      12%
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {users.filter(u => u.status === 'active').length}
                    </p>
                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      of {users.length} total
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(users.filter(u => u.status === 'active').length / users.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Total Logins Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Logins</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Today
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">1,248</p>
                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">logins</p>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Peak time: 9:00 AM - 11:00 AM</span>
                  </div>
                </div>

                {/* Active Applications Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Apps</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      <ArrowDown className="w-3 h-3 mr-1" />
                      2%
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {applications.filter(app => app.status === 'active').length}
                    </p>
                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      of {applications.length} total
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(applications.filter(app => app.status === 'active').length / applications.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                    <Button variant="outline" size="sm">
                      View all <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        user: 'Sarah Johnson',
                        action: 'Logged in',
                        time: '2 minutes ago',
                        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      },
                      {
                        user: 'Michael Chen',
                        action: 'Updated profile',
                        time: '15 minutes ago',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      },
                      {
                        user: 'Emma Wilson',
                        action: 'Added new device',
                        time: '1 hour ago',
                        initials: 'EW'
                      }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center">
                        {activity.avatar ? (
                          <img src={activity.avatar} alt="" className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {activity.initials}
                            </span>
                          </div>
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{activity.action}</span>
                            <span className="mx-1">•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Overview */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Overview</h3>
                    <Button variant="outline" size="sm">
                      View details <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Security Score</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Based on current settings</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-500">92%</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">2FA Enabled Users</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">89%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Password-less Login</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">100%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Device Trust</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="p-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Search users..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <Filter size={16} className="mr-2" />
                        Filters
                      </Button>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200"
                        >
                          <option>Most active</option>
                          <option>Least active</option>
                          <option>Recently added</option>
                          <option>Alphabetical</option>
                        </select>
                      </div>
                      <Button>
                        <UserPlus className="h-5 w-5 mr-2" />
                        Add user
                      </Button>
                    </div>
                  </div>

                  {/* Filters Panel */}
                  {showFilters && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Status
                          </label>
                          <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200">
                            <option>All</option>
                            <option>Active</option>
                            <option>Locked</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Group
                          </label>
                          <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200">
                            <option>All</option>
                            <option>Machine Operators</option>
                            <option>Contractors</option>
                            <option>Suppliers</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Login
                          </label>
                          <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200">
                            <option>Any time</option>
                            <option>Today</option>
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(users.map(u => u.id));
                              } else {
                                setSelectedUsers([]);
                              }
                            }}
                            checked={selectedUsers.length === users.length}
                          />
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Group
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                {user.avatar ? (
                                  <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-10 w-10 rounded-full"
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                      {user.initials}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {user.group}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              user.status === 'active'
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            )}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => {}}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'applications' && (
            <div className="p-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Search applications..."
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                      <Button>
                        <Plus className="h-5 w-5 mr-2" />
                        Add Application
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Applications Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApplications.map((app) => (
                      <div key={app.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <img
                            src={app.logo}
                            alt={app.name}
                            className="h-12 w-12 rounded-lg"
                          />
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {app.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                getProtocolBadgeStyles(app.protocol)
                              )}>
                                {app.protocol}
                              </span>
                              <span className={cn(
                                "ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                app.status === 'active'
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              )}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Last login</span>
                            <span className="text-gray-900 dark:text-white">{app.lastLogin}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Total logins</span>
                            <span className="text-gray-900 dark:text-white">{app.logins}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'usage' && (
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Usage Analytics
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Coming soon...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};