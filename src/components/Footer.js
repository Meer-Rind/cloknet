import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-deepnavy border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l8-8m0 0l-8-8m8 8H4" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">Cloknet VPN</span>
            </div>
            <p className="text-lighttext text-sm">
              Secure your internet connection with our high-speed VPN service. Protect your privacy and access content from anywhere.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-lighttext hover:text-glow transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-lighttext hover:text-glow transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-lighttext hover:text-glow transition">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-lighttext hover:text-glow transition">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-lighttext hover:text-glow transition">
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-lighttext hover:text-white text-sm transition">Features</Link></li>
              <li><Link to="/servers" className="text-lighttext hover:text-white text-sm transition">Servers</Link></li>
              <li><Link to="/pricing" className="text-lighttext hover:text-white text-sm transition">Pricing</Link></li>
              <li><Link to="/blog" className="text-lighttext hover:text-white text-sm transition">Blog</Link></li>
              <li><Link to="/contact" className="text-lighttext hover:text-white text-sm transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-lighttext hover:text-white text-sm transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-lighttext hover:text-white text-sm transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-lighttext text-sm">
              &copy; {new Date().getFullYear()} Cloknet VPN. All rights reserved.
            </p>
            
            <form onSubmit={handleSubscribe} className="mt-4 md:mt-0">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-glow text-white px-4 py-2 rounded-r-md text-sm font-medium transition"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-sm text-green-400">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;