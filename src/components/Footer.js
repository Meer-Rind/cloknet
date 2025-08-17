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

/* --------- Palette --------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

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
    <footer className="relative mt-12" style={{ color: NeonBlue, background: DeepBlue1 }}>
      {/* Top accent line (Neon → Burning) */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-1 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})` }}
      />

      <div
        className="backdrop-blur-xl overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${DeepBlue2}B3, ${DeepBlue1}B3)`,
          borderTop: `1px solid ${NeonBlue}26`,
          boxShadow: '0 -10px 40px rgba(0,199,255,0.08)'
        }}
      >
        {/* Ambient blobs (palette only) */}
        <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full blur-3xl"
             style={{ background: 'rgba(24,169,255,0.12)' }} />
        <div className="pointer-events-none absolute -right-24 -top-10 h-56 w-56 rounded-full blur-3xl"
             style={{ background: 'rgba(0,199,255,0.12)' }} />

        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Info */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <motion.div
                  whileHover={{ rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: BurningBlue,
                    color: DeepBlue1,
                    boxShadow: '0 0 14px rgba(0,199,255,0.55)',
                    border: `1px solid ${NeonBlue}29`
                  }}
                >
                  {/* simple shield glyph */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" />
                  </svg>
                </motion.div>
                <span className="text-xl font-bold" style={{ color: BurningBlue }}>Cloknet VPN</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ color: `${NeonBlue}` }}
                className="text-sm leading-relaxed max-w-md"
              >
                Cloknet VPN delivers secure, high-speed, encrypted internet access globally. Bypass restrictions, protect your data, and browse without limits — all in one powerful app.
              </motion.p>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="flex flex-wrap gap-3 mt-5"
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
          <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${NeonBlue}26` }}>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
              <p className="text-sm" style={{ color: `${NeonBlue}` }}>
                &copy; {new Date().getFullYear()} Cloknet VPN. All rights reserved.
              </p>

              {/* Subscribe Form */}
              <motion.form
                onSubmit={handleSubscribe}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-xl"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full sm:flex-1 rounded-md sm:rounded-r-none px-4 py-2 text-sm outline-none"
                    whileFocus={{ boxShadow: '0 0 0 3px rgba(24,169,255,0.35)' }}
                    style={{
                      background: 'rgba(2,26,43,0.55)',
                      border: `1px solid ${NeonBlue}29`,
                      color: NeonBlue,
                      boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.06)'
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ y: -1 }}
                    className="rounded-md sm:rounded-l-none px-5 py-2 text-sm font-semibold transition"
                    disabled={!email}
                    style={{
                      background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                      color: DeepBlue1,
                      boxShadow: '0 0 18px rgba(0,199,255,0.20)'
                    }}
                  >
                    Subscribe
                  </motion.button>
                </div>

                <AnimatePresence>
                  {subscribed && (
                    <motion.span
                      key="subscribed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="inline-flex items-center gap-1 mt-2"
                      role="status"
                      style={{ color: BurningBlue }}
                    >
                      <FiCheckCircle /> Subscribed successfully!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </div>
        </div>
      </div>

      {/* Local keyframes & underline */}
      <style>{`
        .footer-underline { position: relative; display: inline-flex; }
        .footer-underline::after {
          content:''; position:absolute; left:0; bottom:-4px; height:2px; width:0;
          background: linear-gradient(90deg, ${NeonBlue}, ${BurningBlue});
          transition: width .35s cubic-bezier(.22,1,.36,1);
        }
        .footer-underline:hover::after { width:100%; }

        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; scroll-behavior:auto !important}
        }
      `}</style>
    </footer>
  );
};

/* --- Subcomponents (palette-consistent) --- */

const SectionTitle = ({ children }) => (
  <motion.h3
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-lg font-semibold mb-4"
    style={{ color: BurningBlue }}
  >
    {children}
  </motion.h3>
);

const FooterLink = ({ to, children }) => (
  <li>
    <MotionLink
      to={to}
      className="footer-underline inline-block"
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      style={{ color: NeonBlue }}
      onMouseEnter={(e)=>{ e.currentTarget.style.color = BurningBlue; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.color = NeonBlue; }}
    >
      {children}
    </MotionLink>
  </li>
);

const SocialIcon = ({ children, href, label }) => (
  <motion.a
    href={href}
    aria-label={label}
    className="relative"
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    style={{ color: BurningBlue }}
  >
    <motion.span
      className="inline-flex h-10 w-10 items-center justify-center rounded-full"
      whileHover={{ boxShadow: '0 0 0 6px rgba(0,199,255,0.12)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{
        background: 'rgba(2,26,43,0.55)',
        border: `1px solid ${NeonBlue}26`
      }}
    >
      {children}
    </motion.span>
  </motion.a>
);

export default Footer;
