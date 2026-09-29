import { useState } from 'react';
import './Register.css';

const Register = () => {
  const [role, setRole] = useState('customer');

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock submit
    alert(`Registered as ${role}`);
  };

  return (
    <div className="page-container register-page">
      <div className="register-box fade-up">
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>
          Join <em className="title-italic">Fabrikaaya</em>
        </h1>
        <p className="hero-tagline" style={{ fontSize: '1rem', marginTop: '10px' }}>
          Become part of the fabric revolution.
        </p>

        <div className="role-selector">
          <button 
            type="button"
            className={`role-btn ${role === 'customer' ? 'active' : ''}`}
            onClick={() => setRole('customer')}
          >
            Enthusiast (Customer)
          </button>
          <button 
            type="button"
            className={`role-btn ${role === 'designer' ? 'active' : ''}`}
            onClick={() => setRole('designer')}
          >
            Creator (Designer)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="Create a password" required />
          </div>
          
          {role === 'designer' && (
            <div className="form-group fade-up" style={{ animationDuration: '0.5s' }}>
              <label className="form-label">Portfolio URL</label>
              <input type="url" className="form-input" placeholder="Link to your work" required />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
