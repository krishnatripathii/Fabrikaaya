import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="hero">
      <span className="eyebrow fade-up" style={{animationDelay: '0.3s'}}>
        Connecting Creators & Connoisseurs
      </span>
      
      <h1 className="hero-title fade-up" style={{animationDelay: '0.5s'}}>
        The Future of <br/> <em className="title-italic">Bespoke</em> Fashion
      </h1>
      
      <p className="hero-tagline fade-up" style={{animationDelay: '0.7s'}}>
        Where vision meets craftsmanship.
      </p>
      
      <p className="hero-desc fade-up" style={{animationDelay: '0.9s'}}>
        Explore an exclusive marketplace designed for fashion enthusiasts. Discover emerging designers, discuss your unique ideas, and order custom-stitched garments tailored precisely to your imagination.
      </p>
      
      <div className="hero-actions fade-up" style={{animationDelay: '1.1s'}}>
        <Link to="/feed" className="btn-primary">Explore Designs</Link>
        <Link to="/register" className="btn-outline">Join as Designer</Link>
      </div>

      <div className="scroll-hint fade-up" style={{animationDelay: '1.8s'}}>
        <span>Scroll to Explore</span>
        <div className="scroll-line"></div>
      </div>
    </div>
  );
};

export default Home;
