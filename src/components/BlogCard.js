import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-primary hover-glow transition">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center text-sm text-lighttext mb-3">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
        <p className="text-lighttext mb-4 line-clamp-2">{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-primary hover:text-glow font-medium inline-flex items-center transition"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;