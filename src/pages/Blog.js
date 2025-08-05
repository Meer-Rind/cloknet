import BlogCard from '../components/BlogCard';

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
    <div className="py-16 bg-[#0f172a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-glow">
            🔐 Cloknet VPN <span className="text-blue-500">Insights Hub</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Power up your privacy game with our expert blogs. Discover how to stay safe, smart, and one step ahead on the web.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map(post => (
            <div key={post.id} className="animate-fade-in">
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-blue-600 hover:bg-blue-600 transition duration-300 font-semibold text-lg">
            🚀 Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
