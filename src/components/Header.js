import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiShield,
  FiServer,
  FiDollarSign,
  FiBook,
  FiMail,
  FiSearch,
  FiHome
} from 'react-icons/fi';
import {
  motion,
  AnimatePresence,
  useScroll,
  useAnimation,
  useSpring,
  useTransform
} from 'framer-motion';

/* ---------------- Palette ---------------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';
const ease = [0.22, 1, 0.36, 1];

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
        transition: { duration: 0.45, ease }
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
 * NEW CONCEPT: Header + Floating Neon Dock + Command Palette
 * ------------------------------------------------------ */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);        // mobile sheet
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');

  const { scrollYProgress } = useScroll();
  const location = useLocation();

  // Smooth progress for the top bar
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Bar size changes on scroll
  const padY = useTransform(smoothProgress, [0, 1], [18, 12]); // px
  const logoSize = useTransform(smoothProgress, [0, 1], [42, 34]); // px

  // NAV MODEL (icons + labels)
  const nav = useMemo(
    () => [
      { to: '/',         label: 'Home',     icon: <FiHome /> },
      { to: '/features', label: 'Features', icon: <FiServer /> },
      { to: '/servers',  label: 'Servers',  icon: <FiServer /> },
      { to: '/pricing',  label: 'Pricing',  icon: <FiDollarSign /> },
      { to: '/blog',     label: 'Blog',     icon: <FiBook /> },
      { to: '/contact',  label: 'Contact',  icon: <FiMail /> }
    ],
    []
  );

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  // Lock scroll behind mobile sheet or palette
  useEffect(() => {
    const open = isOpen || paletteOpen;
    if (open) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = '';
    return () => (document.documentElement.style.overflow = '');
  }, [isOpen, paletteOpen]);

  // Keyboard: Ctrl/Cmd + K toggles Command Palette
  useEffect(() => {
    const onKey = (e) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      if ((isMac && e.metaKey && e.key.toLowerCase() === 'k') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Scroll progress bar — Neon → Burning */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left"
        style={{
          scaleX: smoothProgress,
          background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`
        }}
      />

      {/* Glass top bar */}
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
                `conic-gradient(from 180deg at 50% 0%, ${hexA(NeonBlue,0.18)}, transparent, ${hexA(BurningBlue,0.16)}, transparent, ${hexA(NeonBlue,0.18)})`
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
                style={{ backgroundColor: hexA(BurningBlue,0.10), filter: 'blur(14px)' }}
              />
              <motion.div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: logoSize,
                  height: logoSize,
                  backgroundColor: BurningBlue,
                  boxShadow: `0 0 16px ${hexA(BurningBlue,0.65)}`,
                  border: `1px solid ${hexA(NeonBlue,0.25)}`
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                <FiShield style={{ color: DeepBlue1 }} size={18} />
              </motion.div>
              <span className="font-semibold text-xl tracking-wide" style={{ color: NeonBlue }}>
                Cloknet VPN
              </span>
            </RotatingLink>

            {/* Desktop Quick Actions (Search) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setPaletteOpen(true)}
                className="group flex items-center gap-2 px-3 py-2 text-sm rounded-lg"
                style={{ color: NeonBlue, border: `1px solid ${hexA(NeonBlue,0.25)}` }}
              >
                <FiSearch />
                <span className="opacity-80">Search</span>
                <kbd
                  className="ml-2 px-1.5 py-0.5 text-xs rounded border"
                  style={{ borderColor: hexA(NeonBlue,0.25), color: BurningBlue }}
                >
                  Ctrl / ⌘ + K
                </kbd>
              </button>
              <div className="md:hidden" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ rotate: 360, scale: 0.95 }}
                transition={{ duration: 0.35, ease }}
                onClick={() => setIsOpen((v) => !v)}
                className="transition p-2 rounded-md focus:outline-none"
                style={{
                  color: NeonBlue,
                  boxShadow: isOpen ? `0 0 0 2px ${hexA(NeonBlue,0.45)}` : 'none',
                  border: `1px solid ${hexA(NeonBlue,0.18)}`
                }}
                aria-label="Toggle navigation"
                aria-expanded={isOpen}
              >
                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* FLOATING NEON DOCK (desktop) */}
      <div className="hidden md:block pointer-events-none">
        <NeonDock nav={nav} isActive={isActive} />
      </div>

      {/* Mobile Navigation Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
            className="md:hidden"
          >
            <nav
              className="mx-4 mt-3 mb-4 flex flex-col overflow-hidden rounded-xl border backdrop-blur-xl"
              style={{
                borderColor: hexA(NeonBlue,0.18),
                background: `linear-gradient(180deg, ${hexA(DeepBlue2,0.70)}, ${hexA(DeepBlue1,0.70)})`
              }}
            >
              <div className="p-3">
                <button
                  onClick={() => setPaletteOpen(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg"
                  style={{ color: NeonBlue, border: `1px solid ${hexA(NeonBlue,0.25)}` }}
                >
                  <FiSearch />
                  <span className="opacity-90">Search pages, servers, posts…</span>
                </button>
              </div>
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

      {/* COMMAND PALETTE */}
      <CommandPalette
        open={paletteOpen}
        setOpen={setPaletteOpen}
        query={query}
        setQuery={setQuery}
        items={nav}
      />

      {/* Utilities */}
      <style>{`
        .dock-mask {
          -webkit-mask-image: radial-gradient(16px at left 50%, transparent 98%, black 100%),
                              radial-gradient(16px at right 50%, transparent 98%, black 100%);
          -webkit-mask-size: 51% 100%;
          -webkit-mask-position: left, right;
          -webkit-mask-repeat: no-repeat;
        }
        .nav-underline:after {
          content:'';
          position:absolute;
          left:0; bottom:-6px;
          height:2px; width:0;
          transition:width .35s cubic-bezier(.22,1,.36,1);
          background: linear-gradient(90deg, ${NeonBlue}, ${BurningBlue});
        }
        .nav-underline:hover:after { width:100% }

        @media (pointer: fine) {
          .magnet:hover { transform: translateY(-1px); }
        }
        @media (prefers-reduced-motion: reduce) {
          *{
            animation-duration:0.01ms !important;
            animation-iteration-count:1 !important;
            transition-duration:0.01ms !important;
            scroll-behavior:auto !important;
          }
        }
      `}</style>
    </header>
  );
};

/* ------------------------------------------------------
 * Floating Neon Dock (Desktop)
 * ------------------------------------------------------ */
const NeonDock = ({ nav, isActive }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const location = useLocation();
  const [pill, setPill] = useState({ left: 0, width: 0, show: false });

  // measure after route change & on resize
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
    setPill({ left: b.left - cRect.left + 8, width: b.width - 16, show: true }); // inset for padding
  }, [location.pathname, nav, isActive]);

  useEffect(() => {
    const onResize = () => {
      const c = containerRef.current;
      if (!c) return;
      const activeIndex = nav.findIndex((n) => isActive(n.to));
      if (activeIndex < 0) return;
      const el = itemRefs.current[activeIndex];
      if (!el) return;
      const cRect = c.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setPill({ left: b.left - cRect.left + 8, width: b.width - 16, show: true });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [nav, isActive]);

  return (
    <div className="container mx-auto px-4">
      <div className="relative flex justify-center">
        <div
          ref={containerRef}
          className="pointer-events-auto mt-3 dock-mask"
          style={{
            background: `linear-gradient(180deg, ${hexA(DeepBlue2,0.88)}, ${hexA(DeepBlue1,0.88)})`,
            border: `1px solid ${hexA(NeonBlue,0.18)}`,
            boxShadow: `0 12px 36px ${hexA(BurningBlue,0.20)}`,
            backdropFilter: 'blur(12px)',
            borderRadius: 9999,
            padding: 6,
            display: 'inline-flex',
            position: 'relative'
          }}
        >
          {/* Active pill */}
          <AnimatePresence>
            {pill.show && (
              <motion.span
                key={`${pill.left}-${pill.width}`}
                initial={{ opacity: 0, x: pill.left, width: pill.width }}
                animate={{ opacity: 0.25, x: pill.left, width: pill.width }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="h-10 rounded-full absolute top-1/2 -translate-y-1/2 -z-10"
                style={{
                  background: `linear-gradient(90deg, ${hexA(NeonBlue,0.28)}, ${hexA(BurningBlue,0.28)})`,
                  boxShadow: `0 8px 24px ${hexA(BurningBlue,0.14)}`
                }}
              />
            )}
          </AnimatePresence>

          {/* Items */}
          <ul className="flex items-center gap-1">
            {nav.map((item, i) => (
              <li key={item.to} ref={(el) => (itemRefs.current[i] = el)}>
                <DockItem to={item.to} active={isActive(item.to)} icon={item.icon}>
                  {item.label}
                </DockItem>
              </li>
            ))}
            {/* Search button inside dock */}
            <li>
              <DockSearchButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/* Dock item (RotatingLink) */
const DockItem = ({ to, icon, children, active }) => (
  <RotatingLink
    to={to}
    ariaCurrent={active ? 'page' : undefined}
    className="relative flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition-colors nav-underline focus:outline-none"
    style={{
      color: active ? NeonBlue : BurningBlue
    }}
  >
    <span className="text-base" style={{ color: active ? NeonBlue : BurningBlue }}>
      {icon}
    </span>
    <span className="hidden lg:inline">{children}</span>
  </RotatingLink>
);

/* Small search button in dock */
const DockSearchButton = () => {
  const [tick, setTick] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => !t), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <button
      onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))} // trigger palette
      className="relative flex items-center gap-2 px-3 lg:px-4 h-10 rounded-full text-sm"
      style={{
        color: NeonBlue,
        border: `1px solid ${hexA(NeonBlue,0.2)}`,
        background: `linear-gradient(180deg, ${hexA(DeepBlue2,0.6)}, ${hexA(DeepBlue1,0.6)})`
      }}
    >
      <FiSearch />
      <span className="hidden lg:inline opacity-80">{tick ? 'Search anything' : 'Ctrl / ⌘ + K'}</span>
    </button>
  );
};

/* ------------------------------------------------------
 * Command Palette
 * ------------------------------------------------------ */
const CommandPalette = ({ open, setOpen, query, setQuery, items }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.to.toLowerCase().includes(q));
  }, [query, items]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHover((h) => Math.min(h + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHover((h) => Math.max(h - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const pick = filtered[hover] || filtered[0];
        if (pick) {
          setOpen(false);
          navigate(pick.to);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, hover, navigate, setOpen]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="palette-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70]"
        onClick={() => setOpen(false)}
        style={{ background: 'rgba(0,0,0,0.45)' }}
      />
      <motion.div
        key="palette"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.18, ease }}
        className="fixed z-[80] left-1/2 top-[14vh] w-[92vw] max-w-xl -translate-x-1/2 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${hexA(DeepBlue2,0.88)}, ${hexA(DeepBlue1,0.92)})`,
          border: `1px solid ${hexA(NeonBlue,0.28)}`,
          boxShadow: `0 30px 80px ${hexA(BurningBlue,0.25)}`,
          backdropFilter: 'blur(14px)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: hexA(NeonBlue,0.18) }}>
          <FiSearch style={{ color: BurningBlue }} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages…"
            className="w-full bg-transparent outline-none text-base"
            style={{ color: NeonBlue }}
          />
          <kbd className="px-1.5 py-0.5 text-xs rounded border" style={{ borderColor: hexA(NeonBlue,0.25), color: BurningBlue }}>
            Esc
          </kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="px-4 py-4 text-sm opacity-80" style={{ color: NeonBlue }}>
              No results for “{query}”
            </li>
          ) : (
            filtered.map((it, i) => (
              <li key={it.to}>
                <button
                  onMouseEnter={() => setHover(i)}
                  onClick={() => { setOpen(false); setQuery(''); navigate(it.to); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  style={{
                    color: NeonBlue,
                    background: i === hover ? hexA(NeonBlue,0.10) : 'transparent'
                  }}
                >
                  <span style={{ color: BurningBlue }} className="text-lg">{it.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm">{it.label}</div>
                    <div className="text-xs opacity-70">{it.to}</div>
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

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
      color: active ? NeonBlue : BurningBlue,
      borderBottom: `1px solid ${hexA(NeonBlue,0.10)}`
    }}
  >
    <span className="text-lg" style={{ color: active ? NeonBlue : BurningBlue }}>
      {icon}
    </span>
    <span>{children}</span>
  </RotatingLink>
);

/* ---------------- helpers ---------------- */
function hexA(hex, a) {
  // hex like #RRGGBB → rgba
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export default Header;
