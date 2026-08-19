import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Check, Edit, Lock } from 'lucide-react';

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
        measurementId: state?.measurementId || 1, 
        deliveryMethod: deliveryMethod,
        shippingAddressId: deliveryMethod === 'home' ? addressId : null,
        designId: id
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
        <h1 onClick={() => navigate('/')} style={{ color: '#5a0f28', fontFamily: '"Playfair Display", serif', margin: 0, fontSize: '1.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
          StitchEase
        </h1>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555', fontWeight: '500' }}>
          <span style={{ cursor: 'pointer' }}>Designs</span>
          <span style={{ cursor: 'pointer' }}>How it Works</span>
          <span style={{ cursor: 'pointer' }}>Track Order</span>
          <span style={{ cursor: 'pointer' }}>About Us</span>
        </nav>
        <button style={{ border: '1px solid #e0d8cf', background: 'transparent', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', color: '#5a0f28', fontWeight: '500' }}>
          Login
        </button>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1rem 5rem 1rem' }}>
        
        {/* Stepper */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '15px', left: '30%', right: '30%', height: '2px', backgroundColor: '#5a0f28', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '15px', left: '50%', right: '30%', height: '2px', backgroundColor: '#e0d8cf', zIndex: 0 }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%', zIndex: 1 }}>
            <div onClick={() => navigate(`/checkout-measurements/${id}`, { state })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#fdfbf7', padding: '0 10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}><Check size={16} /></div>
              <span style={{ color: '#555', fontSize: '0.8rem', fontWeight: 'bold' }}>Measurements</span>
            </div>
            
            <div onClick={() => navigate(`/checkout-delivery/${id}`, { state })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#fdfbf7', padding: '0 10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}><Check size={16} /></div>
              <span style={{ color: '#555', fontSize: '0.8rem', fontWeight: 'bold' }}>Address</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: '#fdfbf7', padding: '0 10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #5a0f28', backgroundColor: '#fff', color: '#5a0f28', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>3</div>
              <span style={{ color: '#5a0f28', fontSize: '0.8rem', fontWeight: 'bold' }}>Review</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: '#fdfbf7', padding: '0 10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #e0d8cf', backgroundColor: '#fff', color: '#aaa', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>4</div>
              <span style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: '500' }}>Confirm</span>
            </div>
          </div>
        </div>

        <h2 style={{ color: '#1a1a1a', fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', marginBottom: '2rem', fontWeight: '600' }}>
          Review Your Order
        </h2>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          
          {/* Left Column */}
          <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Product Card */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                  <img 
                    src={design ? design.sampleImage : 'https://via.placeholder.com/200x250'}
                    alt="Lehenga" 
                    style={{ width: '200px', height: '250px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                    <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.3rem', color: '#1a1a1a', fontWeight: '600' }}>
                      {design ? design.title : 'Zardosi Velvet Lehenga'}
                    </h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#888', fontSize: '0.9rem' }}>Order #SE-8924-B</p>
                    
                    <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                      {state?.selectedFabric && (
                        <span style={{ backgroundColor: '#fcfaf7', border: '1px solid #f0e8df', color: '#333', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '500' }}>
                           <div style={{width: '12px', height: '12px', background: '#8B0000', borderRadius: '50%', border: '1px solid #ccc'}}></div> 
                           {state.selectedFabric.name}
                        </span>
                      )}
                      {state?.selectedDetails?.map(detail => (
                        <span key={detail.id} style={{ backgroundColor: '#fcfaf7', border: '1px solid #f0e8df', color: '#333', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '500' }}>
                           <div style={{width: '12px', height: '12px', background: '#d4af37', borderRadius: '50%', border: '1px solid #ccc'}}></div> 
                           {detail.name}
                        </span>
                      ))}
                      {!state?.selectedFabric && !state?.selectedDetails && (
                        <>
                          <span style={{ backgroundColor: '#fcfaf7', border: '1px solid #f0e8df', color: '#333', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '500' }}>
                             <div style={{width: '12px', height: '12px', background: '#8B0000', borderRadius: '50%', border: '1px solid #ccc'}}></div> 
                             Premium Velvet
                          </span>
                          <span style={{ backgroundColor: '#fcfaf7', border: '1px solid #f0e8df', color: '#333', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '500' }}>
                             <div style={{width: '12px', height: '12px', background: '#d4af37', borderRadius: '50%', border: '1px solid #ccc'}}></div> 
                             Gold Telsels
                          </span>
                        </>
                      )}
                    </div>
                    
                    <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ background: '#5a0f28', color: '#fff', padding: '2px 6px', borderRadius: '2px', fontSize: '0.7rem', fontWeight: 'bold' }}>cm</span>
                        <h4 style={{ margin: 0, fontSize: '1rem', color: '#1a1a1a' }}>{address?.fullName ? `${address.fullName.split(' ')[0]}'s Custom Fit` : 'Customer Custom Fit'}</h4>
                        <button style={{ position: 'absolute', right: 0, color: '#5a0f28', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>Edit</button>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <div style={{ background: '#fcfaf7', padding: '0.8rem', borderRadius: '6px', textAlign: 'center' }}>
                          <div style={{ color: '#888', fontSize: '0.7rem', marginBottom: '0.3rem' }}>Waist</div>
                          <div style={{ color: '#1a1a1a', fontWeight: 'bold', fontSize: '1rem' }}>{measurement?.waist ? `${measurement.waist}"` : '28"'}</div>
                        </div>
                        <div style={{ background: '#fcfaf7', padding: '0.8rem', borderRadius: '6px', textAlign: 'center' }}>
                          <div style={{ color: '#888', fontSize: '0.7rem', marginBottom: '0.3rem' }}>Bust</div>
                          <div style={{ color: '#1a1a1a', fontWeight: 'bold', fontSize: '1rem' }}>{measurement?.bustChest ? `${measurement.bustChest}"` : '34"'}</div>
                        </div>
                        <div style={{ background: '#fcfaf7', padding: '0.8rem', borderRadius: '6px', textAlign: 'center' }}>
                          <div style={{ color: '#888', fontSize: '0.7rem', marginBottom: '0.3rem' }}>Length</div>
                          <div style={{ color: '#1a1a1a', fontWeight: 'bold', fontSize: '1rem' }}>{measurement?.length ? `${measurement.length}"` : '42"'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            {/* Delivery Details Card */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                  <div style={{width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Lock size={16} color="#5a0f28" />
                  </div> 
                  Delivery Details
                </h3>
                <button onClick={() => navigate(`/checkout-delivery/${id}`)} style={{ color: '#5a0f28', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>
                  Edit
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.8rem 0', color: '#888', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>SHIPPING ADDRESS</p>
                  <p style={{ margin: 0, color: '#333', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {address ? (
                      <>
                        {address.fullName}<br />
                        {address.streetAddress}<br />
                        {address.city}, {address.stateProvince} {address.postalCode}<br />
                        {address.phoneNumber}
                      </>
                    ) : (
                      <>
                        Priya Sharma<br />
                        124 Heritage Boutique Lane<br />
                        Floor 3, Apt 3B<br />
                        Mumbai, MH 400050<br />
                        India
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <div style={{ background: '#fcfaf7', padding: '1.5rem', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 0.8rem 0', color: '#888', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>ESTIMATED DELIVERY</p>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#5a0f28', fontSize: '1.1rem', fontWeight: 'bold' }}>
                      Oct 24 - Oct 28
                    </p>
                    <p style={{ margin: 0, color: '#555', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={12} color="#888" /> Premium Bespoke Handling
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: '#1a1a1a', fontWeight: '600' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.9rem' }}>
                  <span>Base Garment</span>
                  <span>₹{design ? design.basePrice.toLocaleString() : '12,000'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.9rem' }}>
                  <span>Add-ons (Premium Velvet, Telsels)</span>
                  <span>₹{design ? (totalPrice - design.basePrice - (deliveryMethod === 'home' ? 499 : 0)).toLocaleString() : '1,950'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.9rem' }}>
                  <span>{deliveryMethod === 'home' ? 'Premium Delivery' : 'Store Pickup'}</span>
                  <span>{deliveryMethod === 'home' ? '₹499' : 'Free'}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed #e0d8cf', margin: '1.5rem 0' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '1.1rem' }}>Total</span>
                <span style={{ fontWeight: 'bold', color: '#5a0f28', fontSize: '1.3rem' }}>₹{totalPrice.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '4px', border: '1px solid #e0d8cf', backgroundColor: '#fcfaf7', outline: 'none', fontSize: '0.9rem' }} 
                />
                <button style={{ backgroundColor: '#fcfaf7', color: '#555', border: '1px solid #e0d8cf', padding: '0.8rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                  Apply
                </button>
              </div>

              <button 
                onClick={handlePlaceOrder} 
                disabled={loading}
                style={{ width: '100%', backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1rem', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', opacity: loading ? 0.9 : 1 }}
              >
                {loading ? 'Processing...' : 'Place Order →'}
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.75rem' }}>
                <Lock size={12} />
                <span>Secure encrypted checkout</span>
              </div>
            </div>

            {/* Boutique Care Promise */}
            <div style={{ backgroundColor: '#fcfaf7', border: '1px solid #f0e8df', borderRadius: '8px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '50%', padding: '0.6rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, border: '1px solid #f0e8df' }}>
                 <div style={{ width: '12px', height: '12px', border: '2px solid #d4af37', transform: 'rotate(45deg)' }}></div>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 'bold' }}>Boutique Care Promise</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.75rem', lineHeight: '1.5' }}>
                  Every garment is meticulously crafted and inspected. We offer one complimentary alteration session within 14 days of delivery.
                </p>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#fcfaf7', padding: '3rem 0', borderTop: '1px solid #f0e8df', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#5a0f28', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>StitchEase</h2>
            <div style={{ color: '#888', fontSize: '0.85rem' }}>
              © 2024 StitchEase . All rights reserved.
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Contact Us</span>
            <span style={{ cursor: 'pointer' }}>Our Heritage</span>
            <span style={{ cursor: 'pointer' }}>Sustainability</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
