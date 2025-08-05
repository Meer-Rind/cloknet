import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FiMenu,
  FiX,
  FiShield,
  FiServer,
  FiDollarSign,
  FiBook,
  FiMail,
} from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#011E3C]/60 shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-[#00CFFF] hover:shadow-[0_0_10px_#00E5FF] transition duration-300 flex items-center justify-center">
              <FiShield className="text-white text-xl" />
            </div>
            <span className="text-white font-semibold text-xl tracking-wide">
              Cloknet VPN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <NavItem to="/features" icon={<FiServer />}>Features</NavItem>
            <NavItem to="/servers" icon={<FiServer />}>Servers</NavItem>
            <NavItem to="/pricing" icon={<FiDollarSign />}>Pricing</NavItem>
            <NavItem to="/blog" icon={<FiBook />}>Blog</NavItem>
            <NavItem to="/contact" icon={<FiMail />}>Contact</NavItem>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#00E5FF] focus:outline-none transition"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              <NavItemMobile to="/features" icon={<FiServer />} setIsOpen={setIsOpen}>Features</NavItemMobile>
              <NavItemMobile to="/servers" icon={<FiServer />} setIsOpen={setIsOpen}>Servers</NavItemMobile>
              <NavItemMobile to="/pricing" icon={<FiDollarSign />} setIsOpen={setIsOpen}>Pricing</NavItemMobile>
              <NavItemMobile to="/blog" icon={<FiBook />} setIsOpen={setIsOpen}>Blog</NavItemMobile>
              <NavItemMobile to="/contact" icon={<FiMail />} setIsOpen={setIsOpen}>Contact</NavItemMobile>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Desktop nav item
const NavItem = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center text-white hover:text-[#00E5FF] transition duration-200"
  >
    <span className="mr-1">{icon}</span>
    {children}
  </Link>
);

// Mobile nav item
const NavItemMobile = ({ to, icon, children, setIsOpen }) => (
  <Link
    to={to}
    onClick={() => setIsOpen(false)}
    className="flex items-center text-white hover:text-[#00E5FF] transition duration-200"
  >
    <span className="mr-2">{icon}</span>
    {children}
  </Link>
);

export default Header;
