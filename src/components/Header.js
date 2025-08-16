import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  FiMenu,
  FiX,
  FiShield,
  FiServer,
  FiDollarSign,
  FiBook,
  FiMail
} from 'react-icons/fi';
import { motion, AnimatePresence, useScroll, useAnimation } from 'framer-motion';

// Reusable rotating link that spins 360° then resets before navigating
const RotatingLink = ({ to, className = '', children, onAfterNav, ariaCurrent }) => {
  const controls = useAnimation();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    // Prevent immediate navigation so the spin plays and then resets to 0
    e.preventDefault();
    try {
      await controls.start({ rotate: 360, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } });
      // Hard reset to 0deg so elements never "stick" between routes
      await controls.set({ rotate: 0 });
    } finally {
      navigate(to);
      onAfterNav && onAfterNav();
    }
  };

  return (
    <motion.a
      href={to}
      role="link"
      aria-current={ariaCurrent}
      onClick={handleClick}
      animate={controls}
      className={`transform-gpu will-change-transform ${className}`}
      style={{ transformOrigin: '50% 50%' }}
    >
      {children}
    </motion.a>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const nav = [
    { to: '/features', label: 'Features', icon: <FiServer /> },
    { to: '/servers', label: 'Servers', icon: <FiServer /> },
    { to: '/pricing', label: 'Pricing', icon: <FiDollarSign /> },
    { to: '/blog', label: 'Blog', icon: <FiBook /> },
    { to: '/contact', label: 'Contact', icon: <FiMail /> }
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50">
      {/* Subtle scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-[#00CFFF] to-fuchsia-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="backdrop-blur-lg bg-[#011E3C]/60 shadow-md shadow-black/20 relative">
        {/* soft conic glow border (more subtle) */}
        <div className="pointer-events-none absolute inset-0 rounded-b-2xl [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <div className="absolute -inset-px rounded-b-2xl bg-[conic-gradient(from_180deg_at_50%_0%,rgba(0,207,255,0.18),transparent,rgba(255,0,128,0.12),transparent,rgba(0,207,255,0.18))] opacity-25" />
        </div>

        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Brand (spin + reset, but still a Link) */}
            <RotatingLink
              to="/"
              className="relative flex items-center space-x-2 group"
              ariaCurrent={location.pathname === '/' ? 'page' : undefined}
            >
              <span className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00CFFF]/10 blur-xl" />
              <div className="w-10 h-10 rounded-full bg-[#00CFFF] flex items-center justify-center shadow-[0_0_10px_#00E5FF] ring-1 ring-white/10">
                <FiShield className="text-white text-xl" />
              </div>
              <span className="text-white font-semibold text-xl tracking-wide group-hover:text-[#B9F6FF] transition-colors">
                Cloknet VPN
              </span>
            </RotatingLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {nav.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  active={isActive(item.to)}
                >
                  {item.label}
                </NavItem>
              ))}
            </nav>

            {/* Mobile Menu Button (tap spin returns automatically) */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ rotate: 360, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setIsOpen((v) => !v)}
                className="text-white hover:text-[#00E5FF] focus:outline-none transition p-2 rounded-md focus-visible:ring-2 focus-visible:ring-[#00CFFF]/60"
                aria-label="Toggle navigation"
                aria-expanded={isOpen}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden mt-3 pb-3"
              >
                <nav className="flex flex-col divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10 bg-[#071C33]/70 backdrop-blur">
                  {nav.map((item) => (
                    <NavItemMobile
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      setIsOpen={setIsOpen}
                      active={isActive(item.to)}
                    >
                      {item.label}
                    </NavItemMobile>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        .nav-underline:after{content:'';position:absolute;left:0;bottom:-6px;height:2px;width:0;transition:width .35s cubic-bezier(.22,1,.36,1);background:linear-gradient(90deg,#00d5ff,#9b5cff)}
        .nav-underline:hover:after{width:100%}
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important}
        }
      `}</style>
    </header>
  );
};

// Desktop nav item (uses RotatingLink to guarantee reset)
const NavItem = ({ to, icon, children, active }) => (
  <RotatingLink
    to={to}
    ariaCurrent={active ? 'page' : undefined}
    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors nav-underline ${
      active ? 'text-[#B9F6FF]' : 'text-white'
    } hover:text-[#00E5FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CFFF]/60`}
  >
    <span className="text-base">{icon}</span>
    <span>{children}</span>
  </RotatingLink>
);

// Mobile nav item (spins, resets, and closes menu after navigation)
const NavItemMobile = ({ to, icon, children, setIsOpen, active }) => (
  <RotatingLink
    to={to}
    onAfterNav={() => setIsOpen(false)}
    ariaCurrent={active ? 'page' : undefined}
    className={`flex items-center gap-3 px-4 py-3 text-base transition-colors ${
      active ? 'text-[#B9F6FF]' : 'text-white'
    } hover:text-[#00E5FF]`}
  >
    <span className="text-lg">{icon}</span>
    <span>{children}</span>
  </RotatingLink>
);

export default Header;
