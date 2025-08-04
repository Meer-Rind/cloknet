import FeatureCard from '../components/FeatureCard';
import { 
  FiShield, FiGlobe, FiZap, FiLock, 
  FiEyeOff, FiSmartphone, FiUser, FiServer 
} from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiShield size={20} />,
      title: "AES-256 Encryption",
      description: "Military-grade encryption protects all your internet traffic from hackers and surveillance.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiGlobe size={20} />,
      title: "Global Network",
      description: "13 high-speed servers across 3 continents for reliable and fast connections.",
      glowColor: "bg-purple-500"
    },
    {
      icon: <FiZap size={20} />,
      title: "Unlimited Bandwidth",
      description: "No throttling or data caps - stream, download, and browse without limits.",
      glowColor: "bg-glow"
    },
    {
      icon: <FiLock size={20} />,
      title: "No Activity Logs",
      description: "We never log your online activities, ensuring complete privacy.",
      glowColor: "bg-green-500"
    },
    {
      icon: <FiEyeOff size={20} />,
      title: "Ad & Tracker Blocking",
      description: "Built-in protection against ads, trackers, and malicious websites.",
      glowColor: "bg-yellow-500"
    },
    {
      icon: <FiSmartphone size={20} />,
      title: "Multi-Device Support",
      description: "Protect all your devices with a single account (up to 5 simultaneous connections).",
      glowColor: "bg-red-500"
    },
    {
      icon: <FiUser size={20} />,
      title: "Anonymous Browsing",
      description: "Hide your real IP address and location to browse anonymously.",
      glowColor: "bg-blue-500"
    },
    {
      icon: <FiServer size={20} />,
      title: "Kill Switch",
      description: "Automatically blocks internet access if VPN connection drops unexpectedly.",
      glowColor: "bg-pink-500"
    }
  ];

  return (
    <div className="py-16">
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cloknet VPN <span className="text-primary">Features</span></h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Discover the powerful features that make Cloknet VPN the best choice for your online privacy and security.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              glowColor={feature.glowColor}
            />
          ))}
        </div>
      </section>
      
      <section className="container mx-auto px-4 mt-16">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-700">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions about our features?</h2>
              <p className="text-lighttext mb-6">
                Our support team is available 24/7 to help you understand how Cloknet VPN can meet your specific needs.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-primary hover:bg-glow text-white px-6 py-2 rounded-md font-medium hover-glow transition"
              >
                Contact Support
              </a>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-white">Feature Comparison</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="text-lighttext">Free Plan</span>
                    <span className="text-lighttext">7/13 servers, 100MB/day</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-lighttext">Standard Plan</span>
                    <span className="text-lighttext">11/13 servers, 10GB/month</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-lighttext">Premium Plan</span>
                    <span className="text-primary font-medium">All features unlocked</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;