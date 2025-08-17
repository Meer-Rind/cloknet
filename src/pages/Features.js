import FeatureCard from '../components/FeatureCard';
import {
  FiShield, FiGlobe, FiZap, FiLock,
  FiEyeOff, FiSmartphone, FiUser, FiServer
} from 'react-icons/fi';
import { motion } from 'framer-motion';

/* ---------- PALETTE ---------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const Features = () => {
  const features = [
    {
      icon: <FiShield size={20} />,
      title: "AES-256 Encryption",
      description: "Military-grade encryption protects all your traffic from hackers and surveillance.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiGlobe size={20} />,
      title: "Global Network",
      description: "13 high-speed servers across 3 continents for reliable, fast connections.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiZap size={20} />,
      title: "Unlimited Bandwidth",
      description: "No throttling or data caps — stream, download, and browse without limits.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiLock size={20} />,
      title: "No Activity Logs",
      description: "We never log your online activities, ensuring complete privacy.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiEyeOff size={20} />,
      title: "Ad & Tracker Blocking",
      description: "Built-in protection against ads, trackers, and malicious sites.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiSmartphone size={20} />,
      title: "Multi-Device Support",
      description: "Protect all your devices with a single account (up to 5 simultaneous).",
      glowColor: "bg-primary"
    },
    {
      icon: <FiUser size={20} />,
      title: "Anonymous Browsing",
      description: "Hide your real IP and location to browse anonymously.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiServer size={20} />,
      title: "Kill Switch",
      description: "Blocks internet access if the VPN drops — preventing any data leaks.",
      glowColor: "bg-primary"
    }
  ];

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: DeepBlue1 }}
    >
      {/* Ambient brand glows (palette only) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span
          className="absolute -top-28 -left-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${NeonBlue}1A` }}
        />
        <span
          className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `${BurningBlue}1A` }}
        />
        {/* Conic halo (Neon → Burning) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.30,
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            background: `conic-gradient(from 180deg at 50% 0%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
          }}
        />
        {/* Subtle grid (neon lines) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            background: `linear-gradient(to right, ${NeonBlue} 1px, transparent 1px),
                         linear-gradient(to bottom, ${NeonBlue} 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{ color: '#FFFFFF', textShadow: '0 0 24px rgba(0,199,255,0.15)' }}
          >
            Cloknet VPN <span style={{ color: BurningBlue }}>Features</span>
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: NeonBlue }}
          >
            Discover the powerful features that make Cloknet VPN the best choice for your online privacy and security.
          </p>

          {/* animated underline (Neon → Burning) */}
          <div
            className="relative w-28 h-[3px] mx-auto mt-5 rounded-full overflow-hidden"
            style={{ background: `${NeonBlue}26` }}
          >
            <span
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                animation: 'underline 2.2s ease-in-out infinite'
              }}
            />
          </div>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, ease }}
              className="relative"
            >
              {/* spotlight following cursor */}
              <span
                className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(120px 120px at var(--x,50%) var(--y,50%), rgba(0,199,255,.12), transparent 60%)'
                }}
              />
              <div
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  el.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  el.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  /* keep within palette — assume FeatureCard maps bg-primary to brand */
                  glowColor={feature.glowColor}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison / CTA */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16"
        >
          <div
            className="relative rounded-3xl p-8 md:p-12"
            style={{
              border: `1px solid ${NeonBlue}26`,
              background: `${DeepBlue2}CC`,
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 28px rgba(0,199,255,0.13)'
            }}
          >
            {/* inner border */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ border: `1px solid ${NeonBlue}26` }}
            />
            <div className="md:flex items-center relative">
              {/* Left copy */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: '#FFFFFF' }}
                >
                  Still have questions about our features?
                </h2>
                <p
                  className="mb-6"
                  style={{ color: NeonBlue }}
                >
                  Our support team is available 24/7 to help you understand how Cloknet VPN can meet your needs.
                </p>
                <a
                  href="/contact"
                  className="inline-block rounded-md font-medium transition relative overflow-hidden"
                  style={{
                    color: DeepBlue1,
                    background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                    padding: '0.5rem 1.5rem',
                    boxShadow: '0 0 20px rgba(0,199,255,0.25)'
                  }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.filter = 'brightness(1.05)'; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.filter = 'none'; }}
                >
                  <span className="relative z-10">Contact Support</span>
                  <span className="pointer-events-none absolute inset-0">
                    <span
                      className="absolute inset-y-0 -left-1 w-1/3 skew-x-12"
                      style={{
                        background: `linear-gradient(90deg, ${NeonBlue}00, #FFFFFF40, ${NeonBlue}00)`,
                        opacity: 0,
                        transition: 'opacity .3s',
                        animation: 'shimmer 1.8s ease-in-out infinite'
                      }}
                    />
                  </span>
                </a>
              </div>

              {/* Right comparison card */}
              <div className="md:w-1/2 md:pl-8">
                <div
                  className="relative rounded-xl p-6"
                  style={{
                    background: `${DeepBlue1}B3`,
                    border: `1px solid ${NeonBlue}26`,
                    boxShadow: '0 0 18px rgba(0,199,255,0.13)'
                  }}
                >
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: '#FFFFFF' }}
                  >
                    Feature Comparison
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm">
                      <span style={{ color: NeonBlue }}>Free Plan</span>
                      <span style={{ color: NeonBlue }}>7/13 servers, 100MB/day</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span style={{ color: NeonBlue }}>Standard Plan</span>
                      <span style={{ color: NeonBlue }}>11/13 servers, 10GB/month</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span style={{ color: NeonBlue }}>Premium Plan</span>
                      <span style={{ color: '#FFFFFF' }}>All features unlocked</span>
                    </li>
                  </ul>

                  {/* micro gradient bar */}
                  <div
                    className="mt-5 h-[3px] w-full rounded-full overflow-hidden"
                    style={{ background: `${NeonBlue}26` }}
                  >
                    <span
                      className="block h-full w-1/2"
                      style={{
                        background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                        animation: 'underline 2.2s ease-in-out infinite'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* corner glow */}
            <span
              className="pointer-events-none absolute -inset-1 rounded-3xl"
              style={{
                opacity: 0,
                transition: 'opacity .5s',
                background: 'radial-gradient(160px 160px at 90% 10%, rgba(0,199,255,.14), transparent 60%)'
              }}
            />
          </div>
        </motion.section>
      </div>

      {/* local keyframes + accessibility */}
      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
        }
      `}</style>
    </section>
  );
};

export default Features;
