import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import ServerCard from '../components/ServerCard';
import { FiCheck, FiX, FiAward, FiDownload, FiGlobe, FiShield, FiCheckCircle } from 'react-icons/fi';
import PricingTable from '../components/PricingTable';
import BlogCard from '../components/BlogCard';
import { motion, AnimatePresence } from 'framer-motion';

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
  // Enhanced features list
  const features = [
    {
      icon: <FiShield size={24} />,
      title: "Military-Grade Encryption",
      description: "AES-256 encryption, the same standard used by governments and security experts worldwide to protect classified information.",
      glowColor: "bg-primary",
      stats: "99.9% security guarantee"
    },
    {
      icon: <FiGlobe size={24} />,
      title: "Global Server Network",
      description: "13 high-speed servers across 3 continents with unlimited bandwidth and optimal routing for reduced latency.",
      glowColor: "bg-purple-500",
      stats: "13 locations worldwide"
    },
    {
      icon: <FiDownload size={24} />,
      title: "Lightning Fast Speeds",
      description: "Our optimized network infrastructure delivers speeds up to 1Gbps with minimal impact on your connection.",
      glowColor: "bg-glow",
      stats: "Up to 1Gbps speeds"
    },
    {
      icon: <FiShield size={24} />,
      title: "Strict No-Logs Policy",
      description: "We never track, store, or share your online activities. Independently audited for transparency.",
      glowColor: "bg-green-500",
      stats: "Zero logs kept"
    },
    {
      icon: <FiShield size={24} />,
      title: "Ad & Tracker Blocking",
      description: "Built-in protection against ads, trackers, and malicious websites for cleaner, safer browsing.",
      glowColor: "bg-yellow-500",
      stats: "Blocks 10M+ trackers"
    },
    {
      icon: <FiShield size={24} />,
      title: "Multi-Device Support",
      description: "Protect all your devices simultaneously with a single account (up to 5 connections at once).",
      glowColor: "bg-red-500",
      stats: "5 devices at once"
    },
    {
      icon: <FiShield size={24} />,
      title: "Anonymous Browsing",
      description: "Hide your real IP address and location to browse anonymously without being tracked.",
      glowColor: "bg-blue-500",
      stats: "100% anonymous"
    },
    {
      icon: <FiShield size={24} />,
      title: "Kill Switch",
      description: "Automatically blocks internet access if VPN connection drops to prevent data leaks.",
      glowColor: "bg-pink-500",
      stats: "Zero leaks guaranteed"
    }
  ];

  // Popular servers
  const popularServers = [
    { id: 1, country: "United States", countryCode: "US", city: "New York", type: "free", load: 45, ping: 28, speed: 85 },
    { id: 2, country: "United Kingdom", countryCode: "GB", city: "London", type: "free", load: 62, ping: 42, speed: 72 },
    { id: 3, country: "Germany", countryCode: "DE", city: "Frankfurt", type: "free", load: 38, ping: 35, speed: 91 },
    { id: 8, country: "Australia", countryCode: "AU", city: "Sydney", type: "premium", load: 29, ping: 198, speed: 88 },
  ];

  // Pricing plans
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

  // Latest blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Why Online Privacy Matters More Than Ever in 2023",
      excerpt: "Explore the growing importance of online privacy and how VPNs can help protect your digital footprint.",
      date: "May 15, 2023",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      slug: "why-online-privacy-matters"
    },
    {
      id: 2,
      title: "How to Bypass Geo-Restrictions and Access Global Content",
      excerpt: "Learn how VPN technology works to bypass geographical restrictions and access content from anywhere.",
      date: "April 28, 2023",
      readTime: 4,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      slug: "bypass-geo-restrictions"
    },
    {
      id: 3,
      title: "The Ultimate Guide to VPN Protocols",
      excerpt: "Compare different VPN protocols to understand which offers the best balance of speed and security.",
      date: "March 10, 2023",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
      slug: "vpn-protocols-guide"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Journalist",
      content: "Cloknet VPN has been essential for my work in countries with heavy internet censorship. The speeds are consistently fast and reliable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "IT Security Consultant",
      content: "I've tested dozens of VPNs, and Cloknet's encryption implementation is among the best I've seen. Their no-logs policy is verified and trustworthy.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Digital Nomad",
      content: "As someone who travels constantly, I rely on Cloknet to access my home content and protect my data on public WiFi. It just works everywhere.",
      rating: 4
    }
  ];

  // Stats
  const stats = [
    { value: "500K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "13", label: "Countries" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="overflow-hidden relative">
      {/* Soft ambient glows (top/bottom) */}
      <span className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 bg-cyan-500/10 blur-3xl rounded-full" />
      <span className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 bg-fuchsia-500/10 blur-3xl rounded-full" />

      {/* Hero Section */}
      <Hero />

      {/* Stats Bar */}
      <section className="relative bg-primary py-8">
        {/* conic halo */}
        <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <div className="absolute -inset-px bg-[conic-gradient(from_180deg_at_50%_0%,rgba(255,255,255,.18),transparent,rgba(255,255,255,.18))]" />
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
              <motion.div key={index} variants={item} className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm uppercase tracking-wider opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-deepnavy relative">
        {/* subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="container mx-auto px-4 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Why Choose <span className="text-primary">Cloknet VPN</span></h2>
            <p className="text-lighttext max-w-3xl mx-auto text-lg">
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
      <section className="py-20 gradient-bg relative">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Global <span className="text-primary">Server Network</span></h2>
            <p className="text-lighttext max-w-3xl mx-auto text-lg">
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
              className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition"
            >
              View All Server Locations
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-deepnavy relative">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How Cloknet <span className="text-primary">VPN Works</span></h2>
            <p className="text-lighttext max-w-3xl mx-auto text-lg">
              Our VPN creates a secure tunnel between your device and the internet to protect your data and privacy.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <FiDownload size={24} />, title: '1. Download & Install', text: 'Get our app for Windows, Mac, iOS, Android, or Linux in just a few clicks.' },
              { icon: <FiGlobe size={24} />, title: '2. Connect to a Server', text: 'Choose from our global network of high-speed servers with one click.' },
              { icon: <FiShield size={24} />, title: '3. Browse Securely', text: 'Your connection is now encrypted and your online activity is private.' },
            ].map((step, i) => (
              <motion.div key={i} variants={item} className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_18px_#00CFFF55]">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-lighttext">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <div className="md:flex items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-4">Advanced VPN Features</h3>
                <ul className="space-y-3">
                  {['WireGuard® protocol for fastest speeds', 'Split tunneling for flexible routing', 'DNS leak protection', 'IPv6 leak protection'].map((t, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <MetricBar label="Connection Speed:" value="950 Mbps" percent={95} color="bg-green-500" />
                    <MetricBar label="Latency:" value="28 ms" percent={90} color="bg-blue-500" />
                    <MetricBar label="Uptime:" value="99.99%" percent={100} color="bg-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 gradient-bg relative">
        {/* conic halo */}
        <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]">
          <div className="absolute -inset-px bg-[conic-gradient(from_0deg_at_50%_100%,rgba(0,207,255,.18),transparent,rgba(255,0,128,.15),transparent,rgba(0,207,255,.18))]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Simple, Transparent <span className="text-primary">Pricing</span></h2>
            <p className="text-lighttext max-w-3xl mx-auto text-lg">
              Choose the plan that fits your needs. All plans include our core VPN features with different levels of access.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`relative rounded-xl overflow-hidden border ${plan.popular ? 'border-primary hover-glow' : 'border-gray-700'} hover:border-primary transition bg-white/5 backdrop-blur-xl`}
                whileHover={{ y: -6 }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow">
                    POPULAR
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-bold text-white mr-3">{plan.name}</h3>
                    {plan.popular && <FiAward className="text-yellow-400" />}
                  </div>
                  <p className="text-lighttext text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-lighttext">/month</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-md font-medium mb-6 ${plan.popular ? 'bg-primary hover:bg-glow text-white hover-glow' : 'border border-primary text-primary hover:bg-primary hover:text-white'} transition relative overflow-hidden`}
                  >
                    <span className="relative z-10">{plan.cta}</span>
                    <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute inset-y-0 -left-1 w-1/3 skew-x-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_1.8s_ease-in-out_infinite]" />
                    </span>
                  </motion.button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        {feature.included ? (
                          <FiCheck className="text-green-500 mr-2" />
                        ) : (
                          <FiX className="text-red-500 mr-2" />
                        )}
                        <span className={feature.included ? 'text-lighttext' : 'text-gray-600'}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <div className="inline-flex items-center bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <FiCheckCircle className="text-green-500 mr-2" size={20} />
              <span className="text-lighttext">All plans include our 30-day money-back guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-deepnavy">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What Our <span className="text-primary">Users Say</span></h2>
            <p className="text-lighttext max-w-3xl mx-auto text-lg">
              Don't just take our word for it. Here's what our customers have to say about Cloknet VPN.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={item} whileHover={{ y: -4 }} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lighttext mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-lighttext text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Cloknet vs. <span className="text-primary">Other VPNs</span></h2>
            <p className="text-lighttext max-w-3xl mx-auto text-lg">
              See how we stack up against the competition when it comes to features, speed, and value.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <table className="w-full bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-lighttext font-medium">Feature</th>
                  <th className="px-6 py-4 text-center text-primary font-medium">Cloknet VPN</th>
                  <th className="px-6 py-4 text-center text-lighttext font-medium">Competitor A</th>
                  <th className="px-6 py-4 text-center text-lighttext font-medium">Competitor B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 text-lighttext">No-Logs Policy</td>
                  <td className="px-6 py-4 text-center text-primary">
                    <FiCheckCircle className="inline text-green-500" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center text-lighttext">
                    <FiCheckCircle className="inline text-green-500" size={20} />
                  </td>
                  <td className="px-6 py-4 text-center text-lighttext">
                    <FiX className="inline text-red-500" size={20} />
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 text-lighttext">Average Speed</td>
                  <td className="px-6 py-4 text-center text-primary">950 Mbps</td>
                  <td className="px-6 py-4 text-center text-lighttext">650 Mbps</td>
                  <td className="px-6 py-4 text-center text-lighttext">480 Mbps</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 text-lighttext">Server Locations</td>
                  <td className="px-6 py-4 text-center text-primary">13 countries</td>
                  <td className="px-6 py-4 text-center text-lighttext">8 countries</td>
                  <td className="px-6 py-4 text-center text-lighttext">5 countries</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4 text-lighttext">Simultaneous Devices</td>
                  <td className="px-6 py-4 text-center text-primary">5</td>
                  <td className="px-6 py-4 text-center text-lighttext">3</td>
                  <td className="px-6 py-4 text-center text-lighttext">2</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-lighttext">Starting Price</td>
                  <td className="px-6 py-4 text-center text-primary">$4.99/mo</td>
                  <td className="px-6 py-4 text-center text-lighttext">$9.99/mo</td>
                  <td className="px-6 py-4 text-center text-lighttext">$11.99/mo</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-deepnavy">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Latest from Our <span className="text-primary">Blog</span></h2>
            <p className="text-lighttext max-w-3xl mx-auto text-lg">
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
              className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-md font-medium transition"
            >
              View All Articles
            </a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-bg relative">
        <div className="container mx-auto px-4 text-center relative">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Take Control of Your <span className="text-primary">Online Privacy</span>?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lighttext text-xl max-w-3xl mx-auto mb-8">
            Join over 500,000 users who trust Cloknet VPN to protect their internet connection.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/pricing"
              className="bg-primary hover:bg-glow text-white px-8 py-4 rounded-md font-medium hover-glow transition text-lg"
            >
              Get Cloknet VPN Now
            </a>
            <a
              href="/features"
              className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-md font-medium transition text-lg"
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

/** animated metric bar for the “Performance Metrics” card **/
const MetricBar = ({ label, value, percent, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-lighttext">{label}</span>
      <span className="text-white">{value}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className={`h-2 rounded-full ${color}`}
      />
    </div>
  </div>
);

export default Home;
