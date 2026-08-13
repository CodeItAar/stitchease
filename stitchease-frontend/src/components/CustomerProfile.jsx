import React, { useContext, useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CustomerProfile() {
  const { user, logoutUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist(user.id);
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (designId) => {
    try {
      await removeFromWishlist(user.id, designId);
      setWishlist(wishlist.filter(item => item.id !== designId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#fcfaf6', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Top Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', backgroundColor: '#fff', borderBottom: '1px solid #eaeaea' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', margin: 0, fontSize: '1.8rem', fontStyle: 'italic', cursor: 'pointer' }} onClick={() => navigate('/explore')}>
          StitchEase
        </h1>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/explore')}>Catalog</span>
          <span style={{ cursor: 'pointer' }}>Customizations</span>
          <span style={{ cursor: 'pointer', borderBottom: '2px solid #5a0f28', paddingBottom: '0.3rem', color: '#000', fontWeight: '500' }}>Profile</span>
        </nav>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontSize: '1.2rem' }}>🛍️</span>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '2rem auto', gap: '2rem', padding: '0 1rem' }}>
        
        {/* Left Sidebar */}
        <aside style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ backgroundColor: '#fdf1dc', color: '#8c591a', padding: '1rem', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
              👤 Profile Info
            </div>
            <div style={{ padding: '1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderRadius: '8px' }}>
              📏 Measurement Profiles
            </div>
            <div style={{ padding: '1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderRadius: '8px' }}>
              📦 Order History
            </div>
            <div onClick={() => document.getElementById('wishlist-section').scrollIntoView({ behavior: 'smooth' })} style={{ padding: '1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderRadius: '8px' }}>
              ❤️ Wishlist
            </div>
            <div style={{ padding: '1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderRadius: '8px' }}>
              ⚙️ Account Settings
            </div>
            <div onClick={handleLogout} style={{ padding: '1rem', color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderRadius: '8px', marginTop: '1rem' }}>
              🚪 Logout
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Header Card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden', border: '2px solid #e0b48a' }}>
                 <img src="https://ui-avatars.com/api/?name=Stitch+Ease&background=random" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#222' }}>{user ? user.name : 'Julian Reed'}</h2>
                <div style={{ color: '#999', fontSize: '0.9rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>✓</span> Elite Member since 2021
                </div>
              </div>
            </div>
            <button style={{ padding: '0.6rem 1.2rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✎ Edit Profile
            </button>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffecec', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ff6b6b' }}>📦</div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>12</div>
                <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Total Orders</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff4cc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#d4a300' }}>🚚</div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>2</div>
                <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Active Orders</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0f4eb', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#27a972' }}>📏</div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>5</div>
                <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Saved Measurements</div>
              </div>
            </div>
          </div>

          {/* Measurement Profiles */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
                📏 Measurement Profiles
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#5a0f28', fontWeight: 'bold', cursor: 'pointer' }}>View All →</span>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1, backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', backgroundColor: '#ffecec', color: '#ff6b6b', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>PRIMARY</span>
                <h4 style={{ margin: '0.8rem 0 0.3rem 0', fontSize: '1.1rem' }}>My Primary Fit</h4>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem' }}>Last updated: Oct 12, 2023</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Chest</span><span style={{ fontWeight: 'bold' }}>42"</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Waist</span><span style={{ fontWeight: 'bold' }}>34"</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Shoulder</span><span style={{ fontWeight: 'bold' }}>18.5"</span></div>
                </div>
              </div>

              <div style={{ flex: 1, backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>Wedding Guest Fit</h4>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem' }}>Last updated: Aug 05, 2023</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Chest</span><span style={{ fontWeight: 'bold' }}>41.5"</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Waist</span><span style={{ fontWeight: 'bold' }}>33.5"</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Shoulder</span><span style={{ fontWeight: 'bold' }}>18"</span></div>
                </div>
              </div>

              <div style={{ flex: 1, backgroundColor: '#fcfaf6', padding: '1.5rem', borderRadius: '12px', border: '2px dashed #e0b48a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2d3c5', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#5a0f28', fontSize: '1.5rem', marginBottom: '1rem' }}>+</div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Add New Profile</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>Create a new measurement set for a different fit style.</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
                📦 Recent Orders
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#5a0f28', fontWeight: 'bold', cursor: 'pointer' }}>Order History →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#1f2937', borderRadius: '8px' }}></div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>SE-9421</span>
                      <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', backgroundColor: '#fff4cc', color: '#d4a300', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>SHIPPED</span>
                    </div>
                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>Bespoke Navy Pinstripe Suit</h4>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>Placed on Nov 28, 2023</div>
                  </div>
                </div>
                <button style={{ padding: '0.6rem 1.2rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Track Order</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#fcfaf6', border: '1px solid #eaeaea', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>✂️</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>SE-8832</span>
                      <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', backgroundColor: '#e0f4eb', color: '#27a972', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>IN CRAFTING</span>
                    </div>
                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>Classic White Linen Shirt</h4>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>Placed on Dec 02, 2023</div>
                  </div>
                </div>
                <button style={{ padding: '0.6rem 1.2rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>View Details</button>
              </div>
            </div>
          </div>

          {/* Wishlist Highlights */}
          <div id="wishlist-section" style={{ marginTop: '1rem', marginBottom: '4rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontFamily: '"Playfair Display", serif', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
              ❤️ Wishlist Highlights
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {wishlist.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#888', gridColumn: '1 / -1', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                  No items in your wishlist yet. Explore designs to add some!
                </div>
              ) : (
                wishlist.map(design => (
                  <div key={design.id} style={{ height: '240px', borderRadius: '12px', overflow: 'hidden', position: 'relative', backgroundColor: '#333' }}>
                    <div style={{ position: 'absolute', top: '0', bottom: '0', left: '0', right: '0' }}>
                      <img src={design.sampleImage} alt={design.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} onError={(e) => { e.target.src = 'https://via.placeholder.com/250x200?text=No+Image'; }} />
                    </div>
                    <div 
                      onClick={() => handleRemoveFromWishlist(design.id)}
                      style={{ position: 'absolute', top: '1rem', right: '1rem', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#e91e63', cursor: 'pointer', zIndex: 10, fontSize: '1.2rem' }}
                      title="Remove from wishlist"
                    >
                      ❤️
                    </div>
                    <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '2rem 1.5rem 1.5rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: '#fff', zIndex: 5 }}>
                      <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.2rem' }}>{design.title}</h4>
                      <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#ddd' }}>Starting at ${design.basePrice || '299'}</p>
                      <button onClick={() => navigate('/explore')} style={{ padding: '0.5rem 1rem', backgroundColor: '#5a0f28', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>View Design</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </main>
      </div>
      
      {/* Footer */}
      <footer style={{ backgroundColor: '#f5f0e6', padding: '3rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', margin: '0 0 1.5rem 0', fontStyle: 'italic', fontSize: '2rem' }}>StitchEase</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.9rem', color: '#555', marginBottom: '2rem' }}>
          <span>Heritage</span>
          <span>Craftsmanship</span>
          <span>Book Appointment</span>
          <span>Shipping & Returns</span>
          <span>Privacy Policy</span>
          <span>Contact Us</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>© 2024 StitchEase Bespoke. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
