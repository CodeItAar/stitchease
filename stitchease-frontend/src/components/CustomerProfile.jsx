import React, { useContext, useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CustomerProfile() {
  const { user, logoutUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchWishlist();
      fetchOrders();
      fetchMeasurements();
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

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchMeasurements = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/measurements/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setMeasurements(data);
      }
    } catch (error) {
      console.error('Error fetching measurements:', error);
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
            <div onClick={() => document.getElementById('measurements-section').scrollIntoView({ behavior: 'smooth' })} style={{ padding: '1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderRadius: '8px' }}>
              📏 Measurement Profiles
            </div>
            <div onClick={() => document.getElementById('orders-section').scrollIntoView({ behavior: 'smooth' })} style={{ padding: '1rem', color: '#555', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderRadius: '8px' }}>
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
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{orders.length}</div>
                <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Total Orders</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff4cc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#d4a300' }}>🚚</div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'DELIVERED').length}</div>
                <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Active Orders</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0f4eb', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#27a972' }}>📏</div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{measurements.length}</div>
                <div style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Saved Measurements</div>
              </div>
            </div>
          </div>

          {/* Measurement Profiles */}
          <div id="measurements-section" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
                📏 Measurement Profiles
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#5a0f28', fontWeight: 'bold', cursor: 'pointer' }}>View All →</span>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {measurements.map((measurement, idx) => (
                <div key={idx} style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                  {idx === 0 && <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', backgroundColor: '#ffecec', color: '#ff6b6b', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>PRIMARY</span>}
                  <h4 style={{ margin: idx === 0 ? '0.8rem 0 0.3rem 0' : '0 0 0.3rem 0', fontSize: '1.1rem' }}>Profile {idx + 1}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem' }}>Added custom fit</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Chest</span><span style={{ fontWeight: 'bold' }}>{measurement.bustChest ? `${measurement.bustChest}"` : '-'}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Waist</span><span style={{ fontWeight: 'bold' }}>{measurement.waist ? `${measurement.waist}"` : '-'}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#555' }}>Shoulder</span><span style={{ fontWeight: 'bold' }}>{measurement.shoulder ? `${measurement.shoulder}"` : '-'}</span></div>
                  </div>
                </div>
              ))}

              <div style={{ flex: '1 1 300px', backgroundColor: '#fcfaf6', padding: '1.5rem', borderRadius: '12px', border: '2px dashed #e0b48a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', minHeight: '200px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2d3c5', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#5a0f28', fontSize: '1.5rem', marginBottom: '1rem' }}>+</div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Add New Profile</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>Create a new measurement set for a different fit style.</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div id="orders-section" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem' }}>
                📦 Recent Orders
              </h3>
              <span 
                onClick={() => setIsOrderHistoryModalOpen(true)}
                style={{ fontSize: '0.8rem', color: '#5a0f28', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Order History →
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#888', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                  No recent orders.
                </div>
              ) : (
                [...orders].sort((a, b) => b.id - a.id).slice(0, 5).map((order, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', backgroundColor: '#1f2937', borderRadius: '8px', overflow: 'hidden' }}>
                        {order.design && order.design.sampleImage ? (
                          <img src={order.design.sampleImage} alt="Design" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>✂️</div>
                        )}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>SE-{order.id}</span>
                          <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', backgroundColor: order.status === 'COMPLETED' ? '#e0f4eb' : '#fff4cc', color: order.status === 'COMPLETED' ? '#27a972' : '#d4a300', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>{order.status}</span>
                        </div>
                        <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>
                          {order.design ? order.design.title : (order.customRequest ? 'Custom Request' : 'Order')}
                        </h4>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <button onClick={() => navigate(`/order-status/${order.id}`)} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>View Details</button>
                  </div>
                ))
              )}
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

      {/* Order History Modal */}
      {isOrderHistoryModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '8px', padding: '2rem',
            width: '800px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: '#5a0f28', fontFamily: '"Playfair Display", serif' }}>
                Order History
              </h2>
              <button onClick={() => setIsOrderHistoryModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                  No orders found.
                </div>
              ) : (
                [...orders].sort((a, b) => b.id - a.id).map((order, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', backgroundColor: '#1f2937', borderRadius: '8px', overflow: 'hidden' }}>
                        {order.design && order.design.sampleImage ? (
                          <img src={order.design.sampleImage} alt="Design" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>✂️</div>
                        )}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>SE-{order.id}</span>
                          <span style={{ fontSize: '0.6rem', padding: '0.2rem 0.5rem', backgroundColor: order.status === 'COMPLETED' ? '#e0f4eb' : '#fff4cc', color: order.status === 'COMPLETED' ? '#27a972' : '#d4a300', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>{order.status}</span>
                        </div>
                        <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem' }}>
                          {order.design ? order.design.title : (order.customRequest ? 'Custom Request' : 'Order')}
                        </h4>
                        <div style={{ fontSize: '0.85rem', color: '#888' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <button onClick={() => navigate(`/order-status/${order.id}`)} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>View Details</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      
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
