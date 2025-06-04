import React, { useState } from 'react';
import { Search, Book, Code, Server, Database, Copy, Check, ChevronDown, ChevronRight, Terminal, Sparkles, Rocket, Package, Zap, Shield } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

export const DocsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'installation': true,
    'quick-start': false,
    'basic-auth-flow': false,
    'bolt-prompts': false,
    'n8n-prompts': false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const sidebarItems = [
    { id: 'getting-started', label: 'Getting Started', icon: <Book size={18} /> },
    { id: 'prompts', label: 'Prompts', icon: <Sparkles size={18} /> },
    { id: 'authentication', label: 'Authentication', icon: <Terminal size={18} /> },
    { id: 'api-reference', label: 'API Reference', icon: <Server size={18} /> },
    { id: 'sdks', label: 'SDKs & Libraries', icon: <Database size={18} /> },
  ];

  const boltPrompts = [
    {
      title: "Create React Component",
      prompt: "Create a reusable React component for a user profile card that displays the user's avatar, name, role, and social links.",
      description: "Generates a fully styled React component with TypeScript support and Tailwind CSS."
    },
    {
      title: "Setup Authentication",
      prompt: "Set up I-AM authentication in my React application with protected routes and user context.",
      description: "Creates authentication setup with context, hooks, and protected route components."
    },
    {
      title: "Add Dark Mode",
      prompt: "Add dark mode support to my application with a theme toggle and persistent preference.",
      description: "Implements dark mode with system preference detection and local storage persistence."
    },
    {
      title: "Create API Integration",
      prompt: "Create a service to integrate with the I-AM REST API including TypeScript types and error handling.",
      description: "Sets up API integration with proper typing and error management."
    },
    {
      title: "Implement Form Validation",
      prompt: "Create a registration form with client-side validation and error handling.",
      description: "Builds a form component with comprehensive validation and error display."
    }
  ];

  const n8nPrompts = [
    {
      title: "User Onboarding Workflow",
      prompt: "Create an n8n workflow that automates the user onboarding process with I-AM authentication.",
      description: "Automates user creation, welcome emails, and initial setup."
    },
    {
      title: "Access Management",
      prompt: "Build an n8n workflow to manage user access levels and permissions with I-AM.",
      description: "Handles role assignments and access control automation."
    },
    {
      title: "Audit Log Integration",
      prompt: "Create a workflow to collect and process I-AM authentication audit logs.",
      description: "Processes authentication events and generates reports."
    },
    {
      title: "Multi-Service Auth",
      prompt: "Set up an n8n workflow to handle authentication across multiple services using I-AM.",
      description: "Manages authentication state across different platforms."
    },
    {
      title: "Security Alerts",
      prompt: "Create a workflow to monitor and alert on suspicious authentication activities.",
      description: "Implements security monitoring and notification system."
    }
  ];

  const getOnPageSections = () => {
    switch (activeSection) {
      case 'getting-started':
        return [
          { id: 'installation', label: 'Installation' },
          { id: 'quick-start', label: 'Quick Start' },
          { id: 'key-features', label: 'Key Features' },
          { id: 'next-steps', label: 'Next Steps' }
        ];
      case 'prompts':
        return [
          { id: 'bolt-prompts', label: 'Bolt.new Prompts' },
          { id: 'n8n-prompts', label: 'n8n Prompts' },
          { id: 'pro-tips', label: 'Pro Tips' }
        ];
      case 'authentication':
        return [
          { id: 'setup', label: 'Setup' },
          { id: 'basic-auth', label: 'Basic Authentication' },
          { id: 'advanced-auth', label: 'Advanced Authentication' },
          { id: 'security', label: 'Security Considerations' }
        ];
      case 'api-reference':
        return [
          { id: 'authentication-api', label: 'Authentication API' },
          { id: 'user-management', label: 'User Management' },
          { id: 'tokens', label: 'Tokens' },
          { id: 'webhooks', label: 'Webhooks' }
        ];
      case 'sdks':
        return [
          { id: 'react', label: 'React SDK' },
          { id: 'node', label: 'Node.js SDK' },
          { id: 'python', label: 'Python SDK' },
          { id: 'go', label: 'Go SDK' }
        ];
      default:
        return [];
    }
  };

  const renderPromptSection = (title: string, prompts: typeof boltPrompts) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">{title}</h3>
      <div className="space-y-4">
        {prompts.map((prompt, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium text-white">{prompt.title}</h4>
              <button
                onClick={() => copyToClipboard(prompt.prompt, `${title}-${index}`)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {copiedSnippet === `${title}-${index}` ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-3">{prompt.description}</p>
            <div className="bg-gray-800 rounded p-3">
              <code className="text-sm text-blue-300">{prompt.prompt}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGettingStarted = () => (
    <>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Getting Started with I-AM</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-300 mb-6">
          Welcome to I-AM! This guide will help you get started with implementing secure, passwordless authentication in your applications.
        </p>

        {/* Installation */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Package className="mr-2" /> Installation
          </h3>
          <p className="text-gray-300 mb-4">
            Install I-AM using your preferred package manager:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                <span className="text-sm font-mono text-gray-300">npm</span>
                <button 
                  onClick={() => copyToClipboard('npm install @iam/client @iam/react', 'npm')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedSnippet === 'npm' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-gray-300 font-mono">npm install @iam/client @iam/react</code>
              </pre>
            </div>

            <div className="bg-gray-900 rounded-md overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                <span className="text-sm font-mono text-gray-300">yarn</span>
                <button 
                  onClick={() => copyToClipboard('yarn add @iam/client @iam/react', 'yarn')}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedSnippet === 'yarn' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-gray-300 font-mono">yarn add @iam/client @iam/react</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Rocket className="mr-2" /> Quick Start
          </h3>
          <p className="text-gray-300 mb-4">
            Follow these steps to add I-AM authentication to your application:
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-2">1. Initialize the Client</h4>
              <div className="bg-gray-900 rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                  <span className="text-sm font-mono text-gray-300">client.ts</span>
                  <button 
                    onClick={() => copyToClipboard(`import { IAMClient } from '@iam/client';

export const client = new IAMClient({
  projectId: 'your-project-id',
  region: 'eu-west-1'
});`, 'client')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedSnippet === 'client' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-gray-300 font-mono">{`import { IAMClient } from '@iam/client';

export const client = new IAMClient({
  projectId: 'your-project-id',
  region: 'eu-west-1'
});`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-2">2. Set up the Provider</h4>
              <div className="bg-gray-900 rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                  <span className="text-sm font-mono text-gray-300">App.tsx</span>
                  <button 
                    onClick={() => copyToClipboard(`import { IAMProvider } from '@iam/react';
import { client } from './client';

function App() {
  return (
    <IAMProvider client={client}>
      {/* Your app components */}
    </IAMProvider>
  );
}`, 'provider')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedSnippet === 'provider' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-gray-300 font-mono">{`import { IAMProvider } from '@iam/react';
import { client } from './client';

function App() {
  return (
    <IAMProvider client={client}>
      {/* Your app components */}
    </IAMProvider>
  );
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-2">3. Add Authentication to Components</h4>
              <div className="bg-gray-900 rounded-md overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                  <span className="text-sm font-mono text-gray-300">LoginButton.tsx</span>
                  <button 
                    onClick={() => copyToClipboard(`import { useIAM } from '@iam/react';

export function LoginButton() {
  const { authenticate } = useIAM();

  return (
    <button onClick={() => authenticate()}>
      Sign in with I-AM
    </button>
  );
}`, 'auth')}
                    className="text-gray-400 hover:text-white"
                  >
                    {copiedSnippet === 'auth' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-gray-300 font-mono">{`import { useIAM } from '@iam/react';

export function LoginButton() {
  const { authenticate } = useIAM();

  return (
    <button onClick={() => authenticate()}>
      Sign in with I-AM
    </button>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Zap className="mr-2" /> Key Features
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-2 flex items-center">
                <Shield className="mr-2 h-5 w-5" /> Passwordless Authentication
              </h4>
              <p className="text-gray-300">
                Secure authentication with multi-factor options.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-2 flex items-center">
                <Server className="mr-2 h-5 w-5" /> Edge-Ready
              </h4>
              <p className="text-gray-300">
                Deploy globally with ultra-low latency authentication at the edge.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-2 flex items-center">
                <Database className="mr-2 h-5 w-5" /> No Passwords
              </h4>
              <p className="text-gray-300">
                No Passwords, no problems, reduce the attack surface.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-2 flex items-center">
                <Code className="mr-2 h-5 w-5" /> Framework Agnostic
              </h4>
              <p className="text-gray-300">
                Use with any tech stack. Native SDKs for popular frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">Next Steps</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-left">
              <Book className="mr-2" /> Read the Authentication Guide
            </Button>
            <Button variant="outline" className="w-full justify-start text-left">
              <Server className="mr-2" /> Explore the API Reference
            </Button>
            <Button variant="outline" className="w-full justify-start text-left">
              <Terminal className="mr-2" /> View Example Projects
            </Button>
          </div>
        </section>
      </div>
    </>
  );

  const renderOnPageNavigation = () => (
    <div className="mt-6 bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-medium text-white">On This Page</h3>
      </div>
      <div className="p-2">
        <ul className="space-y-1">
          {getOnPageSections().map((section) => (
            <li key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
              >
                <span>{section.label}</span>
                {expandedSections[section.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              {expandedSections[section.id] && section.id === 'installation' && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li>
                    <a href="#npm" className="block px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
                      npm
                    </a>
                  </li>
                  <li>
                    <a href="#yarn" className="block px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
                      yarn
                    </a>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold">
            Documentation
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Comprehensive guides and references for implementing I-AM in your applications.
          </p>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search documentation..."
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-medium text-white">Documentation</h3>
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

            {renderOnPageNavigation()}
          </div>

          <div className="flex-grow">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {activeSection === 'getting-started' && renderGettingStarted()}
              {activeSection === 'prompts' && (
                <>
                  <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold">
                      Prompts
                    </h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-6">
                      Explore our collection of prompts for Bolt.new and n8n to help you build and automate your I-AM implementation.
                    </p>

                    {renderPromptSection("Bolt.new Prompts", boltPrompts)}
                    {renderPromptSection("n8n Prompts", n8nPrompts)}

                    <div className="mt-8 p-4 bg-blue-900 bg-opacity-50 border border-blue-800 rounded-md">
                      <h4 className="text-lg font-medium text-blue-300 mb-2">Pro Tips</h4>
                      <ul className="text-gray-300 space-y-2">
                        <li>• Use specific, detailed prompts for better results</li>
                        <li>• Include desired frameworks and styling preferences</li>
                        <li>• Mention TypeScript if you want type definitions</li>
                        <li>• Request examples and test cases when needed</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};