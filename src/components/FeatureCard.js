import { useCallback } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const FeatureCard = ({ icon, title, description, glowColor = 'bg-primary', stats }) => {
  // Mouse spotlight (no state re-renders; just CSS vars on the node)
  const handleMouseMove = useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const el = e.currentTarget;
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }, []);

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.5, ease }}
      className="group relative rounded-2xl focus-within:outline-none"
    >
      {/* Conic glow frame (only truly visible on hover/focus) */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-px rounded-2xl bg-[conic-gradient(from_0deg_at_50%_50%,rgba(0,207,255,.35),transparent_28%,rgba(155,92,255,.28),transparent_68%,rgba(0,207,255,.35))] animate-[spin_14s_linear_infinite] blur-[1.2px]" />
      </div>

      {/* Card body */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F1C]/70 backdrop-blur-xl shadow-[0_0_18px_#00CFFF33] hover:shadow-[0_0_28px_#00CFFF88] focus-within:ring-2 focus-within:ring-primary/50"
        // spotlight layer uses CSS variables --mx/--my set above
        style={{
          '--mx': '50%',
          '--my': '50%',
        }}
      >
        {/* Ambient blobs for depth */}
        <span className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/12 blur-3xl" />
        <span className="pointer-events-none absolute -right-12 bottom-0 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-3xl" />

        {/* Cursor spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(360px circle at var(--mx) var(--my), rgba(0,207,255,0.12), transparent 45%)',
          }}
        />

        {/* Shimmer sweep on hover */}
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute inset-y-0 -left-1 w-1/3 skew-x-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[shimmer_2.2s_ease-in-out_infinite]" />
        </span>

        {/* Decorative grid dots (very subtle) */}
        <span className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_1px)] [background-size:14px_14px]" />

        <div className="relative p-6">
          {/* Icon orb */}
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 rounded-full ${glowColor} bg-opacity-20 flex items-center justify-center ring-1 ring-white/10`}>
              <div className={`relative w-12 h-12 rounded-full ${glowColor} text-white text-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,207,255,.45)]`}>
                {/* pulse behind icon */}
                <span className="absolute inset-0 rounded-full animate-pulse bg-white/10" />
                <span className="relative">{icon}</span>
              </div>
            </div>
          </div>

          {/* Title + stat pill */}
          <h3 className="text-xl font-bold text-white text-center mb-1 tracking-wide">{title}</h3>

          {stats && (
            <div className="text-center mb-2">
              <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-white/6 border border-white/12 text-lighttext">
                {stats}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-lighttext text-center text-sm leading-relaxed">
            {description}
          </p>

          {/* Invisible link target for keyboard focus aesthetics (optional) */}
          <a
            href="#"
            tabIndex={-1}
            className="absolute inset-0 focus:outline-none"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* local keyframes + motion-reduce */}
      <style>{`
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(200%); } 
        }
        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
        }
      `}</style>
    </motion.article>
  );
};

export default FeatureCard;
