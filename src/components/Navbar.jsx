import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        FABRIKAAYA
      </Link>

      {/* Desktop Nav */}
      <div className="nav-right">
        <Link to="/feed" className="nav-link">Marketplace</Link>
        <Link to="/register" className="nav-cta">Join</Link>
      </div>

      {/* Mobile Nav Toggle */}
      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/feed" className="mobile-link" onClick={() => setIsOpen(false)}>Marketplace</Link>
          <Link to="/register" className="nav-cta mobile-cta" onClick={() => setIsOpen(false)}>Join</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
