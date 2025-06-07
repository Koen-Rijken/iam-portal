import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code, Users, Github, ArrowRight, Terminal, Database, Lock, Zap, Globe, Cpu, Scan, Heart, Key, BookOpen, Fingerprint } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

const HomePage: React.FC = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-black to-[#2DD4BF]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                  Introducing I-AM
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900 dark:text-white">TRUE PASSWORDLESS</span>
                  <span className="block text-blue-600 dark:text-blue-400">IDENTITY & ACCESS MANAGEMENT</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Implement secure, passwordless authentication in minutes, not days. Built on standards and supported by the latest AI tool stack.
              </p>
              
              {/* Code snippet */}
              <div className="mt-8 rounded-lg bg-gray-900 p-4 shadow-2xl">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{` async generateAuthQRCode(options: {
    appId: string;
    hubId: string;
    signingPrivateKey: string;
  }): Promise<AuthGenerateAuthQRResponse> {
    const timestamp = new Date().toISOString();
    const qrCodeSpecificationObj = {
      appId: options.appId,
      hubId: options.hubId,
      timestamp,
    };

`}</code>
                </pre>
              </div>

              <div className="mt-8 sm:flex sm:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/demos">
                    <Button size="lg" className="w-full">
                      Try Live Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="https://github.com/iam-auth" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="w-full">
                      <Github className="mr-2 h-5 w-5" />
                      Star on GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <div className="bg-white dark:bg-gray-800 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden shadow-xl">
                <div className="px-4 py-8 sm:px-10">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        Live Authentication Demo
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <Terminal className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Scan the QR code with your phone to try passwordless login
                      </p>
                      <Link to="/demos">
                        <Button className="w-full">
                          <Scan className="mr-2 h-5 w-5" />
                          Start Demo
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="relative bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Our Core Values
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
              Built on strong principles
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-5xl">
            {/* Ease of Use */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-800 px-8 py-8 rounded-lg leading-none flex items-center justify-center flex-col">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">EASE OF USE</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  Simple integration and seamless user experience without compromising security.
                </p>
              </div>
            </div>

            {/* Privacy & Trust */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-800 px-8 py-8 rounded-lg leading-none flex items-center justify-center flex-col">
                <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">PRIVACY & TRUST</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  Your data stays private. No credentials stored, no tracking.
                </p>
              </div>
            </div>

            {/* High Secure */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-800 px-8 py-8 rounded-lg leading-none flex items-center justify-center flex-col">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">HIGH SECURE</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  Industry-standard encryption mechanisms.
                </p>
              </div>
            </div>

            {/* Open Standards */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white dark:bg-gray-800 px-8 py-8 rounded-lg leading-none flex items-center justify-center flex-col">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">OPEN STANDARDS</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  Built on established standards for maximum compatibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative bg-white dark:bg-gray-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
              Everything you need, nothing you don't
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
              Built by developers, for developers. Simple, secure, and standards-based.
            </p>
          </div>
 
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                        <Zap className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      SIMPLICITY
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Login made effortless — smooth, fast, and friction-free.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                        <Globe className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      CONNECTIVITY
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Comprehensive SDKs and APIs for seamless integration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                        <Database className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      AI DEVELOPMENT
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Smart development tools, powered by AI.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                        <Code className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      PRIVACY
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Your data stays private with end-to-end encryption and zero-knowledge architecture.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                        <Cpu className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      ENTERPRISE READY
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      SSO, audit logs, and advanced security controls built-in.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 dark:bg-blue-500 rounded-md shadow-lg">
                        <Shield className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      PAY AS YOU GO
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      Flexible token-based pricing for cost-effective scaling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="relative bg-gray-50 dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Developer Experience
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
              Authentication in minutes, not days
            </p>
          </div>

          <div className="mt-12">
            <div className="rounded-lg bg-gray-900 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <div className="flex space-x-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="text-sm text-gray-400">app.tsx</div>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{`import { useIAM } from '@iam/react'

function App() {
  const { authenticate } = useIAM()
  
  return (
    <button onClick={authenticate}>
      Sign in with biometrics
    </button>
  )
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block">Start building secure apps today.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get started for free
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link to="/docs">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-blue-700">
                  View documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};


export { HomePage };