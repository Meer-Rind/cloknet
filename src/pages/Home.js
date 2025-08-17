import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ServerCard from '../components/ServerCard';
import { FiCheck, FiX, FiAward, FiDownload, FiGlobe, FiShield, FiCheckCircle } from 'react-icons/fi';
import BlogCard from '../components/BlogCard';
import { motion } from 'framer-motion';

/* ---------------- Palette (single source of truth) ---------------- */
const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};

const Home = () => {
  // Features — keep content, color handled inside cards or here via palette props if you want to wire later
  const features = [
    {
      icon: <FiShield size={24} color={NeonBlue} />,
      title: "Military-Grade Encryption",
      description: "AES-256 encryption, the same standard used by governments and security experts worldwide to protect classified information.",
      glowColor: 'neon', // optional: if your FeatureCard supports it
      stats: "99.9% security guarantee"
    },
    {
      icon: <FiGlobe size={24} color={NeonBlue} />,
      title: "Global Server Network",
      description: "13 high-speed servers across 3 continents with unlimited bandwidth and optimal routing for reduced latency.",
      glowColor: 'burning',
      stats: "13 locations worldwide"
    },
    {
      icon: <FiDownload size={24} color={NeonBlue} />,
      title: "Lightning Fast Speeds",
      description: "Our optimized network infrastructure delivers speeds up to 1Gbps with minimal impact on your connection.",
      glowColor: 'neon',
      stats: "Up to 1Gbps speeds"
    },
    {
      icon: <FiShield size={24} color={NeonBlue} />,
      title: "Strict No-Logs Policy",
      description: "We never track, store, or share your online activities. Independently audited for transparency.",
      glowColor: 'burning',
      stats: "Zero logs kept"
    },
    {
      icon: <FiShield size={24} color={NeonBlue} />,
      title: "Ad & Tracker Blocking",
      description: "Built-in protection against ads, trackers, and malicious websites for cleaner, safer browsing.",
      glowColor: 'neon',
      stats: "Blocks 10M+ trackers"
    },
    {
      icon: <FiShield size={24} color={NeonBlue} />,
      title: "Multi-Device Support",
      description: "Protect all your devices simultaneously with a single account (up to 5 connections at once).",
      glowColor: 'burning',
      stats: "5 devices at once"
    },
    {
      icon: <FiShield size={24} color={NeonBlue} />,
      title: "Anonymous Browsing",
      description: "Hide your real IP address and location to browse anonymously without being tracked.",
      glowColor: 'neon',
      stats: "100% anonymous"
    },
    {
      icon: <FiShield size={24} color={NeonBlue} />,
      title: "Kill Switch",
      description: "Automatically blocks internet access if VPN connection drops to prevent data leaks.",
      glowColor: 'burning',
      stats: "Zero leaks guaranteed"
    }
  ];

  const popularServers = [
    { id: 1, country: "United States", countryCode: "US", city: "New York", type: "free",    load: 45, ping: 28,  speed: 85 },
    { id: 2, country: "United Kingdom", countryCode: "GB", city: "London",   type: "free",    load: 62, ping: 42,  speed: 72 },
    { id: 3, country: "Germany",        countryCode: "DE", city: "Frankfurt",type: "free",    load: 38, ping: 35,  speed: 91 },
    { id: 8, country: "Australia",      countryCode: "AU", city: "Sydney",   type: "premium", load: 29, ping: 198, speed: 88 },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      description: 'Basic protection for casual browsing',
      features: [
        { text: '7 Free Servers', included: true },
        { text: '100MB Daily Limit', included: true },
        { text: 'Standard Speed', included: true },
        { text: 'Ad-Supported', included: true },
        { text: 'Premium Servers', included: false },
        { text: 'No Logs Policy', included: false },
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      price: '9.99',
      description: 'Best for power users and professionals',
      features: [
        { text: 'All 13 Servers', included: true },
        { text: 'Unlimited Data', included: true },
        { text: 'High Speed', included: true },
        { text: 'No Ads', included: true },
        { text: 'Premium Priority', included: true },
        { text: 'No Logs Policy', included: true },
      ],
      cta: 'Go Premium',
      popular: true,
    },
    {
      name: 'Standard',
      price: '4.99',
      description: 'Great for regular users',
      features: [
        { text: '11 Servers', included: true },
        { text: '10GB Monthly', included: true },
        { text: 'Good Speed', included: true },
        { text: 'Fewer Ads', included: true },
        { text: 'Premium Servers', included: false },
        { text: 'No Logs Policy', included: true },
      ],
      cta: 'Choose Plan',
      popular: false,
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Why Online Privacy Matters More Than Ever in 2023",
      excerpt: "Explore the growing importance of online privacy and how VPNs can help protect your digital footprint.",
      date: "May 15, 2023",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1470&q=80",
      slug: "why-online-privacy-matters"
    },
    {
      id: 2,
      title: "How to Bypass Geo-Restrictions and Access Global Content",
      excerpt: "Learn how VPN technology works to bypass geographical restrictions and access content from anywhere.",
      date: "April 28, 2023",
      readTime: 4,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1472&q=80",
      slug: "bypass-geo-restrictions"
    },
    {
      id: 3,
      title: "The Ultimate Guide to VPN Protocols",
      excerpt: "Compare different VPN protocols to understand which offers the best balance of speed and security.",
      date: "March 10, 2023",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1465&q=80",
      slug: "vpn-protocols-guide"
    }
  ];

  const testimonials = [
    { name: "Sarah Johnson",  role: "Freelance Journalist",      content: "Cloknet VPN has been essential for my work in countries with heavy internet censorship. The speeds are consistently fast and reliable.", rating: 5 },
    { name: "Michael Chen",   role: "IT Security Consultant",    content: "I've tested dozens of VPNs, and Cloknet's encryption implementation is among the best I've seen. Their no-logs policy is verified and trustworthy.", rating: 5 },
    { name: "Emma Rodriguez", role: "Digital Nomad",             content: "As someone who travels constantly, I rely on Cloknet to access my home content and protect my data on public WiFi. It just works everywhere.",   rating: 4 },
  ];

  const stats = [
    { value: "500K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "13",    label: "Countries" },
    { value: "24/7",  label: "Support" }
  ];

  return (
    <div className="overflow-hidden relative" style={{ background: DeepBlue1 }}>
      {/* Soft ambient glows (palette only) */}
      <span
        className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 blur-3xl rounded-full"
        style={{ background: 'rgba(24,169,255,0.12)' }}
      />
      <span
        className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 blur-3xl rounded-full"
        style={{ background: 'rgba(0,199,255,0.12)' }}
      />

      {/* Hero Section (make sure Hero uses palette inside) */}
      <Hero />

      {/* Stats Bar */}
      <section
        className="relative py-8"
        style={{
          background: `linear-gradient(90deg, ${NeonBlue}1F, ${BurningBlue}1F)`, // 12%
        }}
      >
        {/* conic halo */}
        <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.25, maskImage: 'linear-gradient(to bottom, black, transparent)' }}>
          <div
            className="absolute -inset-px"
            style={{
              background: `conic-gradient(from 180deg at 50% 0%, ${NeonBlue}2E, transparent, ${BurningBlue}29, transparent, ${NeonBlue}2E)`
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={item}>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: BurningBlue }}>{stat.value}</div>
                <div className="text-xs md:text-sm uppercase tracking-wider" style={{ color: `${NeonBlue}` }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        {/* subtle grid with NeonBlue */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.05,
            background:
              `linear-gradient(to right, ${NeonBlue}CC 1px, transparent 1px),
               linear-gradient(to bottom, ${NeonBlue}CC 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: NeonBlue }}>
              Why Choose <span style={{ color: BurningBlue }}>Cloknet VPN</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: `${NeonBlue}` }}>
              We provide more than just a VPN service. Our technology is designed to keep you safe, private, and unrestricted online with enterprise-grade security made simple.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={item}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  glowColor={feature.glowColor}
                  stats={feature.stats}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Server Locations */}
      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(180deg, ${DeepBlue2}B3, ${DeepBlue1}B3)` // glassy layer
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: NeonBlue }}>
              Global <span style={{ color: BurningBlue }}>Server Network</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: NeonBlue }}>
              Connect to any of our high-speed servers worldwide for secure and private browsing with minimal latency.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {popularServers.map(server => (
              <motion.div key={server.id} variants={item}>
                <ServerCard server={server} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <a
              href="/servers"
              className="inline-block px-8 py-3 rounded-md font-medium transition relative overflow-hidden"
              style={{
                color: BurningBlue,
                border: `1px solid ${BurningBlue}`,
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.background = `${BurningBlue}`; e.currentTarget.style.color = DeepBlue1;}}
              onMouseLeave={(e)=>{e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BurningBlue;}}
            >
              View All Server Locations
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative" style={{ background: DeepBlue1 }}>
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: NeonBlue }}>
              How Cloknet <span style={{ color: BurningBlue }}>VPN Works</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: NeonBlue }}>
              Our VPN creates a secure tunnel between your device and the internet to protect your data and privacy.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <FiDownload size={24} color={DeepBlue1} />, title: '1. Download & Install', text: 'Get our app for Windows, Mac, iOS, Android, or Linux in just a few clicks.' },
              { icon: <FiGlobe    size={24} color={DeepBlue1} />, title: '2. Connect to a Server', text: 'Choose from our global network of high-speed servers with one click.' },
              { icon: <FiShield   size={24} color={DeepBlue1} />, title: '3. Browse Securely',     text: 'Your connection is now encrypted and your online activity is private.' },
            ].map((step, i) => (
              <motion.div key={i} variants={item} className="text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                     style={{ background: `${BurningBlue}33` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                       style={{ background: BurningBlue, color: DeepBlue1, boxShadow: '0 0 18px rgba(0,199,255,0.35)' }}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: NeonBlue }}>{step.title}</h3>
                <p style={{ color: NeonBlue }}>{step.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Advanced Features card */}
          <div
            className="rounded-xl p-8"
            style={{
              background: `${DeepBlue2}80`,
              border: `1px solid ${NeonBlue}2E`,
              boxShadow: '0 12px 40px rgba(0,199,255,0.12)'
            }}
          >
            <div className="md:flex items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-4" style={{ color: BurningBlue }}>Advanced VPN Features</h3>
                <ul className="space-y-3">
                  {['WireGuard® protocol for fastest speeds', 'Split tunneling for flexible routing', 'DNS leak protection', 'IPv6 leak protection'].map((t, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheckCircle style={{ color: BurningBlue, marginRight: 8, marginTop: 4 }} size={20} />
                      <span style={{ color: NeonBlue }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <div
                  className="p-6 rounded-lg"
                  style={{ background: `${DeepBlue1}CC`, border: `1px solid ${NeonBlue}29` }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: BurningBlue }}>Performance Metrics</h3>
                  <div className="space-y-4">
                    <MetricBar label="Connection Speed:" value="950 Mbps" percent={95} />
                    <MetricBar label="Latency:"          value="28 ms"     percent={90} />
                    <MetricBar label="Uptime:"           value="99.99%"    percent={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-20 relative"
        style={{
          background: `linear-gradient(180deg, ${DeepBlue2}B3, ${DeepBlue1}B3)`
        }}
      >
        {/* conic halo */}
        <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.3, maskImage: 'linear-gradient(to top, black, transparent)' }}>
          <div
            className="absolute -inset-px"
            style={{
              background: `conic-gradient(from 0deg at 50% 100%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: NeonBlue }}>
              Simple, Transparent <span style={{ color: BurningBlue }}>Pricing</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: NeonBlue }}>
              Choose the plan that fits your needs. All plans include our core VPN features with different levels of access.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={item}
                className="relative rounded-xl overflow-hidden transition"
                whileHover={{ y: -6 }}
                style={{
                  background: `${DeepBlue1}7A`,
                  border: `1px solid ${plan.popular ? BurningBlue : `${NeonBlue}29`}`,
                  boxShadow: plan.popular ? '0 20px 60px rgba(0,199,255,0.18)' : '0 12px 40px rgba(24,169,255,0.10)'
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-lg"
                    style={{ background: BurningBlue, color: DeepBlue1, boxShadow: '0 6px 16px rgba(0,199,255,0.25)' }}
                  >
                    POPULAR
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-bold mr-3" style={{ color: NeonBlue }}>{plan.name}</h3>
                    {plan.popular && <FiAward style={{ color: BurningBlue }} />}
                  </div>
                  <p className="text-sm mb-6" style={{ color: NeonBlue }}>{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold" style={{ color: BurningBlue }}>${plan.price}</span>
                    <span style={{ color: NeonBlue }}>/month</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-md font-medium mb-6 relative overflow-hidden"
                    style={{
                      background: plan.popular ? `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})` : 'transparent',
                      color: plan.popular ? DeepBlue1 : BurningBlue,
                      border: plan.popular ? 'none' : `1px solid ${BurningBlue}`,
                      boxShadow: plan.popular ? '0 0 22px rgba(0,199,255,0.25)' : 'none'
                    }}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                    <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span
                        className="absolute inset-y-0 -left-1 w-1/3 skew-x-12"
                        style={{
                          background: `linear-gradient(90deg, ${NeonBlue}00, ${NeonBlue}33, ${NeonBlue}00)`,
                          animation: 'shimmer 1.8s ease-in-out infinite'
                        }}
                      />
                    </span>
                  </motion.button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        {feature.included ? (
                          <FiCheck style={{ color: BurningBlue, marginRight: 8 }} />
                        ) : (
                          <FiX style={{ color: `${NeonBlue}99`, marginRight: 8 }} />
                        )}
                        <span style={{ color: feature.included ? NeonBlue : `${NeonBlue}80` }}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <div
              className="inline-flex items-center rounded-lg p-4"
              style={{ background: `${DeepBlue1}7A`, border: `1px solid ${NeonBlue}29` }}
            >
              <FiCheckCircle style={{ color: BurningBlue, marginRight: 8 }} size={20} />
              <span style={{ color: NeonBlue }}>All plans include our 30-day money-back guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: DeepBlue1 }}>
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: NeonBlue }}>
              What Our <span style={{ color: BurningBlue }}>Users Say</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: NeonBlue }}>
              Don't just take our word for it. Here's what our customers have to say about Cloknet VPN.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -4 }}
                className="rounded-lg p-6"
                style={{ background: `${DeepBlue2}80`, border: `1px solid ${NeonBlue}29` }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ color: i < testimonial.rating ? BurningBlue : `${NeonBlue}40` }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 italic" style={{ color: NeonBlue }}>"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full mr-3"
                       style={{ background: `${NeonBlue}26` }} />
                  <div>
                    <h4 className="font-medium" style={{ color: BurningBlue }}>{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: NeonBlue }}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20" style={{ background: `linear-gradient(180deg, ${DeepBlue2}B3, ${DeepBlue1}B3)` }}>
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: NeonBlue }}>
              Cloknet vs. <span style={{ color: BurningBlue }}>Other VPNs</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: NeonBlue }}>
              See how we stack up against the competition when it comes to features, speed, and value.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <table className="w-full rounded-lg overflow-hidden" style={{ background: `${DeepBlue1}7A`, border: `1px solid ${NeonBlue}29` }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${NeonBlue}29` }}>
                  <th className="px-6 py-4 text-left font-medium" style={{ color: NeonBlue }}>Feature</th>
                  <th className="px-6 py-4 text-center font-medium" style={{ color: BurningBlue }}>Cloknet VPN</th>
                  <th className="px-6 py-4 text-center font-medium" style={{ color: NeonBlue }}>Competitor A</th>
                  <th className="px-6 py-4 text-center font-medium" style={{ color: NeonBlue }}>Competitor B</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${NeonBlue}29` }}>
                  <td className="px-6 py-4" style={{ color: NeonBlue }}>No-Logs Policy</td>
                  <td className="px-6 py-4 text-center" style={{ color: BurningBlue }}>
                    <FiCheckCircle className="inline" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>
                    <FiCheckCircle className="inline" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center" style={{ color: `${NeonBlue}99` }}>
                    <FiX className="inline" size={20} />
                  </td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${NeonBlue}29` }}>
                  <td className="px-6 py-4" style={{ color: NeonBlue }}>Average Speed</td>
                  <td className="px-6 py-4 text-center" style={{ color: BurningBlue }}>950 Mbps</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>650 Mbps</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>480 Mbps</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${NeonBlue}29` }}>
                  <td className="px-6 py-4" style={{ color: NeonBlue }}>Server Locations</td>
                  <td className="px-6 py-4 text-center" style={{ color: BurningBlue }}>13 countries</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>8 countries</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>5 countries</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${NeonBlue}29` }}>
                  <td className="px-6 py-4" style={{ color: NeonBlue }}>Simultaneous Devices</td>
                  <td className="px-6 py-4 text-center" style={{ color: BurningBlue }}>5</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>3</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>2</td>
                </tr>
                <tr>
                  <td className="px-6 py-4" style={{ color: NeonBlue }}>Starting Price</td>
                  <td className="px-6 py-4 text-center" style={{ color: BurningBlue }}>$4.99/mo</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>$9.99/mo</td>
                  <td className="px-6 py-4 text-center" style={{ color: NeonBlue }}>$11.99/mo</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20" style={{ background: DeepBlue1 }}>
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: NeonBlue }}>
              Latest from Our <span style={{ color: BurningBlue }}>Blog</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg" style={{ color: NeonBlue }}>
              Stay updated with the latest news, tips, and insights about online privacy, security, and VPN technology.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map(post => (
              <motion.div key={post.id} variants={item}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <a
              href="/blog"
              className="inline-block px-8 py-3 rounded-md font-medium transition"
              style={{
                color: BurningBlue,
                border: `1px solid ${BurningBlue}`
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.background = `${BurningBlue}`; e.currentTarget.style.color = DeepBlue1;}}
              onMouseLeave={(e)=>{e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BurningBlue;}}
            >
              View All Articles
            </a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative"
        style={{ background: `linear-gradient(180deg, ${DeepBlue2}B3, ${DeepBlue1}B3)` }}
      >
        <div className="container mx-auto px-4 text-center relative">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: NeonBlue }}>
            Ready to Take Control of Your <span style={{ color: BurningBlue }}>Online Privacy</span>?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xl max-w-3xl mx-auto mb-8" style={{ color: NeonBlue }}>
            Join over 500,000 users who trust Cloknet VPN to protect their internet connection.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/pricing"
              className="px-8 py-4 rounded-md font-medium transition text-lg"
              style={{
                background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
                color: DeepBlue1,
                boxShadow: '0 0 28px rgba(0,199,255,0.18)'
              }}
            >
              Get Cloknet VPN Now
            </a>
            <a
              href="/features"
              className="px-8 py-4 rounded-md font-medium transition text-lg"
              style={{
                border: `1px solid ${BurningBlue}`,
                color: BurningBlue
              }}
              onMouseEnter={(e)=>{e.currentTarget.style.background = `${BurningBlue}`; e.currentTarget.style.color = DeepBlue1;}}
              onMouseLeave={(e)=>{e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BurningBlue;}}
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* local keyframes */}
      <style>{`
        @keyframes shimmer { 0%{ transform: translateX(-100%);} 100%{ transform: translateX(200%);} }
        @media (prefers-reduced-motion: reduce){
          *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
        }
      `}</style>
    </div>
  );
};

/** Animated metric bar — palette-only gradient **/
const MetricBar = ({ label, value, percent }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span style={{ color: NeonBlue }}>{label}</span>
      <span style={{ color: BurningBlue }}>{value}</span>
    </div>
    <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: `${DeepBlue2}80` }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        className="h-2 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${NeonBlue}, ${BurningBlue})`,
          boxShadow: '0 0 14px rgba(0,199,255,0.35)'
        }}
      />
    </div>
  </div>
);

export default Home;
