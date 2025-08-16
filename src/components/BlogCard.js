import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * BlogCard — flagship, glassy, tilt + glow version
 * - Subtle 3D tilt that returns perfectly to neutral
 * - Cursor-follow "spotlight" and conic ring glow
 * - Parallax image zoom + shimmer sweep on hover
 * - Staggered text reveal + micro CTA interactions
 * - Reduced-motion friendly
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
  // Motion values for smooth, physics-based tilt (springs feel premium)
  const rx = useSpring(0, { stiffness: 120, damping: 14 });
  const ry = useSpring(0, { stiffness: 120, damping: 14 });
  const scale = useSpring(1, { stiffness: 120, damping: 16 });

  const handleMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor x within card
    const y = e.clientY - rect.top;  // cursor y within card
    const cx = x / rect.width;       // 0..1
    const cy = y / rect.height;      // 0..1

    // Map cursor to rotation: small angles feel elegant
    const rotateY = (cx - 0.5) * -10; // left/right
    const rotateX = (cy - 0.5) * 10;  // up/down
    rx.set(rotateX);
    ry.set(rotateY);
    scale.set(1.01);

    // Spotlight position via CSS variables for the radial gradient
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };

  const handleLeave = (e) => {
    rx.set(0);
    ry.set(0);
    scale.set(1);
    // center spotlight on leave so it doesn't "stick"
    const el = e.currentTarget;
    el.style.setProperty('--mx', `50%`);
    el.style.setProperty('--my', `50%`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="group relative rounded-2xl"
      style={{ perspective: 1200 }}
    >
      {/* Outer halo glow (fades in on hover) */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-px rounded-2xl bg-[conic-gradient(var(--tw-gradient-stops))] from-cyan-400 via-primary to-fuchsia-500 blur-[6px] opacity-40 animate-[spin_12s_linear_infinite]" />
      </div>

      {/* Card body (glass) */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, scale }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
      >
        {/* Cursor spotlight (radial gradient following mouse) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(400px at var(--mx,50%) var(--my,50%), rgba(0,207,255,.12), transparent 40%)',
          }}
        />

        {/* Soft ambient particles for depth */}
        <span className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
        <span className="pointer-events-none absolute -left-10 bottom-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

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

          {/* Shimmer sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-y-0 -left-1 w-1/3 skew-x-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Featured badge */}
          {!!post.featured && (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-primary text-black text-xs font-semibold px-3 py-1 shadow-md animate-pulse">
              Featured
            </span>
          )}

          {/* Gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Meta */}
          <motion.div
            variants={textVariants}
            initial="initial"
            animate={textVariants.animate(0)}
            className="flex items-center text-xs text-lighttext/90 mb-3 space-x-2"
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
            className="text-white text-2xl font-semibold mb-2 leading-snug transition-colors duration-300 group-hover:text-primary"
          >
            {post.title}
          </motion.h3>

          {/* Excerpt */}
          <motion.p
            variants={textVariants}
            initial="initial"
            animate={textVariants.animate(2)}
            className="text-lighttext/95 text-sm mb-5 leading-relaxed line-clamp-3"
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
              className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-primary font-semibold transition-all duration-300 group/cta focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              {/* CTA ring */}
              <span className="absolute inset-0 rounded-full border border-primary/30 group-hover/cta:border-primary/80 transition-colors" />
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
              {/* Underline on hover */}
              <span className="pointer-events-none absolute left-4 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] group-hover/cta:w-[calc(100%-2rem)] transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scoped keyframes + reduced-motion guard */}
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
        }
      `}</style>
    </motion.article>
  );
};

export default BlogCard;
