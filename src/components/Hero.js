import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiShield, FiGlobe, FiZap, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

/* ---------- PALETTE (single source of truth) ---------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: DeepBlue1 }}>
      {/* Background: neon radial, grid, and brand orbs — palette only */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* soft radial center glow (Burning → transparent) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 0%, rgba(0,199,255,0.14), transparent 60%)',
          }}
        />
        {/* wire grid using NeonBlue (very faint) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            background: `linear-gradient(to right, rgba(24,169,255,0.9) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(24,169,255,0.9) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            maskImage: 'linear-gradient(to bottom, black, transparent)'
          }}
        />
        {/* brand orbs */}
        <div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(24,169,255,0.12)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(0,199,255,0.12)' }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* TEXT SIDE */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="md:w-1/2 mb-12 md:mb-0"
          >
            {/* glowing brand coin */}
            <motion.div
              variants={item}
              className="mb-5 inline-flex items-center gap-3"
            >
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{
                  width: 44,
                  height: 44,
                  background: BurningBlue,
                  color: DeepBlue1,
                  boxShadow: '0 0 20px rgba(0,199,255,0.45)',
                  border: `1px solid ${NeonBlue}40`
                }}
              >
                <FiShield size={20} />
              </span>
              <span
                className="text-sm font-semibold tracking-wide"
                style={{ color: NeonBlue }}
              >
                Ultra-fast. Private. Borderless.
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-extrabold leading-tight mb-6"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                lineHeight: 1.1,
                // gradient brand text
                background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 24px rgba(0,199,255,0.12)'
              }}
            >
              Reclaim Your Private Internet<br className="hidden md:block" />
              with <span style={{ filter: 'brightness(1.05)' }}>Cloknet VPN</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-8 max-w-xl"
              style={{ color: `${NeonBlue}` }}
            >
              Skip the tracking, throttling, and borders. Cloknet gives you encrypted access that feels fast and unlimited — so your data stays yours.
            </motion.p>

            {/* Trust badges — glassy chips */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-3 max-w-md mb-8">
              {[
                { icon: <FiShield />, text: 'AES-256' },
                { icon: <FiGlobe />,  text: '13 Locations' },
                { icon: <FiZap />,    text: '1 Gbps' },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="flex items-center gap-2 text-sm rounded-lg px-3 py-2"
                  style={{
                    background: 'rgba(2,26,43,0.55)',
                    border: `1px solid ${NeonBlue}2E`,
                    color: NeonBlue,
                    boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.06)'
                  }}
                >
                  <span style={{ color: BurningBlue }}>{b.icon}</span>
                  {b.text}
                </motion.div>
              ))}
            </motion.div>

            {/* DOWNLOAD BUTTONS — palette only */}
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* App Store — filled gradient */}
              <motion.a
                variants={item}
                href="#"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition will-change-transform"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                  color: DeepBlue1,
                  boxShadow: '0 0 28px rgba(0,199,255,0.18)'
                }}
              >
                <FaApple className="mr-2" />
                Download on App Store
              </motion.a>

              {/* Play Store — outline → fill on hover */}
              <motion.a
                variants={item}
                href="https://play.google.com/store/apps/details?id=com.cloknet.vpn"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition relative overflow-hidden will-change-transform"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e)=>{e.currentTarget.style.background = `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`; e.currentTarget.style.color = DeepBlue1;}}
                onMouseLeave={(e)=>{e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BurningBlue;}}
                style={{
                  border: `1px solid ${BurningBlue}`,
                  color: BurningBlue
                }}
              >
                <FaGooglePlay className="mr-2" />
                Get it on Play Store
              </motion.a>
            </motion.div>

            {/* CTA links */}
            <motion.div variants={stagger} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <motion.div variants={item}>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold transition"
                  style={{
                    background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                    color: DeepBlue1,
                    boxShadow: '0 0 22px rgba(0,199,255,0.18)'
                  }}
                >
                  Start Free Trial
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold transition"
                  style={{ border: `1px solid ${BurningBlue}`, color: BurningBlue }}
                  onMouseEnter={(e)=>{e.currentTarget.style.background = BurningBlue; e.currentTarget.style.color = DeepBlue1;}}
                  onMouseLeave={(e)=>{e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BurningBlue;}}
                >
                  Why Choose Cloknet?
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* VISUAL SIDE — Privacy Dashboard card (glassy, neon) */}
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="relative">
              {/* ambient halo */}
              <div
                className="w-full h-80 md:h-96 rounded-xl absolute -z-10"
                style={{
                  background: `linear-gradient(135deg, ${NeonBlue}, ${BurningBlue})`,
                  opacity: 0.18,
                  filter: 'blur(48px)'
                }}
              />

              <motion.div
                whileHover={{ rotateX: 4, rotateY: -4 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                className="rounded-2xl p-6 shadow-2xl"
                style={{
                  background: `linear-gradient(180deg, ${DeepBlue2}B3, ${DeepBlue1}B3)`,
                  border: `1px solid ${NeonBlue}29`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 20px 60px rgba(0,199,255,0.18)'
                }}
              >
                {/* window header — palette dots */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: `${NeonBlue}` }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: `${BurningBlue}` }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: NeonBlue }}>Privacy Dashboard</span>
                </div>

                {/* icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: BurningBlue,
                      color: DeepBlue1,
                      boxShadow: '0 0 20px rgba(0,199,255,0.35)',
                      border: `1px solid ${NeonBlue}33`
                    }}
                  >
                    <FiShield size={22} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: BurningBlue }}>Protection: Active</h3>
                    <p className="text-sm" style={{ color: NeonBlue }}>Real IP hidden • Traffic encrypted</p>
                  </div>
                </div>

                {/* metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Metric label="Tracker Blocking" value="10,482" sub="last 7 days" icon={<FiEyeOff />} />
                  <Metric label="Avg. Speed" value="950 Mbps" sub="WireGuard®" icon={<FiZap />} />
                  <Metric label="Best Location" value="Frankfurt" sub="Low latency" icon={<FiGlobe />} />
                  <Metric label="Security" value="AES-256" sub="Bank-level" icon={<FiShield />} />
                </div>

                {/* progress chips */}
                <div className="mt-6 space-y-3">
                  <Bar label="Anonymity" percent={96} />
                  <Bar label="Network Stability" percent={99} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scoped keyframes + reduced-motion guard */}
      <style>{`
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; scroll-behavior:auto !important}
        }
      `}</style>
    </section>
  );
};

/* ---------- small components (palette-only) ---------- */

const Metric = ({ label, value, sub, icon }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="rounded-lg p-4"
    style={{
      background: 'rgba(2,26,43,0.55)',
      border: `1px solid ${NeonBlue}29`,
      boxShadow: 'inset 0 0 0 1px rgba(0,199,255,0.06)'
    }}
  >
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(24,169,255,0.10)', color: BurningBlue }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm" style={{ color: NeonBlue }}>{label}</p>
        <p className="text-lg font-semibold leading-tight" style={{ color: BurningBlue }}>{value}</p>
        <p className="text-[11px]" style={{ color: `${NeonBlue}CC` }}>{sub}</p>
      </div>
    </div>
  </motion.div>
);

const Bar = ({ label, percent }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span style={{ color: NeonBlue }}>{label}</span>
      <span style={{ color: BurningBlue }}>{percent}%</span>
    </div>
    <div
      className="w-full rounded-full h-2 overflow-hidden"
      style={{ background: `${DeepBlue2}99`, border: `1px solid ${NeonBlue}26` }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-2 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
          boxShadow: '0 0 14px rgba(0,199,255,0.35)'
        }}
      />
    </div>
  </div>
);

export default Hero;
