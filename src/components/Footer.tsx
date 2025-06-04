import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Logo size="md" />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              TRUE PASSWORDLESS IDENTITY & ACCESS MANAGEMENT
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="https://github.com/iam-auth" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/demos" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Demonstration
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} I-AM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};