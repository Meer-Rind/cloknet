import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

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
        
        <h2 class="mt-6 text-xl font-semibold">🔍 What’s Threatening Your Privacy?</h2>
        <p>Let’s look at the growing concerns that make online privacy a top priority:</p>
        <ul class="list-disc list-inside">
          <li><strong>Massive Data Harvesting:</strong> Big tech companies track your behavior to build detailed profiles — often without your full consent.</li>
          <li><strong>Unseen Government Surveillance:</strong> Governments around the world are ramping up their digital surveillance operations.</li>
          <li><strong>Rise in Cybercrime:</strong> Identity theft, phishing, and ransomware attacks are skyrocketing.</li>
          <li><strong>Frequent Data Breaches:</strong> Even well-known brands experience leaks, exposing millions of users' sensitive data.</li>
        </ul>
        
        <h2 class="mt-6 text-xl font-semibold">🛡️ How Cloknet VPN Shields You</h2>
        <p>A VPN (Virtual Private Network) is one of the easiest and most effective ways to take back control of your online activity. Here’s how Cloknet VPN helps:</p>
        <ol class="list-decimal list-inside">
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
    <section className="relative bg-black text-white overflow-hidden">
      {/* Top reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-cyan-400 via-[#00CFFF] to-fuchsia-500"
        style={{ scaleX: progressX }}
      />

      {/* Ambient conic halos + grid texture */}
      <span className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 bg-cyan-500/10 blur-3xl rounded-full" />
      <span className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 bg-fuchsia-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
        <div className="absolute -inset-px bg-[conic-gradient(from_180deg_at_50%_0%,rgba(0,207,255,.18),transparent,rgba(255,0,128,.15),transparent,rgba(0,207,255,.18))]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}>
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:text-glow mb-6 transition"
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
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_0_24px_rgba(0,207,255,.15)]">
            {post.title}
          </h1>
          <div className="flex items-center text-lighttext text-sm mt-4">
            <div className="flex items-center mr-4">
              <FiCalendar className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </motion.header>

        {/* Hero image card (glassy) */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } }}
          className="relative mb-8 rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur-xl shadow-[0_0_28px_#00CFFF22]"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent" />
          {/* Top-left soft badge glow */}
          <span className="pointer-events-none absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-black/40 border border-white/10 backdrop-blur-md">
            Cloknet Blog
          </span>
        </motion.div>

        {/* Article body with smooth reveal on scroll */}
        <article ref={articleRef}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease }}
            className="prose prose-invert max-w-none leading-relaxed text-[17px] md:text-lg prose-headings:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
          className="mt-12 pt-8 border-t border-gray-700 flex items-center"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#9333ea] p-[2px] mr-4">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
              {post.author.charAt(0)}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white">{post.author}</h4>
            <p className="text-lighttext text-sm">{post.authorRole}</p>
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
          <h3 className="text-2xl font-semibold mb-6">📚 Related Articles</h3>
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

      {/* Local keyframes + accessibility */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important }
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
    transition={{ duration: 0.4, ease }}
    className="relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl hover:border-primary/80 transition shadow-[0_0_18px_#00CFFF22]"
  >
    {/* Corner glow */}
    <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(140px_140px_at_20%_0%,rgba(0,207,255,.14),transparent_60%)]" />
    <h4 className="font-medium text-white text-lg mb-2">{title}</h4>
    <p className="text-lighttext text-sm mb-4">{desc}</p>
    <Link
      to={to}
      className="inline-flex items-center text-primary hover:text-glow text-sm font-medium transition"
    >
      Read Article →
    </Link>
  </motion.div>
);

export default BlogPost;
