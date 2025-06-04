import React from 'react';
import { Shield, Heart, BookOpen, Github, Zap, Lock, AlertTriangle, Clock, DollarSign, Users, Building2, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Animated Background */}
      <div className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover transform scale-105 motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40 animate-gradient" />
          <div className="absolute inset-0 bg-gray-900/75" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 animate-fade-in">
              TRUE PASSWORDLESS
            </h1>
            <p className="text-3xl md:text-5xl font-bold text-white mb-12">
              IDENTITY & ACCESS MANAGEMENT FOR A NEW ERA
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section with Interactive Cards */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Core Values
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: <Zap className="h-12 w-12" />, title: 'EASE OF USE', description: 'Simple integration and seamless user experience' },
              { icon: <Heart className="h-12 w-12" />, title: 'PRIVACY & TRUST', description: 'Your data stays private, no tracking' },
              { icon: <Shield className="h-12 w-12" />, title: 'HIGH SECURE', description: 'Industry-standard encryption mechanisms built-in' },
              { icon: <BookOpen className="h-12 w-12" />, title: 'OPEN STANDARDS', description: 'Built on WebAuthn and FIDO2' },
              { icon: <Github className="h-12 w-12" />, title: 'OPEN SOURCE', description: 'Transparent and community-driven' }
            ].map((value) => (
              <div 
                key={value.title} 
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative">
                  <div className="text-blue-600 dark:text-blue-400 mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Statement Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 dark:from-red-900/20 dark:to-orange-900/20" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15 dark:opacity-10 transform scale-105 motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-8">The Password Problem</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Passwords are not just inconvenient - they're a critical security risk and major operational burden.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:-translate-y-2">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">90%</div>
                  <p className="text-xl text-gray-700 dark:text-gray-300">
                    of managed passwords are for <span className="font-semibold">non-employees</span>
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl transform transition-all duration-300 hover:-translate-y-2">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">70%</div>
                  <p className="text-xl text-gray-700 dark:text-gray-300">
                    are for <span className="font-semibold">self-built applications</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              The Real Cost of Passwords
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="h-8 w-8" />,
                stat: '80%',
                text: 'of breaches involve stolen credentials',
                source: 'Verizon 2020'
              },
              {
                icon: <AlertTriangle className="h-8 w-8" />,
                stat: '15B+',
                text: 'compromised credentials on dark web',
                source: 'Digital Shadows'
              },
              {
                icon: <DollarSign className="h-8 w-8" />,
                stat: '$4.24M',
                text: 'average cost of a data breach',
                source: 'IBM Security'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-500 to-orange-500 transform transition-all duration-300 group-hover:w-full group-hover:opacity-10" />
                <div className="relative">
                  <div className="text-red-600 dark:text-red-400 mb-6">
                    {item.icon}
                  </div>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {item.stat}
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                    {item.text}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Source: {item.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-15 transform scale-105 motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold mb-8">The Future is Here</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
                By 2025, <span className="font-bold text-blue-600 dark:text-blue-400">50%</span> of the workforce and <span className="font-bold text-blue-600 dark:text-blue-400">20%</span> of customer authentication will be passwordless.
              </p>
              <Button size="lg" className="animate-bounce">
                Join the Revolution <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};