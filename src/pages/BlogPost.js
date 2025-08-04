import { useParams } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  
  // In a real app, you would fetch the post data based on the slug
  // For this demo, we'll use static data
  const blogPosts = {
    "why-online-privacy-matters": {
      id: 1,
      title: "Why Online Privacy Matters More Than Ever in 2023",
      content: `
        <p>In today's digital age, our lives are increasingly conducted online. From social media to online banking, we share vast amounts of personal information on the internet. This makes online privacy more important than ever before.</p>
        
        <h2>The Growing Threats to Privacy</h2>
        <p>Several factors have contributed to the erosion of online privacy in recent years:</p>
        <ul>
          <li><strong>Data Collection:</strong> Companies track your every move online to build detailed profiles for targeted advertising.</li>
          <li><strong>Government Surveillance:</strong> Many governments have expanded their surveillance capabilities, often with little oversight.</li>
          <li><strong>Cybercrime:</strong> Hackers are constantly developing new methods to steal personal information.</li>
          <li><strong>Data Breaches:</strong> Even reputable companies suffer breaches that expose user data.</li>
        </ul>
        
        <h2>How VPNs Protect Your Privacy</h2>
        <p>A Virtual Private Network (VPN) creates an encrypted tunnel between your device and the internet, providing several key privacy benefits:</p>
        <ol>
          <li><strong>Encryption:</strong> Your internet traffic is scrambled, making it unreadable to snoopers.</li>
          <li><strong>IP Masking:</strong> Your real IP address is hidden, making it harder to track your location.</li>
          <li><strong>Public Wi-Fi Security:</strong> Protects your data when using unsecured networks in cafes, airports, etc.</li>
          <li><strong>Bypassing Censorship:</strong> Allows access to information in restrictive regions.</li>
        </ol>
        
        <p>As we move further into the digital age, taking control of your online privacy isn't just advisable—it's essential. Tools like VPNs are no longer just for tech experts; they're becoming a necessity for anyone who values their digital rights and security.</p>
      `,
      date: "May 15, 2023",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      author: "Jane Smith",
      authorRole: "Privacy Advocate"
    },
    // Other posts would be defined here...
  };

  const post = blogPosts[slug] || blogPosts["why-online-privacy-matters"];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-primary hover:text-glow mb-6 transition"
        >
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>
        
        <article>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center text-lighttext text-sm mb-8">
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
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
          />
          
          <div 
            className="prose prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-700 mr-4"></div>
              <div>
                <h4 className="font-medium text-white">{post.author}</h4>
                <p className="text-lighttext text-sm">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </article>
        
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-700 hover:border-primary transition">
              <h4 className="font-medium text-white mb-2">How to Set Up a VPN on All Your Devices</h4>
              <p className="text-lighttext text-sm mb-3">Step-by-step instructions for configuring Cloknet VPN on various platforms.</p>
              <Link to="/blog/setup-vpn-all-devices" className="text-primary hover:text-glow text-sm font-medium transition">Read Article</Link>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-700 hover:border-primary transition">
              <h4 className="font-medium text-white mb-2">5 Common VPN Myths Debunked</h4>
              <p className="text-lighttext text-sm mb-3">We tackle the most common misconceptions about VPN services.</p>
              <Link to="/blog/vpn-myths-debunked" className="text-primary hover:text-glow text-sm font-medium transition">Read Article</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;