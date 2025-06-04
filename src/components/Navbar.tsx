import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Github, Menu, X, User, ChevronDown, Building2, LayoutGrid } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { Logo } from './Logo';
import { Button } from './Button';
import { LoginPopup } from './LoginPopup';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);

  const publicLinks = [
    { name: 'Demos', path: '/demos' },
    { name: 'Guides', path: '/guides' },
    { name: 'Docs', path: '/docs' },
    { name: 'API', path: '/api' }
  ];

  const getAuthenticatedLinks = (role?: string) => {
    const links = [{ name: 'Hub', path: '/hub' }];
    if (role === 'Admin') {
      links.push({ name: 'CRM', path: '/crm' });
    }
    return links;
  };

  const getNavLinks = () => {
    if (user) {
      return [...publicLinks, ...getAuthenticatedLinks(user.role)];
    }
    return publicLinks;
  };

  const handleSignIn = () => {
    setShowLoginPopup(true);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {getNavLinks().map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "inline-flex items-center px-3 pt-1 border-b-2 text-lg font-medium",
                    location.pathname === link.path
                      ? "border-blue-500 text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/iam-auth"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Github size={24} />
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User size={24} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      {user.role} Account
                    </div>
                    {getAuthenticatedLinks(user.role).map((link) => (
                      <button
                        key={link.path}
                        onClick={() => handleMenuItemClick(link.path)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {link.name}
                      </button>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={handleSignIn}>
                Sign In
              </Button>
            )}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {getNavLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                  location.pathname === link.path
                    ? "border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-gray-800"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        demoTitle="I-AM"
      />
    </nav>
  );
};