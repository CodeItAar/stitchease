import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Lock, Edit3 } from 'lucide-react';

export default function CheckoutReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};

  const [loading, setLoading] = useState(false);
  const [design, setDesign] = useState(null);
  const [measurement, setMeasurement] = useState(null);
  const [address, setAddress] = useState(null);

  // Fallback to state if available
  const deliveryMethod = state?.deliveryMethod || 'home';
  const addressId = state?.addressId || 1;
  const measurementId = state?.measurementId || 1;
  const totalPrice = state?.totalPrice || 14449;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [designRes, measurementRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/designs/${id}`),
          axios.get(`http://localhost:8080/api/measurements/${measurementId}`)
        ]);
        setDesign(designRes.data);
        setMeasurement(measurementRes.data);

        if (deliveryMethod === 'home' && addressId) {
          const addressRes = await axios.get(`http://localhost:8080/api/addresses/${addressId}`);
          setAddress(addressRes.data);
        }
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };
    fetchData();
  }, [id, measurementId, addressId, deliveryMethod]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const payload = {
        totalPrice: totalPrice,
        status: 'PLACED',
        userId: 1, // Mocked user ID
        measurementId: state?.measurementId || 1, // Mocked or retrieved measurement ID
        deliveryMethod: deliveryMethod,
        shippingAddressId: deliveryMethod === 'home' ? addressId : null
      };

      await axios.post('http://localhost:8080/api/orders/create', payload);
      alert('Order placed successfully!');
      // navigate(`/checkout-confirm/${id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', color: '#333', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', backgroundColor: '#fdfbf7', borderBottom: '1px solid #f0e8df' }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#5a0f28', fontFamily: '"Playfair Display", serif', margin: 0, fontSize: '1.8rem', cursor: 'pointer' }}>
          StitchEase
        </h1>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555' }}>
          <span style={{ cursor: 'pointer' }}>Designs</span>
          <span style={{ cursor: 'pointer' }}>How it Works</span>
          <span style={{ cursor: 'pointer' }}>Track Order</span>
          <span style={{ cursor: 'pointer' }}>About Us</span>
        </nav>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: '#555' }}>
          <span style={{ cursor: 'pointer', fontSize: '0.9rem' }}>Login</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1rem 5rem 1rem' }}>
        
        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4rem', gap: '1rem' }}>
          <div onClick={() => navigate(`/checkout-measurements/${id}`, { state })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}><CheckCircle size={16} /></div>
            <span style={{ color: '#000', fontSize: '0.85rem', fontWeight: '500' }}>Measurements</span>
          </div>
          <div style={{ width: '80px', height: '2px', backgroundColor: '#5a0f28', marginBottom: '1.5rem' }} />
          <div onClick={() => navigate(`/checkout-delivery/${id}`, { state })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}><CheckCircle size={16} /></div>
            <span style={{ color: '#000', fontSize: '0.85rem', fontWeight: '500' }}>Address</span>
          </div>
          <div style={{ width: '80px', height: '2px', backgroundColor: '#5a0f28', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #5a0f28', backgroundColor: '#fff', color: '#5a0f28', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>3</div>
            <span style={{ color: '#5a0f28', fontSize: '0.85rem', fontWeight: 'bold' }}>Review</span>
          </div>
          <div style={{ width: '80px', height: '1px', backgroundColor: '#ddd', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#eee', color: '#888', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}>4</div>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>Confirm</span>
          </div>
        </div>

        <h2 style={{ color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', marginBottom: '2rem', fontWeight: '600' }}>
          Order Review
        </h2>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          
          {/* Left Column */}
          <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Product Card */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {design ? (
                <>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <img 
                      src={
                        state?.selectedColor 
                          ? (design.colorVariants?.find(v => v.colorName === state.selectedColor)?.imageUrl || design.sampleImage)
                          : design.sampleImage
                      }
                      alt={design.title} 
                      style={{ width: '150px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: '#1a1a1a' }}>{design.title}</h3>
                      <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>Category: {design.category}</p>
                      
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        {state?.selectedFabric && <span style={{ backgroundColor: '#fcfaf6', color: '#5a0f28', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500', border: '1px solid #f0e8df' }}>Fabric: {state.selectedFabric.name || state.selectedFabric}</span>}
                        {state?.selectedColor && <span style={{ backgroundColor: '#fcfaf6', color: '#5a0f28', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500', border: '1px solid #f0e8df' }}>Color: {state.selectedColor}</span>}
                        {state?.selectedDetails && state.selectedDetails.map((detail, idx) => (
                          <span key={idx} style={{ backgroundColor: '#fcfaf6', color: '#5a0f28', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500', border: '1px solid #f0e8df' }}>{detail}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1a1a1a' }}>Measurement Profile</h4>
                    {measurement ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', color: '#444' }}>
                        <div>Profile: <span style={{ fontWeight: '500' }}>Custom Fit</span></div>
                        {measurement.bustChest && <div>Bust/Chest: <span style={{ fontWeight: '500' }}>{measurement.bustChest}"</span></div>}
                        {measurement.waist && <div>Waist: <span style={{ fontWeight: '500' }}>{measurement.waist}"</span></div>}
                        {measurement.hips && <div>Hips: <span style={{ fontWeight: '500' }}>{measurement.hips}"</span></div>}
                        {measurement.length && <div>Length: <span style={{ fontWeight: '500' }}>{measurement.length}"</span></div>}
                      </div>
                    ) : (
                      <p>Loading measurements...</p>
                    )}
                  </div>
                </>
              ) : (
                <p>Loading design...</p>
              )}
            </div>

            {/* Delivery Details Card */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: '#1a1a1a' }}>Delivery Details</h3>
                <button onClick={() => navigate(`/checkout-delivery/${id}`)} style={{ color: '#886214', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  Edit
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.85rem', fontWeight: '500' }}>Shipping Address</p>
                  {deliveryMethod === 'home' ? (
                    address ? (
                      <p style={{ margin: 0, color: '#333', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {address.fullName}<br />
                        {address.streetAddress}<br />
                        {address.city} {address.postalCode}
                      </p>
                    ) : (
                      <p>Loading address...</p>
                    )
                  ) : (
                    <p style={{ margin: 0, color: '#333', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      StitchEase Studio Pickup<br />
                      123 Artisan Row<br />
                      New York, NY 10001
                    </p>
                  )}
                </div>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.85rem', fontWeight: '500' }}>Estimated Delivery</p>
                  <p style={{ margin: 0, color: '#1a1a1a', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🚚 Oct 24 - Oct 28
                  </p>
                </div>
              </div>
            </div>

            {/* Boutique Care Promise */}
            <div style={{ backgroundColor: '#f9f6f0', borderRadius: '12px', padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginTop: '1rem' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <Lock size={20} color="#5a0f28" />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#1a1a1a' }}>Boutique Care Promise</h4>
                <p style={{ margin: 0, color: '#555', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  Every StitchEase garment is meticulously hand-stitched and undergoes a rigorous quality check. Your custom lehenga will be delivered in our signature breathable garment bag to ensure it arrives in pristine condition.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div style={{ flex: '1', backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: '#1a1a1a' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.9rem' }}>
                <span>Base Garment</span>
                <span>₹{design ? design.basePrice.toLocaleString() : '...'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.9rem' }}>
                <span>Add-ons</span>
                <span>₹{design ? (totalPrice - design.basePrice - (deliveryMethod === 'home' ? 150 : 0)).toLocaleString() : '...'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.9rem' }}>
                <span>Delivery</span>
                <span>{deliveryMethod === 'home' ? '₹150' : 'Free (Pickup)'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '1.1rem' }}>Total</span>
              <span style={{ fontWeight: 'bold', color: '#5a0f28', fontSize: '1.4rem' }}>₹{totalPrice.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                placeholder="Promo Code" 
                style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fcfaf6', outline: 'none', fontSize: '0.9rem' }} 
              />
              <button style={{ backgroundColor: '#fff', color: '#5a0f28', border: '1px solid #5a0f28', padding: '0.8rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                Apply
              </button>
            </div>

            <button 
              onClick={handlePlaceOrder} 
              disabled={loading}
              style={{ width: '100%', backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1.2rem', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Processing...' : 'Place Order →'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.75rem' }}>
              <Lock size={12} />
              <span>Secure encrypted checkout</span>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f9f6f0', padding: '3rem 0', marginTop: '3rem', borderTop: '1px solid #f0e8df' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.8rem', color: '#5a0f28', margin: 0 }}>StitchEase</h2>
          
          <div style={{ display: 'flex', gap: '4rem', fontSize: '0.85rem', color: '#555' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <span style={{ cursor: 'pointer' }}>Contact Us</span>
              <span style={{ cursor: 'pointer' }}>Our Heritage</span>
              <span style={{ cursor: 'pointer' }}>Sustainability</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e0d8cf', paddingTop: '1.5rem', color: '#888', fontSize: '0.8rem' }}>
            © 2024 StitchEase Bespoke. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
