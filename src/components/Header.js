import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiShield, FiServer, FiDollarSign, FiBook, FiMail } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-deepnavy shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover-glow">
              <FiShield className="text-white text-xl" />
            </div>
            <span className="text-white font-bold text-xl">Cloknet VPN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/features" className="text-lighttext hover:text-white transition flex items-center">
              <FiServer className="mr-1" /> Features
            </Link>
            <Link to="/servers" className="text-lighttext hover:text-white transition flex items-center">
              <FiServer className="mr-1" /> Servers
            </Link>
            <Link to="/pricing" className="text-lighttext hover:text-white transition flex items-center">
              <FiDollarSign className="mr-1" /> Pricing
            </Link>
            <Link to="/blog" className="text-lighttext hover:text-white transition flex items-center">
              <FiBook className="mr-1" /> Blog
            </Link>
            <Link to="/contact" className="text-lighttext hover:text-white transition flex items-center">
              <FiMail className="mr-1" /> Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lighttext hover:text-white focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/features" 
                className="text-lighttext hover:text-white transition flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FiServer className="mr-2" /> Features
              </Link>
              <Link 
                to="/servers" 
                className="text-lighttext hover:text-white transition flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FiServer className="mr-2" /> Servers
              </Link>
              <Link 
                to="/pricing" 
                className="text-lighttext hover:text-white transition flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FiDollarSign className="mr-2" /> Pricing
              </Link>
              <Link 
                to="/blog" 
                className="text-lighttext hover:text-white transition flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FiBook className="mr-2" /> Blog
              </Link>
              <Link 
                to="/contact" 
                className="text-lighttext hover:text-white transition flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FiMail className="mr-2" /> Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;