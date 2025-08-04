import PricingTable from '../components/PricingTable';
import { FiCheckCircle, FiHelpCircle } from 'react-icons/fi';

const Pricing = () => {
  const faqs = [
    {
      question: "What's the difference between Free and Premium?",
      answer: "The Free plan gives you access to 7 servers with a 100MB daily limit. Premium unlocks all 13 servers with unlimited data, higher speeds, and no ads."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "We offer a 30-day money-back guarantee for all paid plans if you're not satisfied with our service."
    },
    {
      question: "How many devices can I use with one account?",
      answer: "You can use Cloknet VPN on up to 5 devices simultaneously with a single account."
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent <span className="text-primary">Pricing</span></h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core VPN features with different levels of access.
          </p>
        </div>
        
        <PricingTable />
        
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 overflow-hidden">
                <button className="w-full flex justify-between items-center p-4 text-left focus:outline-none">
                  <span className="font-medium text-white">{faq.question}</span>
                  <FiHelpCircle className="text-primary" />
                </button>
                <div className="p-4 pt-0 text-lighttext">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
              <FiCheckCircle className="text-green-500 mr-2" size={20} />
              <span className="text-lighttext">All plans include our 30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;