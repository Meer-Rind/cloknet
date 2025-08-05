import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiGithub,
} from 'react-icons/fi';

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
    <footer className="bg-[#011E3C]/60 backdrop-blur-md text-white border-t border-[#1a1a2e] mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00CFFF] flex items-center justify-center shadow-[0_0_10px_#00E5FF]">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15l8-8m0 0l-8-8m8 8H4"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">Cloknet VPN</span>
            </div>
            <p className="text-sm text-lighttext leading-relaxed max-w-md">
              Cloknet VPN delivers secure, high-speed, and encrypted internet access
              globally. Bypass restrictions, protect your data, and browse without
              limits — all in one powerful app.
            </p>
            <div className="flex space-x-4 mt-5">
              <SocialIcon icon={<FiTwitter />} />
              <SocialIcon icon={<FiFacebook />} />
              <SocialIcon icon={<FiInstagram />} />
              <SocialIcon icon={<FiLinkedin />} />
              <SocialIcon icon={<FiGithub />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/features">Features</FooterLink>
              <FooterLink to="/servers">Servers</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-[#1f2937]">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <p className="text-sm text-lighttext">
              &copy; {new Date().getFullYear()} Cloknet VPN. All rights reserved.
            </p>

            {/* Subscribe Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFFF] w-full sm:w-64"
                required
              />
              <button
                type="submit"
                className="bg-[#00CFFF] hover:bg-[#00E5FF] text-sm px-4 py-2 rounded-r-md font-medium transition"
              >
                Subscribe
              </button>
              {subscribed && (
                <span className="mt-2 sm:mt-0 sm:ml-3 text-sm text-green-400">
                  ✅ Subscribed successfully!
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-lighttext hover:text-[#00E5FF] transition">
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="text-lighttext hover:text-[#00E5FF] hover:scale-110 transition-transform duration-200"
  >
    {icon}
  </a>
);

export default Footer;
