import React, { useState } from 'react';
import { ArrowRight, Shield, Info, Plus, Check, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';

interface UserGroup {
  id: number;
  users: number;
  daysPerWeek: number;
}

interface PlanPricing {
  small: { tokens: number; price: number };
  medium: { tokens: number; price: number };
  large: { tokens: number; price: number };
  initialTokens: number;
}

const planPricing: Record<'early' | 'standard' | 'premium', PlanPricing> = {
  early: {
    small: { tokens: 2000, price: 5.00 },
    medium: { tokens: 5000, price: 9.00 },
    large: { tokens: 10000, price: 16.20 },
    initialTokens: 1000
  },
  standard: {
    small: { tokens: 1000, price: 5.00 },
    medium: { tokens: 2500, price: 9.00 },
    large: { tokens: 5000, price: 16.20 },
    initialTokens: 500
  },
  premium: {
    small: { tokens: 5000, price: 18.00 },
    medium: { tokens: 10000, price: 32.40 },
    large: { tokens: 20000, price: 58.32 },
    initialTokens: 2500
  }
};

export const PricingPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<'early' | 'standard' | 'premium'>('standard');
  const [userGroups, setUserGroups] = useState<UserGroup[]>([
    { id: 1, users: 100, daysPerWeek: 5 }
  ]);

  const addUserGroup = () => {
    const newId = Math.max(0, ...userGroups.map(g => g.id)) + 1;
    setUserGroups([...userGroups, { id: newId, users: 100, daysPerWeek: 5 }]);
  };

  const updateUserGroup = (id: number, field: keyof UserGroup, value: number) => {
    setUserGroups(groups =>
      groups.map(group =>
        group.id === id ? { ...group, [field]: value } : group
      )
    );
  };

  const deleteUserGroup = (id: number) => {
    if (userGroups.length <= 1) return;
    setUserGroups(groups => groups.filter(group => group.id !== id));
  };

  const calculateUsage = () => {
    // Calculate annual tokens for each user group
    const userGroupTokens = userGroups.map(group => ({
      annualTokens: group.users * group.daysPerWeek * 52
    }));

    // Calculate total annual tokens
    const totalAnnualTokens = userGroupTokens.reduce((sum, group) => sum + group.annualTokens, 0);
    const weeklyTokens = Math.round(totalAnnualTokens / 52);

    const pricing = planPricing[selectedPackage];
    
    // Calculate number of packages needed for each package size
    const smallPackages = Math.ceil(totalAnnualTokens / pricing.small.tokens);
    const mediumPackages = Math.ceil(totalAnnualTokens / pricing.medium.tokens);
    const largePackages = Math.ceil(totalAnnualTokens / pricing.large.tokens);

    // Calculate annual cost for each package size
    const smallCost = smallPackages * pricing.small.price;
    const mediumCost = mediumPackages * pricing.medium.price;
    const largeCost = largePackages * pricing.large.price;

    // Find the most cost-effective package
    const costs = [
      { type: 'small', cost: smallCost, packages: smallPackages, tokens: pricing.small.tokens },
      { type: 'medium', cost: mediumCost, packages: mediumPackages, tokens: pricing.medium.tokens },
      { type: 'large', cost: largeCost, packages: largePackages, tokens: pricing.large.tokens }
    ];

    const bestOption = costs.reduce((prev, current) => 
      current.cost < prev.cost ? current : prev
    );

    return {
      weeklyTokens,
      yearlyTokens: totalAnnualTokens,
      packageType: bestOption.type.charAt(0).toUpperCase() + bestOption.type.slice(1),
      packageTokens: bestOption.tokens,
      monthlyCost: bestOption.cost / 12,
      yearlyCost: bestOption.cost,
      plan: selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1),
      initialTokens: pricing.initialTokens,
      numberOfPackages: bestOption.packages
    };
  };

  const usage = calculateUsage();

  const PricingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h4 className="font-bold text-gray-900 dark:text-white mb-4">{title}</h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Pay as you go - Enjoy maximum flexibility
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Don't pay for inactive users
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I.AM's token model means you only pay for what you use. No more wasted
            spend on dormant accounts or per-user monthly fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div 
            className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
              selectedPackage === 'early' 
                ? 'ring-2 ring-blue-500 transform scale-105' 
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="bg-pink-400 dark:bg-pink-600 p-4 text-center">
              <h3 className="text-xl font-bold text-white">EARLY ADOPTOR</h3>
            </div>
            <div className="bg-pink-300 dark:bg-pink-500 p-8 text-center">
              <p className="text-xl text-white font-medium">Thank you for your support :)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6">
              <PricingSection title="Bonus Tokens">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Sign up</span>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-900 dark:text-white">1000</span>
                    <span className="text-gray-500">0,00 €</span>
                  </div>
                </div>
              </PricingSection>

              <PricingSection title="Token Packages">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Small</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">2000</span>
                    <span className="font-bold text-gray-900 dark:text-white">5,00 €</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Medium</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">5000</span>
                    <span className="font-bold text-gray-900 dark:text-white">9,00 €</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Large</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">10000</span>
                    <span className="font-bold text-gray-900 dark:text-white">16,20 €</span>
                  </div>
                </div>
              </PricingSection>

              <PricingSection title="Token Abo">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Auto renew @ 10%</span>
                  <span className="font-bold text-gray-900 dark:text-white">-</span>
                </div>
              </PricingSection>

              <Button 
                className="w-full mt-6"
                onClick={() => setSelectedPackage('early')}
                variant={selectedPackage === 'early' ? 'primary' : 'outline'}
              >
                Select Plan
              </Button>
            </div>
          </div>

          <div 
            className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
              selectedPackage === 'standard' 
                ? 'ring-2 ring-blue-500 transform scale-105' 
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="bg-green-400 dark:bg-green-600 p-4 text-center">
              <h3 className="text-xl font-bold text-white">STANDARD</h3>
            </div>
            <div className="bg-green-300 dark:bg-green-500 p-8 text-center">
              <p className="text-xl text-white font-medium">No operational hassle</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6">
              <PricingSection title="Bonus Tokens">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Sign up</span>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-900 dark:text-white">500</span>
                    <span className="text-gray-500">0,00 €</span>
                  </div>
                </div>
              </PricingSection>

              <PricingSection title="Token Packages">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Small</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">1000</span>
                    <span className="font-bold text-gray-900 dark:text-white">5,00 €</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Medium</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">2500</span>
                    <span className="font-bold text-gray-900 dark:text-white">9,00 €</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Large</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">5000</span>
                    <span className="font-bold text-gray-900 dark:text-white">16,20 €</span>
                  </div>
                </div>
              </PricingSection>

              <PricingSection title="Token Abo">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Auto renew @ 10%</span>
                  <span className="font-bold text-gray-900 dark:text-white">"Select Abo Package"</span>
                </div>
              </PricingSection>

              <Button 
                className="w-full mt-6"
                onClick={() => setSelectedPackage('standard')}
                variant={selectedPackage === 'standard' ? 'primary' : 'outline'}
              >
                Select Plan
              </Button>
            </div>
          </div>

          <div 
            className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
              selectedPackage === 'premium' 
                ? 'ring-2 ring-blue-500 transform scale-105' 
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="bg-red-400 dark:bg-red-600 p-4 text-center">
              <h3 className="text-xl font-bold text-white">PREMIUM</h3>
            </div>
            <div className="bg-red-300 dark:bg-red-500 p-8 text-center">
              <p className="text-xl text-white font-medium">Your data in your cloud</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6">
              <PricingSection title="Bonus Tokens">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Sign up</span>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-gray-900 dark:text-white">2500</span>
                    <span className="text-gray-500">0,00 €</span>
                  </div>
                </div>
              </PricingSection>

              <PricingSection title="Token Packages">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Small</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">5000</span>
                    <span className="font-bold text-gray-900 dark:text-white">18,00 €</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Medium</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">10000</span>
                    <span className="font-bold text-gray-900 dark:text-white">32,40 €</span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Large</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 dark:text-gray-300">20000</span>
                    <span className="font-bold text-gray-900 dark:text-white">58,32 €</span>
                  </div>
                </div>
              </PricingSection>

              <PricingSection title="Token Abo">
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                  <span className="text-gray-700 dark:text-gray-300">Auto renew @ 10%</span>
                  <span className="font-bold text-gray-900 dark:text-white">"Select Abo Package"</span>
                </div>
              </PricingSection>

              <Button 
                className="w-full mt-6"
                onClick={() => setSelectedPackage('premium')}
                variant={selectedPackage === 'premium' ? 'primary' : 'outline'}
              >
                Select Plan
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl mb-16">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Calculate Usage</h3>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {userGroups.map((group) => (
                <div 
                  key={group.id}
                  className="bg-gray-700 rounded-lg p-6 space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-white">
                      User Group {group.id}
                    </h4>
                    {userGroups.length > 1 && (
                      <button
                        onClick={() => deleteUserGroup(group.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete group"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Number of Users
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="1000"
                        value={group.users}
                        onChange={(e) => updateUserGroup(group.id, 'users', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                      <span>1</span>
                      <span className="text-blue-400 font-medium">{group.users}</span>
                      <span>1000</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Days per Week
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="7"
                        value={group.daysPerWeek}
                        onChange={(e) => updateUserGroup(group.id, 'daysPerWeek', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-400">
                      <span>1</span>
                      <span className="text-blue-400 font-medium">{group.daysPerWeek}</span>
                      <span>7</span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={addUserGroup}
                className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-gray-600 hover:border-gray-500 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add User Group
              </button>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-6">Calculation</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Selected Plan:</span>
                    <span className="font-medium text-purple-400">{usage.plan}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Initial Tokens:</span>
                    <span className="font-medium text-white">{usage.initialTokens}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Weekly Token Consumption:</span>
                    <span className="font-medium text-white">{usage.weeklyTokens} tokens</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (usage.weeklyTokens / usage.packageTokens) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Yearly Token Consumption:</span>
                    <span className="font-medium text-white">{usage.yearlyTokens} tokens</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (usage.yearlyTokens / (usage.packageTokens * 52)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Recommended Package:</span>
                      <span className="font-medium text-blue-400">{usage.packageType} Package</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Monthly Cost:</span>
                      <span className="font-medium text-white">€{usage.monthlyCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Annual Cost:</span>
                      <span className="font-medium text-white">€{usage.yearlyCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-4 rounded-lg mt-6">
                  <p className="text-sm text-blue-200">
                    One token allows unlimited authentications for one user during a 24-hour period. 
                    Choose a package that comfortably covers your estimated usage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of organizations already saving with I.AM's token-based pricing model.
          </p>
          <Button size="lg">
            Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};