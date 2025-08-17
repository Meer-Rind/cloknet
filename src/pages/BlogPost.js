import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

/* ---------- PALETTE ---------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];

const BlogPost = () => {
  const { slug } = useParams();
  const articleRef = useRef(null);

  // Scroll progress across the article body
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ['start start', 'end end'],
  });
  const progressX = useSpring(scrollYProgress, { stiffness: 140, damping: 25, mass: 0.5 });

  const blogPosts = {
    "why-online-privacy-matters": {
      id: 1,
      title: "Why Online Privacy Matters More Than Ever in 2023",
      content: `
        <p>In an age where nearly every click, scroll, and search is being tracked, your online privacy has never been more important. We live in a world where our digital lives are constantly monitored — and often monetized.</p>

        <h2>🔍 What’s Threatening Your Privacy?</h2>
        <p>Let’s look at the growing concerns that make online privacy a top priority:</p>
        <ul>
          <li><strong>Massive Data Harvesting:</strong> Big tech companies track your behavior to build detailed profiles — often without your full consent.</li>
          <li><strong>Unseen Government Surveillance:</strong> Governments around the world are ramping up their digital surveillance operations.</li>
          <li><strong>Rise in Cybercrime:</strong> Identity theft, phishing, and ransomware attacks are skyrocketing.</li>
          <li><strong>Frequent Data Breaches:</strong> Even well-known brands experience leaks, exposing millions of users' sensitive data.</li>
        </ul>

        <h2>🛡️ How Cloknet VPN Shields You</h2>
        <p>A VPN (Virtual Private Network) is one of the easiest and most effective ways to take back control of your online activity. Here’s how Cloknet VPN helps:</p>
        <ol>
          <li><strong>Military-Grade Encryption:</strong> Your data is fully encrypted, making it unreadable to third parties.</li>
          <li><strong>Location Masking:</strong> By hiding your IP address, it’s nearly impossible to trace your online behavior.</li>
          <li><strong>Safe Public Wi-Fi Use:</strong> Whether you're in a coffee shop or an airport, stay protected on unsecured networks.</li>
          <li><strong>Unblock the Internet:</strong> Access the global web freely — bypass geo-restrictions and censorship.</li>
        </ol>

        <p>Online privacy isn’t a luxury anymore. It’s your right. Take control with tools like Cloknet VPN — because what you do online should stay private.</p>
      `,
      date: "May 15, 2023",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      author: "Jane Smith",
      authorRole: "Cybersecurity Expert",
    }
  };

  const post = blogPosts[slug] || blogPosts["why-online-privacy-matters"];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: DeepBlue1, color: '#FFFFFF' }}
    >
      {/* Top reading progress bar (Neon → Burning) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: progressX,
          background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`
        }}
      />

      {/* Ambient halos + conic sheen + grid (palette only) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* top radial halo */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 50% at 50% 0%, ${BurningBlue}22, transparent 60%)`
          }}
        />
        {/* conic shimmer */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.25,
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            background: `conic-gradient(from 180deg at 50% 0%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
          }}
        />
        {/* subtle grid */}
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

      <div className="relative max-w-4xl mx-auto px-4 py-14 md:py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center mb-6 transition"
            style={{ color: NeonBlue }}
            onMouseEnter={(e)=>{e.currentTarget.style.color = BurningBlue;}}
            onMouseLeave={(e)=>{e.currentTarget.style.color = NeonBlue;}}
          >
            <FiArrowLeft className="mr-2" /> Back to Blog
          </Link>
        </motion.div>

        {/* Title + meta */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
          className="mb-6"
        >
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: '#FFFFFF', textShadow: '0 0 24px rgba(0,199,255,0.15)' }}
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <div className="flex items-center" style={{ color: NeonBlue }}>
              <FiCalendar className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center" style={{ color: NeonBlue }}>
              <FiClock className="mr-2" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </motion.header>

        {/* Hero image card (glassy) */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } }}
          className="relative mb-8 rounded-2xl overflow-hidden"
          style={{
            border: `1px solid ${NeonBlue}1A`,
            background: `${DeepBlue2}80`,
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 28px rgba(0,199,255,0.13)'
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${DeepBlue1}4D, ${DeepBlue1}00)` }}
          />
          {/* Badge */}
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
            style={{
              color: '#FFFFFF',
              background: `${DeepBlue1}66`,
              border: `1px solid ${NeonBlue}26`
            }}
          >
            Cloknet Blog
          </span>
        </motion.div>

        {/* Article body */}
        <article ref={articleRef}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="prose max-w-none"
            // Tailwind prose is optional; inline palette styles ensure consistency.
            style={{
              // base text
              color: NeonBlue,
              fontSize: '17px',
              lineHeight: 1.75,
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="mt-12 pt-8 flex items-center"
          style={{ borderTop: `1px solid ${NeonBlue}26` }}
        >
          <div className="w-12 h-12 rounded-full p-[2px] mr-4"
               style={{
                 background: `linear-gradient(135deg, ${NeonBlue}, ${BurningBlue})`,
                 boxShadow: '0 0 16px rgba(0,199,255,0.25)'
               }}>
            <div
              className="w-full h-full rounded-full flex items-center justify-center font-bold text-lg"
              style={{ background: DeepBlue2, color: '#FFFFFF' }}
            >
              {post.author.charAt(0)}
            </div>
          </div>
          <div>
            <h4 className="font-medium" style={{ color: '#FFFFFF' }}>{post.author}</h4>
            <p className="text-sm" style={{ color: NeonBlue }}>{post.authorRole}</p>
          </div>
        </motion.div>

        {/* Related articles */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold mb-6" style={{ color: '#FFFFFF' }}>📚 Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RelatedCard
              title="How to Set Up a VPN on All Your Devices"
              desc="Step-by-step instructions for configuring Cloknet VPN on Windows, Mac, iOS, Android, and routers."
              to="/blog/setup-vpn-all-devices"
            />
            <RelatedCard
              title="5 Common VPN Myths Debunked"
              desc="We expose the most popular myths and misconceptions about VPN technology — and reveal the truth."
              to="/blog/vpn-myths-debunked"
            />
          </div>
        </motion.div>
      </div>

      {/* local keyframes + accessibility */}
      <style>{`
        /* prose palette overrides */
        .prose h2 { color: #FFFFFF; font-size: 1.25rem; font-weight: 700; margin-top: 1.25rem; }
        .prose p  { color: ${NeonBlue}; margin: 0.75rem 0; }
        .prose ul, .prose ol { color: ${NeonBlue}; padding-left: 1.1rem; margin: 0.5rem 0 0.75rem; }
        .prose li strong { color: #FFFFFF; }

        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important }
        }
      `}</style>
    </section>
  );
};

const RelatedCard = ({ title, desc, to }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
    className="relative rounded-2xl p-6 transition"
    style={{
      border: `1px solid ${NeonBlue}26`,
      background: `${DeepBlue2}80`,
      backdropFilter: 'blur(12px)',
      boxShadow: '0 0 18px rgba(0,199,255,0.13)'
    }}
  >
    {/* Corner glow */}
    <span
      className="pointer-events-none absolute -inset-px rounded-2xl"
      style={{
        opacity: 0,
        transition: 'opacity .5s',
        background: 'radial-gradient(140px 140px at 20% 0%, rgba(0,199,255,0.14), transparent 60%)'
      }}
    />
    <h4 className="font-medium text-lg mb-2" style={{ color: '#FFFFFF' }}>{title}</h4>
    <p className="text-sm mb-4" style={{ color: NeonBlue }}>{desc}</p>
    <Link
      to={to}
      className="inline-flex items-center text-sm font-medium transition"
      style={{ color: NeonBlue }}
      onMouseEnter={(e)=>{e.currentTarget.style.color = BurningBlue;}}
      onMouseLeave={(e)=>{e.currentTarget.style.color = NeonBlue;}}
    >
      Read Article →
    </Link>
  </motion.div>
);

export default BlogPost;
