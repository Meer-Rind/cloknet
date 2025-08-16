import { FiDownload, FiShield, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const barEase = [0.22, 1, 0.36, 1];

const ServerCard = ({ server }) => {
  const loadColor =
    server.load < 50 ? 'bg-green-400' : server.load < 80 ? 'bg-yellow-400' : 'bg-red-500';
  const pingColor =
    server.ping < 50 ? 'text-green-400' : server.ping < 100 ? 'text-yellow-400' : 'text-red-400';

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.45, ease: barEase }}
      className="group relative rounded-2xl"
    >
      {/* animated conic border glow (subtle) */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-px rounded-2xl bg-[conic-gradient(from_0deg_at_50%_50%,rgba(0,207,255,0.28),transparent_30%,rgba(155,92,255,0.22),transparent_70%,rgba(0,207,255,0.28))] animate-[spin_10s_linear_infinite] blur-[1.5px]" />
      </div>

      {/* card body */}
      <div className="relative bg-gradient-to-br from-gray-900/40 via-gray-800/50 to-black/60 border border-white/10 backdrop-blur-xl shadow-[0_0_20px_#00CFFF33] hover:shadow-[0_0_30px_#00CFFF99] rounded-2xl overflow-hidden">
        {/* soft particles */}
        <span className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
        <span className="pointer-events-none absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-3xl" />

        {/* shimmer on hover */}
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute inset-y-0 -left-1 w-1/3 skew-x-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[shimmer_2s_ease-in-out_infinite]" />
        </span>

        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <motion.img
                src={`https://flagcdn.com/w40/${server.countryCode.toLowerCase()}.png`}
                alt={server.country}
                className="w-9 h-6 object-cover rounded shadow-md"
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              />
              <div>
                <h3 className="font-bold text-white text-base leading-tight">{server.country}</h3>
                <p className="text-xs text-gray-400">{server.city}</p>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold tracking-wide shadow-md border ${
                server.type === 'free'
                  ? 'bg-green-600/10 text-green-300 border-green-400/20'
                  : 'bg-purple-600/10 text-purple-300 border-purple-400/20'
              }`}
            >
              {server.type === 'free' ? 'Free Tier' : 'Premium Tier'}
            </span>
          </div>

          {/* Metrics */}
          <div className="flex justify-between text-sm mb-4">
            {/* Load */}
            <div className="text-lighttext w-1/2 pr-2">
              <span className="block text-xs font-medium text-gray-300">Server Load</span>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mt-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${server.load}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: barEase }}
                  className={`h-2 rounded-full ${loadColor}`}
                />
              </div>
            </div>

            {/* Ping */}
            <div className="text-right w-1/2 pl-2">
              <span className="block text-xs font-medium text-gray-300">Ping</span>
              <span className={`font-semibold text-sm inline-flex items-center gap-1 ${pingColor}`}>
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 rounded-full bg-current opacity-75" />
                  <span className="absolute inline-flex h-2 w-2 rounded-full bg-current animate-ping" />
                </span>
                {server.ping} ms
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <motion.div whileHover={{ x: 1 }} className="flex items-start">
              <FiDownload className="mr-2 text-primary mt-0.5" />
              <span>
                Fast download speeds up to <strong className="text-white">{server.speed} Mbps</strong>
              </span>
            </motion.div>
            <motion.div whileHover={{ x: 1 }} className="flex items-start">
              <FiShield className="mr-2 text-primary mt-0.5" />
              <span>
                <strong className="text-white">Encrypted traffic</strong> & secure node
              </span>
            </motion.div>
            <motion.div whileHover={{ x: 1 }} className="flex items-start">
              <FiZap className="mr-2 text-primary mt-0.5" />
              <span>
                Optimized for <strong className="text-white">streaming & gaming</strong>
              </span>
            </motion.div>
          </div>

          {/* Footer Note */}
          <div className="mt-5 text-[11px] text-gray-500 italic">
            This server is available for Cloknet users. Choose the best region for your needs.
          </div>
        </div>
      </div>

      {/* local keyframes */}
      <style>{`
        @keyframes shimmer { 0%{ transform: translateX(-100%);} 100%{ transform: translateX(200%);} }
        @media (prefers-reduced-motion: reduce){ *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; scroll-behavior:auto !important; } }
      `}</style>
    </motion.article>
  );
};

export default ServerCard;
