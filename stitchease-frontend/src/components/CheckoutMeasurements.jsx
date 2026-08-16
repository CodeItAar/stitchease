import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Search, ShoppingBag, CheckCircle, Video } from 'lucide-react';

export default function CheckoutMeasurements() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  // The state from DesignCustomization.jsx might contain selected details and price
  const totalPrice = state?.totalPrice || 0;

  const [formData, setFormData] = useState({
    chest: '',
    shoulderWidth: '',
    sleeveLength: '',
    neck: '',
    waist: '',
    hip: '',
    inseam: ''
  });

  const [profileMode, setProfileMode] = useState('new');
  const [savedProfiles, setSavedProfiles] = useState([]);

  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/measurements/user/1');
        setSavedProfiles(response.data);
      } catch (error) {
        console.error('Error fetching measurements:', error);
      }
    };
    fetchProfiles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = async () => {
    try {
      // Mocking a user ID for now since auth isn't fully integrated everywhere
      const userId = 1; 

      const payload = {
        user: { id: userId },
        bustChest: parseFloat(formData.chest),
        shoulder: parseFloat(formData.shoulderWidth),
        sleeveLength: parseFloat(formData.sleeveLength),
        neck: parseFloat(formData.neck),
        waist: parseFloat(formData.waist),
        hips: parseFloat(formData.hip),
        inseam: parseFloat(formData.inseam)
      };

      const response = await axios.post('http://localhost:8080/api/measurements', payload);
      console.log('Measurement saved:', response.data);
      
      // In a real flow, you would pass the measurement ID forward to the next step
      // navigate('/checkout-address', { state: { ...state, measurementId: response.data.id } });
      alert('Measurements saved successfully! Navigating to Address step...');
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
          alert('These exact measurements already exist in your saved profile.');
          // Navigate forward using existing profile
          // navigate('/checkout-address', { state: { ...state, measurementId: error.response.data.id } });
      } else {
          console.error('Error saving measurements:', error);
          alert('Failed to save measurements. Please try again.');
      }
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}>1</div>
            <span style={{ color: '#5a0f28', fontSize: '0.85rem', fontWeight: 'bold' }}>Measurements</span>
          </div>
          <div style={{ width: '80px', height: '1px', backgroundColor: '#ddd', marginBottom: '1.5rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#eee', color: '#888', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem' }}>2</div>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>Address</span>
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
            
            {/* Measurement Profile Toggle */}
            <div style={{ backgroundColor: '#f9f6f0', padding: '1.5rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.3rem 0', color: '#5a0f28', fontSize: '1.1rem' }}>Measurement Profile</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Select an existing profile or enter new dimensions.</p>
              </div>
              <div style={{ display: 'flex', backgroundColor: '#eaddd5', borderRadius: '20px', padding: '0.2rem' }}>
                <button 
                  onClick={() => setProfileMode('new')}
                  style={{ backgroundColor: profileMode === 'new' ? '#fff' : 'transparent', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '20px', color: profileMode === 'new' ? '#5a0f28' : '#888', fontWeight: profileMode === 'new' ? 'bold' : 'normal', fontSize: '0.85rem', cursor: 'pointer', boxShadow: profileMode === 'new' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease' }}>
                  New Entry
                </button>
                <button 
                  onClick={() => setProfileMode('saved')}
                  style={{ backgroundColor: profileMode === 'saved' ? '#fff' : 'transparent', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '20px', color: profileMode === 'saved' ? '#5a0f28' : '#888', fontWeight: profileMode === 'saved' ? 'bold' : 'normal', fontSize: '0.85rem', cursor: 'pointer', boxShadow: profileMode === 'saved' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease' }}>
                  Saved Profile
                </button>
              </div>
            </div>

            {profileMode === 'new' ? (
              <>
                {/* Upper Body section */}
                <h3 style={{ color: '#5a0f28', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px dashed #eee', paddingBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>📏</span> Upper Body
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Chest (cm)</label>
                    <input type="number" name="chest" value={formData.chest} onChange={handleChange} placeholder="e.g. 102" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Shoulder Width (cm)</label>
                    <input type="number" name="shoulderWidth" value={formData.shoulderWidth} onChange={handleChange} placeholder="e.g. 45" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Sleeve Length (cm)</label>
                    <input type="number" name="sleeveLength" value={formData.sleeveLength} onChange={handleChange} placeholder="e.g. 64" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Neck (cm)</label>
                    <input type="number" name="neck" value={formData.neck} onChange={handleChange} placeholder="e.g. 40" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                </div>

                {/* Lower Body section */}
                <h3 style={{ color: '#5a0f28', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px dashed #eee', paddingBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🧍</span> Lower Body
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Waist (cm)</label>
                    <input type="number" name="waist" value={formData.waist} onChange={handleChange} placeholder="e.g. 86" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Hip (cm)</label>
                    <input type="number" name="hip" value={formData.hip} onChange={handleChange} placeholder="e.g. 104" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#555' }}>Inseam (cm)</label>
                    <input type="number" name="inseam" value={formData.inseam} onChange={handleChange} placeholder="e.g. 81" style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', fontSize: '1rem', outline: 'none' }} />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ color: '#5a0f28', fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px dashed #eee', paddingBottom: '0.8rem' }}>
                  Saved Profiles
                </h3>
                {savedProfiles.length === 0 ? (
                  <p style={{ color: '#666' }}>No saved profiles found.</p>
                ) : (
                  savedProfiles.map((profile, idx) => (
                    <div key={profile.id} style={{ border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem', backgroundColor: '#fcfaf6' }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: '#5a0f28' }}>Profile {idx + 1}</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', color: '#555' }}>
                        <div><strong>Chest:</strong> {profile.bustChest} cm</div>
                        <div><strong>Shoulder:</strong> {profile.shoulder} cm</div>
                        <div><strong>Sleeve:</strong> {profile.sleeveLength} cm</div>
                        <div><strong>Neck:</strong> {profile.neck} cm</div>
                        <div><strong>Waist:</strong> {profile.waist} cm</div>
                        <div><strong>Hip:</strong> {profile.hips} cm</div>
                        <div><strong>Inseam:</strong> {profile.inseam} cm</div>
                      </div>
                      <button onClick={() => {
                        setFormData({
                          chest: profile.bustChest || '',
                          shoulderWidth: profile.shoulder || '',
                          sleeveLength: profile.sleeveLength || '',
                          neck: profile.neck || '',
                          waist: profile.waist || '',
                          hip: profile.hips || '',
                          inseam: profile.inseam || ''
                        });
                        setProfileMode('new');
                      }} style={{ marginTop: '1rem', backgroundColor: '#eaddd5', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', color: '#5a0f28', fontWeight: 'bold', cursor: 'pointer' }}>
                        Use this profile
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleContinue} style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Continue to Address <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Guide Card */}
            <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', backgroundImage: 'radial-gradient(#f0e8df 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#5a0f28', fontFamily: '"Playfair Display", serif', fontSize: '1.3rem' }}>Tailoring Guide</h3>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Ensure the tape measure is snug but not tight. Keep a finger between the tape and your body for ease.
              </p>
              <div style={{ backgroundColor: '#f5f2eb', height: '160px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                 {/* Placeholder for the sketch */}
                 <img src="https://via.placeholder.com/300x160?text=Tailoring+Sketch" alt="Guide Sketch" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, mixBlendMode: 'multiply' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                <span style={{ color: '#886214', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}><Video size={14} /> Watch Video Guide</span>
                <span style={{ color: '#888' }}>Step 1 of 7</span>
              </div>
            </div>

            {/* Info Cards */}
            <div style={{ backgroundColor: '#fcfaf6', border: '1px solid #f0e8df', padding: '1.2rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
               <div style={{ backgroundColor: '#fcefc7', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#a67c00', flexShrink: 0 }}>
                 <CheckCircle size={16} />
               </div>
               <div>
                 <h4 style={{ margin: '0 0 0.3rem 0', color: '#5a0f28', fontSize: '0.95rem' }}>Master Tailor Review</h4>
                 <p style={{ margin: 0, color: '#666', fontSize: '0.8rem', lineHeight: '1.4' }}>Every dimension is reviewed by our artisans for proportional harmony.</p>
               </div>
            </div>

            <div style={{ backgroundColor: '#fcfaf6', border: '1px solid #f0e8df', padding: '1.2rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
               <div style={{ backgroundColor: '#e2f2e9', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#2d7a51', flexShrink: 0 }}>
                 <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Å</span>
               </div>
               <div>
                 <h4 style={{ margin: '0 0 0.3rem 0', color: '#5a0f28', fontSize: '0.95rem' }}>Digital Pattern Draft</h4>
                 <p style={{ margin: 0, color: '#666', fontSize: '0.8rem', lineHeight: '1.4' }}>A unique 3D pattern is generated exclusively for your frame.</p>
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
