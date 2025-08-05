import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black/80 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-primary hover:shadow-[0_0_25px_#00CFFF66] transition-all duration-300 group relative">

      {/* Subtle glowing border effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 group-hover:border-primary/40 transition-all duration-300"></div>

      {/* Image section */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {/* Featured Badge */}
        {post.featured && (
          <span className="absolute top-3 left-3 bg-primary text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse z-10">
            Featured
          </span>
        )}

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Meta */}
        <div className="flex items-center text-xs text-lighttext mb-3 space-x-2 opacity-80">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>

        {/* Title */}
        <h3 className="text-white text-2xl font-semibold mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-lighttext text-sm mb-5 leading-relaxed line-clamp-3 opacity-90">
          {post.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary font-semibold hover:text-glow transition-all duration-300 group-hover:underline"
        >
          Read More
          <svg
            className="w-4 h-4 ml-1 stroke-current animate-moveRight group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
