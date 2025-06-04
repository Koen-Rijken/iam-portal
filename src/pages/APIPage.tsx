import React from 'react';
import { Search, Book, Code, Server, Database, Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

export const APIPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeSection, setActiveSection] = React.useState('authentication');
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({});
  const [copiedSnippet, setCopiedSnippet] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const sidebarItems = [
    { id: 'authentication', label: 'Authentication', icon: <Server size={18} /> },
    { id: 'users', label: 'Users', icon: <Database size={18} /> },
    { id: 'tokens', label: 'Tokens', icon: <Code size={18} /> },
    { id: 'webhooks', label: 'Webhooks', icon: <Book size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold">
            API Reference
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Complete API reference for I-AM authentication services.
          </p>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search API documentation..."
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-medium text-white">API Reference</h3>
              </div>
              <div className="p-2">
                <ul className="space-y-1">
                  {sidebarItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={cn(
                          "w-full flex items-center text-left px-3 py-2 rounded-md text-sm",
                          activeSection === item.id
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        )}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">Authentication API</h2>
                <p className="mt-2 text-gray-400">
                  Implement secure, passwordless authentication in your applications.
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-8">
                  {/* Base URL Section */}
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Base URL</h3>
                    <div className="bg-gray-900 rounded-md overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                        <span className="text-sm font-mono text-gray-300">Production</span>
                        <button 
                          onClick={() => copyToClipboard('https://api.i-am.technology', 'base-url')}
                          className="text-gray-400 hover:text-white"
                        >
                          {copiedSnippet === 'base-url' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-gray-300 font-mono">https://api.i-am.technology</code>
                      </pre>
                    </div>
                  </section>

                  {/* Authentication Section */}
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Authentication</h3>
                    <p className="text-gray-400 mb-4">
                      All API requests must include your API key in the Authorization header:
                    </p>
                    <div className="bg-gray-900 rounded-md overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                        <span className="text-sm font-mono text-gray-300">Authorization Header</span>
                        <button 
                          onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
                          className="text-gray-400 hover:text-white"
                        >
                          {copiedSnippet === 'auth-header' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-gray-300 font-mono">Authorization: Bearer YOUR_API_KEY</code>
                      </pre>
                    </div>
                  </section>

                  {/* Example Request */}
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Example Request</h3>
                    <div className="bg-gray-900 rounded-md overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                        <span className="text-sm font-mono text-gray-300">Generate Auth QR Code</span>
                        <button 
                          onClick={() => copyToClipboard(`curl -X POST \\
  https://api.i-am.technology/v1/auth/generate-qr \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "appId": "your-app-id",
    "hubId": "your-hub-id"
  }'`, 'example-request')}
                          className="text-gray-400 hover:text-white"
                        >
                          {copiedSnippet === 'example-request' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-gray-300 font-mono">{`curl -X POST \\
  https://api.i-am.technology/v1/auth/generate-qr \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "appId": "your-app-id",
    "hubId": "your-hub-id"
  }'`}</code>
                      </pre>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};