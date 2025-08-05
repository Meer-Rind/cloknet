import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';

const BlogPost = () => {
  const { slug } = useParams();

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
    <div className="py-16 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:text-glow mb-6 transition"
        >
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>

        <article>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-lighttext text-sm mb-6">
            <div className="flex items-center mr-4">
              <FiCalendar className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8 border border-gray-700"
          />

          <div
            className="prose prose-invert max-w-none leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-gray-700 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-700 mr-4 flex items-center justify-center text-white font-bold text-lg">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-medium text-white">{post.author}</h4>
              <p className="text-lighttext text-sm">{post.authorRole}</p>
            </div>
          </div>
        </article>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">📚 Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-700 hover:border-primary transition">
              <h4 className="font-medium text-white text-lg mb-2">
                How to Set Up a VPN on All Your Devices
              </h4>
              <p className="text-lighttext text-sm mb-3">
                Step-by-step instructions for configuring Cloknet VPN on Windows, Mac, iOS, Android, and routers.
              </p>
              <Link
                to="/blog/setup-vpn-all-devices"
                className="text-primary hover:text-glow text-sm font-medium transition"
              >
                Read Article →
              </Link>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-700 hover:border-primary transition">
              <h4 className="font-medium text-white text-lg mb-2">
                5 Common VPN Myths Debunked
              </h4>
              <p className="text-lighttext text-sm mb-3">
                We expose the most popular myths and misconceptions about VPN technology — and reveal the truth.
              </p>
              <Link
                to="/blog/vpn-myths-debunked"
                className="text-primary hover:text-glow text-sm font-medium transition"
              >
                Read Article →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
