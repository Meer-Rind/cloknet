import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';

/**
 * Palette (single source of truth)
 */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue = '#18A9FF';
const BurningBlue = '#00C7FF';

/**
 * Text stagger
 */
const textVariants = {
  initial: { opacity: 0, y: 8 },
  animate: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.4, ease: [0.2, 0.6, 0.2, 1] },
  }),
};

const BlogCard = ({ post }) => {
  // physics-y tilt
  const rx = useSpring(0, { stiffness: 120, damping: 14 });
  const ry = useSpring(0, { stiffness: 120, damping: 14 });
  const scale = useSpring(1, { stiffness: 120, damping: 16 });

  const handleMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = x / rect.width;
    const cy = y / rect.height;

    rx.set((cy - 0.5) * 10);
    ry.set((cx - 0.5) * -10);
    scale.set(1.01);

    // spotlight position
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };

  const handleLeave = (e) => {
    rx.set(0);
    ry.set(0);
    scale.set(1);
    e.currentTarget.style.setProperty('--mx', `50%`);
    e.currentTarget.style.setProperty('--my', `50%`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="group relative rounded-2xl"
      style={{ perspective: 1200 }}
    >
      {/* Outer halo glow (Neon → Burning) */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute -inset-px rounded-2xl blur-[6px] opacity-40"
          style={{
            background:
              `conic-gradient(from 0deg at 50% 50%, ${NeonBlue}66, transparent, ${BurningBlue}55, transparent, ${NeonBlue}66)`,
            animation: 'spin 12s linear infinite',
          }}
        />
      </div>

      {/* Card body (glassy) */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, scale }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div
          className="rounded-2xl border backdrop-blur-xl shadow-lg"
          style={{
            borderColor: 'rgba(24,169,255,0.16)', // NeonBlue 16%
            background: `linear-gradient(180deg, ${DeepBlue2}B3, ${DeepBlue1}B3)`, // 70% alpha
            boxShadow: '0 10px 30px rgba(0,199,255,0.15)', // BurningBlue glow
          }}
        >
          {/* Mouse-follow spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(400px at var(--mx,50%) var(--my,50%), rgba(0,199,255,0.12), transparent 40%)',
            }}
          />

          {/* Ambient orbs (depth) */}
          <span
            className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full blur-2xl"
            style={{ background: 'rgba(24,169,255,0.10)' }}
          />
          <span
            className="pointer-events-none absolute -left-10 bottom-10 h-32 w-32 rounded-full blur-3xl"
            style={{ background: 'rgba(0,199,255,0.10)' }}
          />

          {/* Image */}
          <div className="relative overflow-hidden">
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover will-change-transform"
              initial={{ scale: 1.02 }}
              whileHover={{ scale: 1.08, y: -1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            />

            {/* Shimmer sweep (Neon) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="absolute inset-y-0 -left-1 w-1/3 skew-x-12"
                  style={{
                    background:
                      `linear-gradient(90deg, ${NeonBlue}00, ${NeonBlue}33, ${NeonBlue}00)`,
                    animation: 'shimmer 2s ease-in-out infinite',
                  }}
                />
              </div>
            </div>

            {/* Featured badge */}
            {!!post.featured && (
              <span
                className="absolute top-3 left-3 z-10 rounded-full text-xs font-semibold px-3 py-1 shadow-md animate-pulse"
                style={{ background: BurningBlue, color: DeepBlue1, boxShadow: '0 6px 14px rgba(0,199,255,0.35)' }}
              >
                Featured
              </span>
            )}

            {/* Gradient overlay for legibility (DeepBlue1, not black) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  `linear-gradient(to top, ${DeepBlue1}A6, ${DeepBlue1}26, transparent)`, // 65%→15%→0
              }}
            />
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Meta */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate={textVariants.animate(0)}
              className="flex items-center text-xs mb-3 space-x-2"
              style={{ color: 'rgba(24,169,255,0.85)' }} // NeonBlue 85%
            >
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={textVariants}
              initial="initial"
              animate={textVariants.animate(1)}
              className="text-2xl font-semibold mb-2 leading-snug transition-colors duration-300"
              style={{ color: NeonBlue }}
            >
              {post.title}
            </motion.h3>

            {/* Excerpt */}
            <motion.p
              variants={textVariants}
              initial="initial"
              animate={textVariants.animate(2)}
              className="text-sm mb-5 leading-relaxed line-clamp-3"
              style={{ color: 'rgba(24,169,255,0.92)' }} // NeonBlue ~92%
            >
              {post.excerpt}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate={textVariants.animate(3)}
              className="inline-flex"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-all duration-300 group/cta focus:outline-none"
                style={{
                  color: BurningBlue,
                  boxShadow: '0 0 0 0 rgba(0,199,255,0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,199,255,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0,199,255,0)';
                }}
              >
                {/* CTA ring */}
                <span
                  className="absolute inset-0 rounded-full transition-colors"
                  style={{ border: '1px solid rgba(0,199,255,0.30)' }}
                />
                <span className="relative">Read More</span>
                <motion.svg
                  className="relative w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                {/* Underline on hover (Neon → Burning) */}
                <span
                  className="pointer-events-none absolute left-4 -bottom-1 h-[2px] w-0 transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                  }}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scoped keyframes + reduced-motion guard */}
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
        }
        /* CTA underline grow on hover without layout shift */
        .group\\/cta:hover > span:last-child { width: calc(100% - 2rem); }
      `}</style>
    </motion.article>
  );
};

export default BlogCard;
