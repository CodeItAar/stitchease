import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

export default function LandingPage() {
  return (
    <div className="landing-container" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#fdfbf7', minHeight: '100vh', color: '#333' }}>

      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5rem', borderBottom: '1px solid #e5e3de' }}>
        <div className="logo">
          <h1 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', margin: 0, fontSize: '2rem', fontStyle: 'italic' }}>StitchEase</h1>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '3rem', fontSize: '1rem', color: '#4a4a4a' }}>
          <Link to="/explore" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>Designs</Link>
          <Link to="/dashboard" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>How it Works</Link>
          <Link to="/dashboard" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>Track Order</Link>
          <Link to="/dashboard" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>About Us</Link>
        </div>
        <div className="nav-actions">
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '0.6rem 2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5rem', gap: '4rem', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Left Column (Text & CTAs) */}
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '4rem', color: '#222', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Custom Ethnic Wear,<br />
            <span style={{ fontStyle: 'italic', color: '#5a0f28' }}>Made To Measure</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Experience the luxury of heritage-crafted bridal, party, and intricate embroidery wear, tailored specifically for your unique measurements. Our atelier brings bespoke artistry to your fingertips.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                Browse My Design
              </button>
            </Link>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: 'transparent', color: '#5a0f28', border: '1px solid #5a0f28', padding: '1rem 2.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                Track Orders
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <img
            src={heroImage}
            alt="Intricate embroidery detail"
            style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          />
        </div>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#e5e3de', padding: '3rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', margin: 0, fontSize: '1.5rem', fontStyle: 'italic' }}>StitchEase</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>&copy; 2024 StitchEase Atelier. All rights reserved.</p>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span style={{ cursor: 'pointer' }}>Shipping Info</span>
          <span style={{ cursor: 'pointer' }}>Contact Us</span>
          <span style={{ cursor: 'pointer' }}>FAQs</span>
        </div>
      </footer>

    </div>
  );
}