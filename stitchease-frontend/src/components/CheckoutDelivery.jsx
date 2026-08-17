import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Search, ShoppingBag, Truck, Store, MapPin, CheckCircle, Package } from 'lucide-react';

export default function CheckoutDelivery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const totalPrice = state?.totalPrice || 14500;
  
  const [deliveryMethod, setDeliveryMethod] = useState('home'); // 'home' or 'pickup'
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    saveAddress: false
  });

  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userId = 1; // Mocking logged-in user ID
        const response = await axios.get(`http://localhost:8080/api/addresses/user/${userId}`);
        setSavedAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleContinue = async () => {
    try {
      const userId = 1;
      let addressId = null;

      if (deliveryMethod === 'home' && formData.saveAddress) {
        const payload = {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          streetAddress: formData.streetAddress,
          city: formData.city,
          stateProvince: formData.stateProvince,
          postalCode: formData.postalCode
        };
        const response = await axios.post(`http://localhost:8080/api/addresses/user/${userId}`, payload);
        addressId = response.data.id;
      }
      
      // alert('Delivery details saved! Navigating to Review step...');
      navigate(`/checkout-review/${id}`, { state: { ...state, deliveryMethod, addressId, formData } });
      
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to process address. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', color: '#333', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3rem', backgroundColor: '#fdfbf7', borderBottom: '1px solid #eee' }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#5a0f28', fontFamily: '"Playfair Display", serif', margin: 0, fontSize: '2rem', cursor: 'pointer' }}>
          StitchEase
        </h1>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555' }}>
          <span style={{ cursor: 'pointer' }}>Collections</span>
          <span style={{ cursor: 'pointer', borderBottom: '2px solid #5a0f28', paddingBottom: '0.2rem', color: '#5a0f28', fontWeight: '500' }}>Custom</span>
          <span style={{ cursor: 'pointer' }}>Heritage</span>
          <span style={{ cursor: 'pointer' }}>Workroom</span>
        </nav>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: '#555' }}>
          <Search size={20} style={{ cursor: 'pointer' }} />
          <span style={{ cursor: 'pointer', fontSize: '0.9rem' }}>Shopping Bag</span>
          <button style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
            Book Appointment
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1rem 5rem 1rem' }}>
        
        <h2 style={{ textAlign: 'center', color: '#5a0f28', fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', marginBottom: '3rem', fontWeight: 'normal' }}>
          Dress Checkout
        </h2>

        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4rem', gap: '1rem' }}>
          <div onClick={() => navigate(`/checkout-measurements/${id}`, { state })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}><CheckCircle size={16} /></div>
            <span style={{ color: '#5a0f28', fontSize: '0.85rem', fontWeight: 'bold' }}>Measurements</span>
          </div>
          <div style={{ width: '80px', height: '2px', backgroundColor: '#5a0f28', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}>2</div>
            <span style={{ color: '#5a0f28', fontSize: '0.85rem', fontWeight: 'bold' }}>Address</span>
          </div>
          <div style={{ width: '80px', height: '1px', backgroundColor: '#ddd', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#eee', color: '#888', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}>3</div>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>Review</span>
          </div>
          <div style={{ width: '80px', height: '1px', backgroundColor: '#ddd', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#eee', color: '#888', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}>4</div>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>Confirm</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          
          {/* Left Form Area */}
          <div style={{ flex: '2', backgroundColor: '#fff', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            
            <h3 style={{ color: '#5a0f28', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Delivery Method</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>How would you like to receive your custom creation?</p>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
              <div 
                onClick={() => setDeliveryMethod('home')}
                style={{ flex: 1, border: deliveryMethod === 'home' ? '2px solid #5a0f28' : '1px solid #eee', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', backgroundColor: deliveryMethod === 'home' ? '#fcfaf6' : '#fff', transition: 'all 0.3s ease' }}
              >
                <Truck size={32} color={deliveryMethod === 'home' ? '#5a0f28' : '#888'} style={{ marginBottom: '1rem' }} />
                <h4 style={{ margin: '0 0 0.5rem 0', color: deliveryMethod === 'home' ? '#5a0f28' : '#555' }}>Home Delivery</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>Securely packaged and delivered to your door.</p>
              </div>

              <div 
                onClick={() => setDeliveryMethod('pickup')}
                style={{ flex: 1, border: deliveryMethod === 'pickup' ? '2px solid #5a0f28' : '1px solid #eee', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', backgroundColor: deliveryMethod === 'pickup' ? '#fcfaf6' : '#fff', transition: 'all 0.3s ease' }}
              >
                <Store size={32} color={deliveryMethod === 'pickup' ? '#5a0f28' : '#888'} style={{ marginBottom: '1rem' }} />
                <h4 style={{ margin: '0 0 0.5rem 0', color: deliveryMethod === 'pickup' ? '#5a0f28' : '#555' }}>Store Pickup</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', textAlign: 'center' }}>Pick up in-person and request final fittings.</p>
              </div>
            </div>

            {deliveryMethod === 'home' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px dashed #eee', paddingBottom: '0.8rem' }}>
                  <h3 style={{ color: '#5a0f28', fontSize: '1.2rem', margin: 0 }}>Shipping Address</h3>
                  
                  {savedAddresses.length > 0 && (
                    <select 
                      onChange={(e) => {
                        const addr = savedAddresses.find(a => a.id.toString() === e.target.value);
                        if (addr) {
                          setFormData({
                            fullName: addr.fullName || '',
                            phoneNumber: addr.phoneNumber || '',
                            streetAddress: addr.streetAddress || '',
                            city: addr.city || '',
                            stateProvince: addr.stateProvince || '',
                            postalCode: addr.postalCode || '',
                            saveAddress: false
                          });
                        }
                      }}
                      style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', outline: 'none', fontSize: '0.85rem' }}
                    >
                      <option value="">Use a saved address...</option>
                      {savedAddresses.map(a => (
                        <option key={a.id} value={a.id}>{a.streetAddress}, {a.city}</option>
                      ))}
                    </select>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Phone Number</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Street Address</label>
                  <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>State / Province</label>
                    <input type="text" name="stateProvince" value={formData.stateProvince} onChange={handleChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Postal / Zip Code</label>
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} style={{ width: '50%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
                  <input type="checkbox" id="saveAddress" name="saveAddress" checked={formData.saveAddress} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#5a0f28', cursor: 'pointer' }} />
                  <label htmlFor="saveAddress" style={{ fontSize: '0.9rem', color: '#555', cursor: 'pointer' }}>Save this address for future orders</label>
                </div>
              </>
            )}

            {deliveryMethod === 'pickup' && (
              <div style={{ backgroundColor: '#f9f6f0', padding: '1.5rem', borderRadius: '8px', marginBottom: '3rem', border: '1px solid #f0e8df' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#5a0f28', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> StitchEase Studio</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  123 Artisan Row<br/>
                  Fashion District<br/>
                  New York, NY 10001
                </p>
                <p style={{ margin: '1rem 0 0 0', color: '#886214', fontSize: '0.85rem', fontWeight: 'bold' }}>Open Mon-Sat: 10AM - 7PM</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', color: '#888', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                ← Back to Measurements
              </button>
              <button onClick={handleContinue} style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Continue to Review <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar - Order Context */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#5a0f28', fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', borderBottom: '1px solid #eee', paddingBottom: '0.8rem' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Package size={20} color="#886214" />
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#333', fontWeight: 'bold' }}>Custom Lehenga</p>
                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#888' }}>Qty: 1</p>
                  </div>
                </div>
                <span style={{ fontWeight: 'bold', color: '#5a0f28', fontSize: '0.95rem' }}>₹{totalPrice.toLocaleString()}</span>
              </div>
              
              <div style={{ backgroundColor: '#fcfaf6', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #f0e8df' }}>
                 <p style={{ margin: 0, fontSize: '0.85rem', color: '#555', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} color="#2d7a51" />
                    Measurements Verified
                 </p>
              </div>

              <div style={{ backgroundColor: '#f9f6f0', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}><strong>Estimated Delivery:</strong><br/> 14-21 Business Days</p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1b2a22', color: '#fff', padding: '3rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', color: '#f5e4bc', margin: '0 0 1rem 0' }}>StitchEase</h2>
            <p style={{ color: '#a0b0a6', fontSize: '0.85rem' }}>© 2024 StitchEase. All rights reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: '#f5e4bc', fontWeight: '500' }}>
            <span style={{ cursor: 'pointer' }}>Our Story</span>
            <span style={{ cursor: 'pointer' }}>Craftsmanship</span>
            <span style={{ cursor: 'pointer', borderBottom: '1px solid #f5e4bc' }}>Measurement Guide</span>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
