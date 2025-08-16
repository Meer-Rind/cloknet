import FeatureCard from '../components/FeatureCard';
import {
  FiShield, FiGlobe, FiZap, FiLock,
  FiEyeOff, FiSmartphone, FiUser, FiServer
} from 'react-icons/fi';
import { motion } from 'framer-motion';

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
      description: "Military-grade encryption protects all your internet traffic from hackers and surveillance.",
      glowColor: "bg-primary"
    },
    {
      icon: <FiGlobe size={20} />,
      title: "Global Network",
      description: "13 high-speed servers across 3 continents for reliable and fast connections.",
      glowColor: "bg-purple-500"
    },
    {
      icon: <FiZap size={20} />,
      title: "Unlimited Bandwidth",
      description: "No throttling or data caps - stream, download, and browse without limits.",
      glowColor: "bg-glow"
    },
    {
      icon: <FiLock size={20} />,
      title: "No Activity Logs",
      description: "We never log your online activities, ensuring complete privacy.",
      glowColor: "bg-green-500"
    },
    {
      icon: <FiEyeOff size={20} />,
      title: "Ad & Tracker Blocking",
      description: "Built-in protection against ads, trackers, and malicious websites.",
      glowColor: "bg-yellow-500"
    },
    {
      icon: <FiSmartphone size={20} />,
      title: "Multi-Device Support",
      description: "Protect all your devices with a single account (up to 5 simultaneous connections).",
      glowColor: "bg-red-500"
    },
    {
      icon: <FiUser size={20} />,
      title: "Anonymous Browsing",
      description: "Hide your real IP address and location to browse anonymously.",
      glowColor: "bg-blue-500"
    },
    {
      icon: <FiServer size={20} />,
      title: "Kill Switch",
      description: "Automatically blocks internet access if VPN connection drops unexpectedly.",
      glowColor: "bg-pink-500"
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Ambient brand glows */}
      <span className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 bg-cyan-400/10 blur-3xl rounded-full" />
      <span className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 bg-fuchsia-500/10 blur-3xl rounded-full" />
      {/* Conic halo */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
        <div className="absolute -inset-px bg-[conic-gradient(from_180deg_at_50%_0%,rgba(0,207,255,.18),transparent,rgba(255,0,128,.15),transparent,rgba(0,207,255,.18))]" />
      </div>
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 drop-shadow-[0_0_24px_rgba(0,207,255,.15)]">
            Cloknet VPN <span className="text-primary">Features</span>
          </h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Discover the powerful features that make Cloknet VPN the best choice for your online privacy and security.
          </p>

          {/* animated underline */}
          <div className="relative w-28 h-[3px] mx-auto mt-5 bg-white/10 rounded-full overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
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
              <span className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120px_120px_at_var(--x,50%)_var(--y,50%),rgba(0,207,255,.12),transparent_60%)]" />
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
          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_28px_#00CFFF22]">
            {/* inner border */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
            <div className="md:flex items-center relative">
              {/* Left copy */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions about our features?</h2>
                <p className="text-lighttext mb-6">
                  Our support team is available 24/7 to help you understand how Cloknet VPN can meet your specific needs.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-primary hover:bg-glow text-white px-6 py-2 rounded-md font-medium hover-glow transition"
                >
                  Contact Support
                </a>
              </div>

              {/* Right comparison card */}
              <div className="md:w-1/2 md:pl-8">
                <div className="relative bg-gray-900/70 p-6 rounded-xl border border-white/10 shadow-[0_0_18px_#00CFFF22]">
                  <h3 className="text-lg font-semibold mb-4 text-white">Feature Comparison</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm">
                      <span className="text-lighttext">Free Plan</span>
                      <span className="text-lighttext">7/13 servers, 100MB/day</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-lighttext">Standard Plan</span>
                      <span className="text-lighttext">11/13 servers, 10GB/month</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-lighttext">Premium Plan</span>
                      <span className="text-primary font-medium">All features unlocked</span>
                    </li>
                  </ul>

                  {/* micro gradient bar for flair */}
                  <div className="mt-5 h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                    <span className="block h-full w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            </div>

            {/* corner glow */}
            <span className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(160px_160px_at_90%_10%,rgba(0,207,255,.14),transparent_60%)]" />
          </div>
        </motion.section>
      </div>

      {/* local keyframes + accessibility */}
      <style>{`
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
        }
      `}</style>
    </section>
  );
};

export default Features;
