import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiCheckCircle
} from 'react-icons/fi';

const MotionLink = motion(Link);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    const t = setTimeout(() => setSubscribed(false), 3000);
    return () => clearTimeout(t);
  };

  return (
    <footer className="relative text-white mt-12">
      {/* Top accent glow: elegant, subtle */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-[2px] bg-gradient-to-r from-cyan-400 via-[#00CFFF] to-fuchsia-500" />

      <div className="bg-[#011E3C]/60 backdrop-blur-md border-t border-[#1a1a2e] overflow-hidden">
        {/* Ambient blobs for depth */}
        <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -top-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="container mx-auto px-4 py-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Info */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mb-4"
              >
                <motion.div
                  whileHover={{ rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-10 h-10 rounded-full bg-[#00CFFF] flex items-center justify-center shadow-[0_0_10px_#00E5FF] ring-1 ring-white/10"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15l8-8m0 0l-8-8m8 8H4" />
                  </svg>
                </motion.div>
                <span className="text-xl font-bold">Cloknet VPN</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="text-sm text-lighttext leading-relaxed max-w-md"
              >
                Cloknet VPN delivers secure, high-speed, and encrypted internet access globally. Bypass restrictions, protect your data, and browse without limits — all in one powerful app.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex space-x-4 mt-5"
              >
                <SocialIcon label="Twitter" href="#"><FiTwitter /></SocialIcon>
                <SocialIcon label="Facebook" href="#"><FiFacebook /></SocialIcon>
                <SocialIcon label="Instagram" href="#"><FiInstagram /></SocialIcon>
                <SocialIcon label="LinkedIn" href="#"><FiLinkedin /></SocialIcon>
                <SocialIcon label="GitHub" href="#"><FiGithub /></SocialIcon>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <SectionTitle>Quick Links</SectionTitle>
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
              <SectionTitle>Legal</SectionTitle>
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
              <motion.form
                onSubmit={handleSubscribe}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center"
              >
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFFF] w-full sm:w-64"
                  required
                  whileFocus={{ boxShadow: '0 0 0 3px rgba(0,207,255,0.35)' }}
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ y: -1 }}
                  className="bg-[#00CFFF] hover:bg-[#00E5FF] text-sm px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md font-medium transition"
                  disabled={!email}
                >
                  Subscribe
                </motion.button>

                <AnimatePresence>
                  {subscribed && (
                    <motion.span
                      key="subscribed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="sm:ml-3 mt-2 sm:mt-0 text-sm text-green-400 inline-flex items-center gap-1"
                      role="status"
                    >
                      <FiCheckCircle className="inline" /> Subscribed successfully!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </div>
        </div>
      </div>

      {/* Local keyframes for subtle hover underline */}
      <style>{`
        .footer-underline { position: relative; display: inline-flex; }
        .footer-underline::after { content:''; position:absolute; left:0; bottom:-4px; height:2px; width:0; background:linear-gradient(90deg,#00d5ff,#9b5cff); transition: width .35s cubic-bezier(.22,1,.36,1); }
        .footer-underline:hover::after { width:100%; }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important}
        }
      `}</style>
    </footer>
  );
};

const SectionTitle = ({ children }) => (
  <motion.h3
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-lg font-semibold mb-4"
  >
    {children}
  </motion.h3>
);

const FooterLink = ({ to, children }) => (
  <li>
    <MotionLink
      to={to}
      className="text-lighttext footer-underline hover:text-[#00E5FF] transition-colors"
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
    >
      {children}
    </MotionLink>
  </li>
);

const SocialIcon = ({ children, href, label }) => (
  <motion.a
    href={href}
    aria-label={label}
    className="text-lighttext relative"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100" />
    <motion.span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
      whileHover={{ boxShadow: '0 0 0 4px rgba(0,207,255,0.14)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.span>
  </motion.a>
);

export default Footer;
