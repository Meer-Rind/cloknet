import BlogCard from '../components/BlogCard';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Why Online Privacy Matters More Than Ever in 2023",
      excerpt: "Explore the growing importance of online privacy and how VPNs can help protect your digital footprint in an increasingly connected world.",
      date: "May 15, 2023",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      slug: "why-online-privacy-matters"
    },
    {
      id: 2,
      title: "How to Bypass Geo-Restrictions and Access Global Content",
      excerpt: "Learn how VPN technology works to bypass geographical restrictions and access content from anywhere in the world.",
      date: "April 28, 2023",
      readTime: 4,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      slug: "bypass-geo-restrictions"
    },
    {
      id: 3,
      title: "The Ultimate Guide to VPN Protocols: Which One Should You Use?",
      excerpt: "Compare different VPN protocols like OpenVPN, WireGuard, and IKEv2 to understand which offers the best balance of speed and security.",
      date: "March 10, 2023",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
      slug: "vpn-protocols-guide"
    },
    {
      id: 4,
      title: "5 Common VPN Myths Debunked",
      excerpt: "We tackle the most common misconceptions about VPN services and separate fact from fiction.",
      date: "February 22, 2023",
      readTime: 3,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      slug: "vpn-myths-debunked"
    },
    {
      id: 5,
      title: "How to Set Up a VPN on All Your Devices",
      excerpt: "Step-by-step instructions for configuring Cloknet VPN on Windows, Mac, iOS, Android, and even your router.",
      date: "January 15, 2023",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      slug: "setup-vpn-all-devices"
    },
    {
      id: 6,
      title: "The Future of Internet Privacy: Trends to Watch",
      excerpt: "Exploring emerging technologies and regulations that will shape the future of online privacy and digital rights.",
      date: "December 5, 2022",
      readTime: 8,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      slug: "future-internet-privacy"
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cloknet VPN <span className="text-primary">Blog</span></h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and insights about online privacy, security, and VPN technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-md font-medium transition">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;