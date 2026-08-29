import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function CheckoutConfirm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};

  const orderId = state?.orderId || 'ORD-9824-AB';
  const design = state?.design || null;

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', color: '#333', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', backgroundColor: '#fdfbf7', borderBottom: '1px solid #f0e8df' }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#5a0f28', fontFamily: '"Playfair Display", serif', margin: 0, fontSize: '1.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
          StitchEase
        </h1>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555', fontWeight: '500' }}>
          <span style={{ cursor: 'pointer' }}>Collections</span>
          <span style={{ cursor: 'pointer' }}>Bespoke</span>
          <span style={{ cursor: 'pointer' }}>Heritage</span>
          <span style={{ cursor: 'pointer' }}>Atelier</span>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', color: '#333' }}>
            <span style={{ cursor: 'pointer' }}>👤</span>
            <span style={{ cursor: 'pointer' }}>🛍️</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f9f5f0', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
           <CheckCircle size={40} color="#5a0f28" />
        </div>

        <h2 style={{ color: '#5a0f28', fontFamily: '"Playfair Display", serif', fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Your Order is Placed
        </h2>
        
        <p style={{ color: '#555', fontSize: '1.1rem', textAlign: 'center', maxWidth: '500px', marginBottom: '3rem', lineHeight: '1.6' }}>
          Thank you for choosing StitchEase. Our master tailors are ready to bring your vision to life.
        </p>

        <div style={{ width: '100%', backgroundColor: '#fff', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', border: '1px dashed #e0d8cf' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
            <div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#888', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>ORDER NUMBER</p>
              <p style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem', fontWeight: 'bold' }}>
                #{typeof orderId === 'number' ? `ORD-${orderId}` : orderId}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 0.5rem 0', color: '#888', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>EST. DELIVERY</p>
              <p style={{ margin: 0, color: '#886214', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Oct 12 - Oct 15
              </p>
            </div>
          </div>

          <h3 style={{ margin: '0 0 1.5rem 0', fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: '#1a1a1a', fontWeight: '600' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <img 
              src={design ? design.sampleImage : 'https://via.placeholder.com/80x100'} 
              alt="Design" 
              style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: '6px' }} 
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1a1a1a', fontWeight: '600' }}>{design ? design.title : 'Bespoke Navy Wool Blazer'}</h4>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1a1a1a' }}>${design ? design.basePrice : '850.00'}</span>
              </div>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>Italian Merino Wool, Silk Lining</p>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <span style={{ backgroundColor: '#f5f0e6', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', color: '#333', fontWeight: '500' }}>📏 Custom Fit</span>
                <span style={{ backgroundColor: '#f5f0e6', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', color: '#333', fontWeight: '500' }}>✨ Monogram: "AB"</span>
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
          <button onClick={() => navigate('/profile')} style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            View Order Status →
          </button>
          <button onClick={() => navigate('/explore')} style={{ backgroundColor: 'transparent', color: '#5a0f28', border: '1px solid #5a0f28', padding: '1rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
            Return to Catalog
          </button>
        </div>

        <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '2rem' }}>A confirmation email has been sent to your address.</p>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1b2a22', color: '#fff', padding: '4rem 3rem', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#f5e4bc', margin: '0 0 1rem 0' }}>StitchEase</h2>
            <p style={{ color: '#a0b0a6', fontSize: '0.9rem', maxWidth: '300px', lineHeight: '1.5' }}>Handcrafted for the Modern Connoisseur.</p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1.5rem 0', color: '#fff', fontSize: '1.1rem', fontFamily: '"Playfair Display", serif' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#a0b0a6' }}>
              <span>Our Story</span>
              <span>Craftsmanship</span>
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1.5rem 0', color: '#fff', fontSize: '1.1rem', fontFamily: '"Playfair Display", serif' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#a0b0a6' }}>
              <span>Measurement Guide</span>
              <span>Privacy Policy</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1000px', margin: '3rem auto 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <p style={{ margin: 0, color: '#a0b0a6', fontSize: '0.75rem' }}>© 2024 StitchEase Bespoke. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
