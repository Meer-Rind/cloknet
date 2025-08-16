import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiShield, FiGlobe, FiZap, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
};

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(0,207,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="md:w-1/2 mb-12 md:mb-0"
          >
            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Reclaim Your <span className="text-primary text-glow">Private Internet</span>
              <br className="hidden md:block" /> with Cloknet VPN
            </motion.h1>

            <motion.p variants={item} className="text-lighttext text-lg mb-8 max-w-xl">
              Skip the tracking, throttling, and borders. Cloknet gives you encrypted access that feels fast and unlimited — so your data stays yours.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-3 max-w-md mb-8">
              <motion.div variants={item} className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                <FiShield className="text-primary" /> AES‑256
              </motion.div>
              <motion.div variants={item} className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                <FiGlobe className="text-primary" /> 13 Locations
              </motion.div>
              <motion.div variants={item} className="flex items-center gap-2 text-sm bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
                <FiZap className="text-primary" /> 1 Gbps
              </motion.div>
            </motion.div>

            {/* Download Buttons */}
            <motion.div variants={stagger} className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.a
                variants={item}
                href="#"
                className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow-md"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaApple className="mr-2 text-xl" />
                <span className="font-semibold">Download on App Store</span>
              </motion.a>
              <motion.a
                variants={item}
                href="#"
                className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGooglePlay className="mr-2 text-xl" />
                <span className="font-semibold">Get it on Play Store</span>
              </motion.a>
            </motion.div>

            {/* CTA Links */}
            <motion.div variants={stagger} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <motion.div variants={item}>
                <Link
                  to="/pricing"
                  className="bg-primary hover:bg-glow text-white px-8 py-3 rounded-md font-semibold hover-glow transition text-center inline-flex items-center justify-center"
                >
                  Start Free Trial
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link
                  to="/features"
                  className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-semibold transition text-center inline-flex items-center justify-center"
                >
                  Why Choose Cloknet?
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual — Privacy Dashboard (no connect/disconnect) */}
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* soft background glow */}
              <div className="w-full h-80 md:h-96 bg-gradient-to-br from-primary to-glow rounded-xl opacity-20 blur-3xl absolute -z-10" />

              <motion.div
                whileHover={{ rotateX: 4, rotateY: -4 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 shadow-2xl"
              >
                {/* Window header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm text-lighttext font-medium">Privacy Dashboard</span>
                </div>

                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_20px_#00CFFF55]">
                    <FiShield className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Protection: Active</h3>
                    <p className="text-lighttext text-sm">Real IP hidden • Traffic encrypted</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Metric label="Tracker Blocking" value="10,482" sub="last 7 days" icon={<FiEyeOff />} />
                  <Metric label="Avg. Speed" value="950 Mbps" sub="WireGuard®" icon={<FiZap />} />
                  <Metric label="Best Location" value="Frankfurt" sub="Low latency" icon={<FiGlobe />} />
                  <Metric label="Security" value="AES‑256" sub="Bank‑level" icon={<FiShield />} />
                </div>

                {/* Progress bar style chips */}
                <div className="mt-6 space-y-3">
                  <Bar label="Anonymity" percent={96} />
                  <Bar label="Network Stability" percent={99} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Metric = ({ label, value, sub, icon }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="rounded-lg border border-gray-700 bg-white/5 p-4"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm text-lighttext">{label}</p>
        <p className="text-lg font-semibold text-white leading-tight">{value}</p>
        <p className="text-[11px] text-lighttext/80">{sub}</p>
      </div>
    </div>
  </motion.div>
);

const Bar = ({ label, percent }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-lighttext">{label}</span>
      <span className="text-white">{percent}%</span>
    </div>
    <div className="w-full bg-gray-800 rounded-full h-2 border border-gray-700 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-2 bg-primary rounded-full"
      />
    </div>
  </div>
);

export default Hero;
