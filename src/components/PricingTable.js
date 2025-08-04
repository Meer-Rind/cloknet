import { useState } from 'react';
import { FiCheck, FiX, FiZap, FiAward } from 'react-icons/fi';

const PricingTable = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const plans = [
    {
      name: 'Free',
      price: billingCycle === 'monthly' ? '0' : '0',
      description: 'Basic protection for casual browsing',
      features: [
        { text: '7 Free Servers', included: true },
        { text: '100MB Daily Limit', included: true },
        { text: 'Standard Speed', included: true },
        { text: 'Ad-Supported', included: true },
        { text: 'Premium Servers', included: false },
        { text: 'No Logs Policy', included: false },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? '9.99' : '99.99',
      description: 'Best for power users and professionals',
      features: [
        { text: 'All 13 Servers', included: true },
        { text: 'Unlimited Data', included: true },
        { text: 'High Speed', included: true },
        { text: 'No Ads', included: true },
        { text: 'Premium Priority', included: true },
        { text: 'No Logs Policy', included: true },
      ],
      cta: 'Go Premium',
      popular: true,
    },
    {
      name: 'Standard',
      price: billingCycle === 'monthly' ? '4.99' : '49.99',
      description: 'Great for regular users',
      features: [
        { text: '11 Servers', included: true },
        { text: '10GB Monthly', included: true },
        { text: 'Good Speed', included: true },
        { text: 'Fewer Ads', included: true },
        { text: 'Premium Servers', included: false },
        { text: 'No Logs Policy', included: true },
      ],
      cta: 'Choose Plan',
      popular: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md bg-gray-800 p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${billingCycle === 'monthly' ? 'bg-primary text-white' : 'text-lighttext'}`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${billingCycle === 'yearly' ? 'bg-primary text-white' : 'text-lighttext'}`}
          >
            Yearly Billing (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative rounded-xl overflow-hidden border ${plan.popular ? 'border-primary hover-glow' : 'border-gray-700'} hover:border-primary transition`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-bold text-white mr-3">{plan.name}</h3>
                {plan.popular && <FiAward className="text-yellow-400" />}
              </div>
              <p className="text-lighttext text-sm mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">${plan.price}</span>
                <span className="text-lighttext">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>
              
              <button 
                className={`w-full py-3 rounded-md font-medium mb-6 ${plan.popular ? 'bg-primary hover:bg-glow text-white hover-glow' : 'border border-primary text-primary hover:bg-primary hover:text-white'} transition`}
              >
                {plan.cta}
              </button>
              
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    {feature.included ? (
                      <FiCheck className="text-green-500 mr-2" />
                    ) : (
                      <FiX className="text-red-500 mr-2" />
                    )}
                    <span className={feature.included ? 'text-lighttext' : 'text-gray-600'}>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;