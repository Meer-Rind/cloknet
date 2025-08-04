import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { FiShield, FiGlobe, FiZap, FiLock } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: <FiShield size={20} />,
      title: "Military-Grade Encryption",
      description: "Your data is protected with AES-256 encryption, the same standard used by governments and security experts worldwide.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiGlobe size={20} />,
      title: "Global Server Network",
      description: "Access content from anywhere with our high-speed servers in 13 countries worldwide.",
      glowColor: "bg-purple-500"
    },
    {
      icon: <FiZap size={20} />,
      title: "Lightning Fast Speeds",
      description: "Enjoy buffer-free streaming and fast downloads with our optimized network infrastructure.",
      glowColor: "bg-glow"
    },
    {
      icon: <FiLock size={20} />,
      title: "Strict No-Logs Policy",
      description: "We never track, store, or share your online activities. Your privacy is our priority.",
      glowColor: "bg-green-500"
    }
  ];

  return (
    <div>
      <Hero />
      
      <section className="py-16 bg-deepnavy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-primary">Cloknet VPN</span></h2>
            <p className="text-lighttext max-w-2xl mx-auto">
              We provide more than just a VPN service. Our technology is designed to keep you safe, private, and unrestricted online.
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
        </div>
      </section>
      
      <section className="py-16 gradient-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to <span className="text-primary">Get Started</span>?</h2>
            <p className="text-lighttext max-w-2xl mx-auto mb-8">
              Join thousands of satisfied users enjoying secure and private internet access today.
            </p>
            <a 
              href="/pricing" 
              className="inline-block bg-primary hover:bg-glow text-white px-8 py-3 rounded-md font-medium hover-glow transition"
            >
              Choose Your Plan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;