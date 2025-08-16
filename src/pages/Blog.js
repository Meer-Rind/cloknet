import BlogCard from '../components/BlogCard';
import { motion, AnimatePresence } from 'framer-motion';

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
      title: "Why Online Privacy Matters More Than Ever in 2023",
      excerpt: "Discover why your data is more vulnerable today than ever before—and how to take back control.",
      date: "May 15, 2023",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1470&q=80",
      slug: "why-online-privacy-matters"
    },
    {
      id: 2,
      title: "Bypass Geo Blocks and Unlock the Entire Internet",
      excerpt: "Learn how to access your favorite content from anywhere in the world—even when it's restricted.",
      date: "April 28, 2023",
      readTime: 4,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1472&q=80",
      slug: "bypass-geo-restrictions"
    },
    {
      id: 3,
      title: "The VPN Protocols Battle: Which One Wins?",
      excerpt: "WireGuard vs OpenVPN vs IKEv2 — which is the fastest, most secure, and right for you?",
      date: "March 10, 2023",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1465&q=80",
      slug: "vpn-protocols-guide"
    },
    {
      id: 4,
      title: "5 Huge VPN Myths You Still Believe",
      excerpt: "Think VPNs are illegal or make you 100% anonymous? Let’s bust the most common misconceptions.",
      date: "February 22, 2023",
      readTime: 3,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1470&q=80",
      slug: "vpn-myths-debunked"
    },
    {
      id: 5,
      title: "Set Up Your VPN Like a Pro (in 5 Minutes)",
      excerpt: "Protect all your devices effortlessly with this step-by-step VPN setup guide.",
      date: "January 15, 2023",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1470&q=80",
      slug: "setup-vpn-all-devices"
    },
    {
      id: 6,
      title: "The Future of Digital Freedom",
      excerpt: "Explore the trends and tech that will shape the internet’s next decade—and your place in it.",
      date: "December 5, 2022",
      readTime: 8,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1472&q=80",
      slug: "future-internet-privacy"
    }
  ];

  return (
    <section className="relative py-16 md:py-20 bg-[#0f172a] min-h-screen overflow-hidden">
      {/* Ambient glows + conic halos */}
      <span className="pointer-events-none absolute -top-32 -left-28 h-80 w-80 bg-cyan-400/10 blur-3xl rounded-full" />
      <span className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 bg-fuchsia-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]">
        <div className="absolute -inset-px bg-[conic-gradient(from_180deg_at_50%_0%,rgba(0,207,255,.18),transparent,rgba(255,0,128,.15),transparent,rgba(0,207,255,.18))]" />
      </div>
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:34px_34px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-[0_0_24px_rgba(0,207,255,.15)]">
            🔐 Cloknet VPN <span className="text-blue-400">Insights Hub</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Power up your privacy game with our expert blogs. Discover how to stay safe, smart, and one step ahead on the web.
          </p>

          {/* Animated underline */}
          <div className="relative w-28 h-[3px] mx-auto mt-5 bg-white/10 rounded-full overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={item} className="relative">
                {/* subtle spotlight on hover */}
                <span className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(120px_120px_at_var(--x,50%)_var(--y,50%),rgba(0,207,255,.12),transparent_60%)]" />
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
          className="mt-16 text-center"
        >
          <button
            className="relative bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-blue-600 hover:bg-blue-600 transition duration-300 font-semibold text-lg overflow-hidden"
          >
            <span className="relative z-10">🚀 Load More Articles</span>
            {/* shimmer */}
            <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="absolute inset-y-0 -left-1 w-1/3 skew-x-12 bg-gradient-to-r from-white/0 via-white/25 to-white/0 animate-[shimmer_1.8s_ease-in-out_infinite]" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* local keyframes + reduced motion */}
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

export default Blog;
