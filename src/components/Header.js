import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiShield,
  FiServer,
  FiDollarSign,
  FiBook,
  FiMail
} from 'react-icons/fi';
import {
  motion,
  AnimatePresence,
  useScroll,
  useAnimation,
  useSpring,
  useTransform
} from 'framer-motion';

/* ------------------------------------------------------
 * RotatingLink — plays a 360° spin, hard-resets to 0, then navigates
 * ------------------------------------------------------ */
const RotatingLink = ({ to, className = '', children, onAfterNav, ariaCurrent }) => {
  const controls = useAnimation();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await controls.start({
        rotate: 360,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      });
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

/* ------------------------------------------------------
 * Header — glassy, animated, palette-locked
 * ------------------------------------------------------ */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  // smooth progress for nicer bar animation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // shrink on scroll
  const padY = useTransform(smoothProgress, [0, 1], [16, 10]); // px
  const logoSize = useTransform(smoothProgress, [0, 1], [40, 34]); // px

  const nav = useMemo(
    () => [
      { to: '/features', label: 'Features', icon: <FiServer /> },
      { to: '/servers', label: 'Servers', icon: <FiServer /> },
      { to: '/pricing', label: 'Pricing', icon: <FiDollarSign /> },
      { to: '/blog', label: 'Blog', icon: <FiBook /> },
      { to: '/contact', label: 'Contact', icon: <FiMail /> }
    ],
    []
  );

  const isActive = (path) => location.pathname.startsWith(path);

  // lock scroll behind mobile sheet
  useEffect(() => {
    if (isOpen) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = '';
    return () => (document.documentElement.style.overflow = '');
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Scroll progress bar — Neon → Burning */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left"
        style={{
          scaleX: smoothProgress,
          background: 'linear-gradient(90deg, #18A9FF, #00C7FF)'
        }}
      />

      {/* Glass container */}
      <motion.div
        className="relative backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(2, 26, 43, 0.72)', // DeepBlue1 with alpha
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
        }}
      >
        {/* subtle conic glow border using palette */}
        <div className="pointer-events-none absolute inset-0 rounded-b-2xl [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <div
            className="absolute -inset-px rounded-b-2xl opacity-30"
            style={{
              background:
                'conic-gradient(from 180deg at 50% 0%, rgba(24,169,255,0.18), transparent, rgba(0,199,255,0.16), transparent, rgba(24,169,255,0.18))'
            }}
          />
        </div>

        <motion.div className="container mx-auto px-4" style={{ paddingTop: padY, paddingBottom: padY }}>
          <div className="flex justify-between items-center">
            {/* Brand */}
            <RotatingLink
              to="/"
              className="relative flex items-center gap-2 group"
              ariaCurrent={location.pathname === '/' ? 'page' : undefined}
            >
              {/* hover aura */}
              <span
                className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: 'rgba(0,199,255,0.10)', filter: 'blur(14px)' }}
              />
              <motion.div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: logoSize,
                  height: logoSize,
                  backgroundColor: '#00C7FF', // BurningBlue
                  boxShadow: '0 0 16px rgba(0,199,255,0.65)',
                  border: '1px solid rgba(24,169,255,0.25)'
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                <FiShield style={{ color: '#021A2B' /* DeepBlue1 for contrast */ }} size={18} />
              </motion.div>
              <span
                className="font-semibold text-xl tracking-wide transition-colors"
                style={{ color: '#18A9FF' }}
              >
                Cloknet VPN
              </span>
            </RotatingLink>

            {/* Desktop Navigation */}
            <DesktopNav nav={nav} isActive={isActive} />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ rotate: 360, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setIsOpen((v) => !v)}
                className="transition p-2 rounded-md focus:outline-none"
                style={{
                  color: '#18A9FF',
                  boxShadow: isOpen ? '0 0 0 2px rgba(24,169,255,0.45)' : 'none'
                }}
                aria-label="Toggle navigation"
                aria-expanded={isOpen}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Sheet */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden mt-3 pb-3"
              >
                <nav
                  className="flex flex-col overflow-hidden rounded-xl border backdrop-blur-xl"
                  style={{
                    borderColor: 'rgba(24,169,255,0.18)',
                    background: 'linear-gradient(180deg, rgba(5,52,88,0.70), rgba(2,26,43,0.70))'
                  }}
                >
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
        </motion.div>
      </motion.div>

      {/* Utilities */}
      <style>{`
        .nav-underline:after {
          content:'';
          position:absolute;
          left:0; bottom:-6px;
          height:2px; width:0;
          transition:width .35s cubic-bezier(.22,1,.36,1);
          background: linear-gradient(90deg, #18A9FF, #00C7FF);
        }
        .nav-underline:hover:after { width:100% }

        @media (pointer: fine) {
          .magnet:hover { transform: translateY(-1px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </header>
  );
};

/* ------------------------------------------------------
 * DesktopNav with Active Glow Pill
 * ------------------------------------------------------ */
const DesktopNav = ({ nav, isActive }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const [pill, setPill] = useState({ left: 0, width: 0, show: false });

  // measure after route change
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const activeIndex = nav.findIndex((n) => isActive(n.to));
    if (activeIndex < 0) {
      setPill((p) => ({ ...p, show: false }));
      return;
    }

    const el = itemRefs.current[activeIndex];
    if (!el) return;

    const cRect = c.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    setPill({ left: b.left - cRect.left, width: b.width, show: true });
  }, [location.pathname, nav, isActive]);

  return (
    <nav className="hidden md:flex items-center gap-2 relative" ref={containerRef}>
      {/* Active pill */}
      <AnimatePresence>
        {pill.show && (
          <motion.span
            key={`${pill.left}-${pill.width}`}
            initial={{ opacity: 0, x: pill.left, width: pill.width }}
            animate={{ opacity: 0.20, x: pill.left, width: pill.width }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-8 rounded-lg absolute top-1/2 -translate-y-1/2 -z-10"
            style={{
              background: 'linear-gradient(90deg, rgba(24,169,255,0.28), rgba(0,199,255,0.28))',
              boxShadow: '0 8px 24px rgba(0,199,255,0.12)'
            }}
          />
        )}
      </AnimatePresence>

      {nav.map((item, i) => (
        <span key={item.to} ref={(el) => (itemRefs.current[i] = el)}>
          <NavItem to={item.to} icon={item.icon} active={isActive(item.to)}>
            {item.label}
          </NavItem>
        </span>
      ))}
    </nav>
  );
};

/* ------------------------------------------------------
 * Desktop nav item (RotatingLink)
 * ------------------------------------------------------ */
const NavItem = ({ to, icon, children, active }) => (
  <RotatingLink
    to={to}
    ariaCurrent={active ? 'page' : undefined}
    className={`magnet relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors nav-underline focus:outline-none`}
    style={{
      color: active ? '#18A9FF' : '#00C7FF',
      // soft inner border tint when active
      boxShadow: active ? 'inset 0 0 0 1px rgba(24,169,255,0.25)' : 'none'
    }}
  >
    <span className="text-base" style={{ color: active ? '#18A9FF' : '#00C7FF' }}>
      {icon}
    </span>
    <span>{children}</span>
  </RotatingLink>
);

/* ------------------------------------------------------
 * Mobile nav item (RotatingLink)
 * ------------------------------------------------------ */
const NavItemMobile = ({ to, icon, children, setIsOpen, active }) => (
  <RotatingLink
    to={to}
    onAfterNav={() => setIsOpen(false)}
    ariaCurrent={active ? 'page' : undefined}
    className="flex items-center gap-3 px-4 py-3 text-base transition-colors"
    style={{
      color: active ? '#18A9FF' : '#00C7FF',
      borderBottom: '1px solid rgba(24,169,255,0.10)'
    }}
  >
    <span className="text-lg" style={{ color: active ? '#18A9FF' : '#00C7FF' }}>
      {icon}
    </span>
    <span>{children}</span>
  </RotatingLink>
);

export default Header;
