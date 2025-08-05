import { useState } from 'react';
import { FiCheck, FiX, FiAward } from 'react-icons/fi';

const PricingTable = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: billingCycle === 'monthly' ? '0' : '0',
      description: 'Essential VPN security for casual use — no commitment required.',
      features: [
        { text: 'Access to 7 Global Servers', included: true },
        { text: '100MB Daily Data Limit', included: true },
        { text: 'Standard Connection Speed', included: true },
        { text: 'Supported by Ads', included: true },
        { text: 'Premium Server Access', included: false },
        { text: 'No-Logs Privacy Guarantee', included: false },
      ],
      cta: 'Try for Free',
      popular: false,
      color: 'from-blue-800/40 via-blue-900/40 to-indigo-900/50',
      glow: 'hover:shadow-[0_0_25px_#3b82f680]',
      button: 'border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white',
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? '9.99' : '99.99',
      description: 'Elite protection, unlimited data & blazing speeds — perfect for total freedom.',
      features: [
        { text: 'All 13 Servers Worldwide', included: true },
        { text: 'Unlimited Data & Bandwidth', included: true },
        { text: 'Lightning-Fast Speeds', included: true },
        { text: '100% Ad-Free Experience', included: true },
        { text: 'Premium Server Priority', included: true },
        { text: 'Strict No-Logs Policy', included: true },
      ],
      cta: 'Upgrade to Premium',
      popular: true,
      color: 'from-cyan-800/50 via-fuchsia-800/40 to-indigo-900/40',
      glow: 'hover:shadow-[0_0_45px_#00CFFF99]',
      button: 'bg-primary text-black hover:bg-white hover:text-primary shadow-lg',
    },
    {
      name: 'Standard',
      price: billingCycle === 'monthly' ? '4.99' : '49.99',
      description: 'A balanced VPN for speed, privacy, and value — ideal for regular use.',
      features: [
        { text: '11 Worldwide Servers', included: true },
        { text: '10GB Monthly Data', included: true },
        { text: 'Fast Speeds for Browsing', included: true },
        { text: 'Minimal Ads Experience', included: true },
        { text: 'Premium Server Access', included: false },
        { text: 'No-Logs Privacy Guarantee', included: true },
      ],
      cta: 'Choose Standard',
      popular: false,
      color: 'from-teal-700/40 via-emerald-800/40 to-teal-900/50',
      glow: 'hover:shadow-[0_0_25px_#10b98180]',
      button: 'border border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-white',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-white/10 backdrop-blur-md border border-slate-300/30 p-1 shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              billingCycle === 'monthly'
                ? 'bg-primary text-black shadow'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              billingCycle === 'yearly'
                ? 'bg-primary text-black shadow'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            Yearly Billing <span className="text-xs opacity-70">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl bg-gradient-to-br ${plan.color} p-6 md:p-8 transition-all duration-500 group shadow-lg hover:scale-[1.02] ${plan.glow}`}
          >
            {/* Badge */}
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg animate-pulse z-10 shadow-md">
                MOST POPULAR
              </div>
            )}

            {/* Title */}
            <div className="flex items-center mb-5">
              <h3 className="text-2xl font-bold text-white mr-2">{plan.name}</h3>
              {plan.popular && <FiAward className="text-yellow-300 w-5 h-5" />}
            </div>

            {/* Description */}
            <p className="text-slate-100 text-sm mb-6 leading-relaxed">{plan.description}</p>

            {/* Pricing */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">${plan.price}</span>
              <span className="text-slate-300 text-base">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
            </div>

            {/* CTA */}
            <button className={`w-full py-3 rounded-lg font-semibold tracking-wide text-sm transition-all duration-300 ${plan.button}`}>
              {plan.cta}
            </button>

            {/* Features */}
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm">
                  {feature.included ? (
                    <FiCheck className="text-green-400 mr-2" />
                  ) : (
                    <FiX className="text-red-400 mr-2" />
                  )}
                  <span className={`${feature.included ? 'text-white' : 'text-slate-400 line-through'}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
