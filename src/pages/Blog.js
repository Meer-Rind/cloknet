import BlogCard from '../components/BlogCard';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------- PALETTE ---------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } },
};

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Why Online Privacy Matters More Than Ever in 2023',
      excerpt: 'Discover why your data is more vulnerable today than ever before—and how to take back control.',
      date: 'May 15, 2023',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1470&q=80',
      slug: 'why-online-privacy-matters'
    },
    {
      id: 2,
      title: 'Bypass Geo Blocks and Unlock the Entire Internet',
      excerpt: "Learn how to access your favorite content from anywhere in the world—even when it's restricted.",
      date: 'April 28, 2023',
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1472&q=80',
      slug: 'bypass-geo-restrictions'
    },
    {
      id: 3,
      title: 'The VPN Protocols Battle: Which One Wins?',
      excerpt: 'WireGuard vs OpenVPN vs IKEv2 — which is the fastest, most secure, and right for you?',
      date: 'March 10, 2023',
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1465&q=80',
      slug: 'vpn-protocols-guide'
    },
    {
      id: 4,
      title: '5 Huge VPN Myths You Still Believe',
      excerpt: 'Think VPNs are illegal or make you 100% anonymous? Let’s bust the most common misconceptions.',
      date: 'February 22, 2023',
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1470&q=80',
      slug: 'vpn-myths-debunked'
    },
    {
      id: 5,
      title: 'Set Up Your VPN Like a Pro (in 5 Minutes)',
      excerpt: 'Protect all your devices effortlessly with this step-by-step VPN setup guide.',
      date: 'January 15, 2023',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1470&q=80',
      slug: 'setup-vpn-all-devices'
    },
    {
      id: 6,
      title: 'The Future of Digital Freedom',
      excerpt: 'Explore the trends and tech that will shape the internet’s next decade—and your place in it.',
      date: 'December 5, 2022',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1472&q=80',
      slug: 'future-internet-privacy'
    }
  ];

  return (
    <section
      className="relative py-16 md:py-20 min-h-screen overflow-hidden"
      style={{ background: DeepBlue1 }}
    >
      {/* Ambient halos: palette only */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* soft radial from top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              `radial-gradient(60% 50% at 50% 0%, ${BurningBlue}24, transparent 60%)`
          }}
        />
        {/* conic sheen */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.22,
            maskImage: 'linear-gradient(to bottom, black, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 80%)',
            background:
              `conic-gradient(from 180deg at 50% 0%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
          }}
        />
        {/* subtle grid (NeonBlue lines, very faint) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            background: `linear-gradient(to right, ${NeonBlue} 1px, transparent 1px),
                         linear-gradient(to bottom, ${NeonBlue} 1px, transparent 1px)`,
            backgroundSize: '34px 34px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-14">
          <h1
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4"
            style={{
              color: '#FFFFFF',
              textShadow: '0 0 24px rgba(0,199,255,0.15)'
            }}
          >
            🔐 Cloknet VPN{' '}
            <span
              style={{
                background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Insights Hub
            </span>
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: `${NeonBlue}` }}
          >
            Power up your privacy game with our expert blogs. Discover how to stay safe, smart, and one step ahead on the web.
          </p>

          {/* Animated underline (Neon → Burning) */}
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

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence>
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={item} className="relative">
                {/* cursor spotlight on hover */}
                <span
                  className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(120px 120px at var(--x,50%) var(--y,50%), rgba(0,199,255,0.12), transparent 60%)'
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
                  <BlogCard post={post} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16 text-center"
        >
          <button
            className="relative rounded-full font-semibold text-base sm:text-lg px-8 py-3 transition duration-300 overflow-hidden"
            onMouseEnter={(e)=>{ e.currentTarget.style.filter = 'brightness(1.05)'; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.filter = 'none'; }}
            style={{
              color: DeepBlue1,
              background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
              boxShadow: '0 0 26px rgba(0,199,255,0.25)'
            }}
          >
            <span className="relative z-10">🚀 Load More Articles</span>
            {/* shimmer */}
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
          </button>
        </motion.div>
      </div>

      {/* keyframes + reduced motion */}
      <style>{`
        @keyframes shimmer { 0%{ transform: translateX(-100%);} 100%{ transform: translateX(200%);} }
        @keyframes underline { 0%{ transform: translateX(-100%);} 100%{ transform: translateX(200%);} }
        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
        }
      `}</style>
    </section>
  );
};

export default Blog;
