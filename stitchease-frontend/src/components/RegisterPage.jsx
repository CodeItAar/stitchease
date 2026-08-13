import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { register } from '../services/authService';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('CUSTOMER'); // 'CUSTOMER' or 'TAILOR'
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    portfolioUrl: ''
  });
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');
    
    if (role === 'TAILOR') {
      setStep(2);
    } else {
      submitRegistration();
    }
  };

  const submitRegistration = async () => {
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        role: role,
        specialization: formData.specialization,
        portfolioUrl: formData.portfolioUrl
      };
      
      const newUser = await register(userData);
      loginUser(newUser); 
      
      if (newUser.role === 'TAILOR') {
        navigate('/dashboard');
      } else {
        navigate('/explore');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to register: Server error');
        }
      } else {
        setError(err.message || 'Failed to connect to the server');
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', backgroundColor: '#fdfbf7' }}>
      
      {/* Left side Image/Brand */}
      <div style={{ flex: 1, backgroundColor: '#e5e3de', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
         <div style={{ padding: '2rem 3rem', zIndex: 2 }}>
            <h1 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', margin: 0, fontSize: '2.5rem', fontStyle: 'italic' }}>StitchEase</h1>
         </div>
         {/* Background pattern or image placeholder */}
         <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '120%', height: '120%', backgroundImage: 'url(https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8, zIndex: 1 }}></div>
      </div>

      {/* Right side Form */}
      <div style={{ flex: 1.2, padding: '4rem 6rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3rem', color: '#5a0f28', margin: '0 0 0.5rem 0', lineHeight: 1.2 }}>
          {step === 1 ? 'Join the StitchEase\nHeritage' : 'Artisan Details'}
        </h2>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '3rem' }}>
          {step === 1 ? 'Experience the art of bespoke ethnic tailoring.' : 'Step 2 of 2: Professional Details'}
        </p>

        {/* Stepper */}
        {role === 'TAILOR' && (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem', maxWidth: '400px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#5a0f28', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
              <span style={{ fontSize: '0.8rem', color: '#5a0f28', fontWeight: '600' }}>Account</span>
           </div>
           <div style={{ flex: 1, height: '1px', backgroundColor: '#e0dcd5', margin: '0 1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '50%', height: '100%', backgroundColor: step === 2 ? '#5a0f28' : 'transparent', transition: '0.3s' }}></div>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: step === 2 ? '#5a0f28' : '#f0ece3', color: step === 2 ? '#fff' : '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
              <span style={{ fontSize: '0.8rem', color: step === 2 ? '#5a0f28' : '#888', fontWeight: step === 2 ? '600' : 'normal' }}>Details</span>
           </div>
        </div>
        )}

        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        {step === 1 ? (
        <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', color: '#333' }}>I am registering as a:</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              
              <div 
                onClick={() => setRole('CUSTOMER')}
                style={{ flex: 1, border: role === 'CUSTOMER' ? '2px solid #5a0f28' : '1px solid #e0dcd5', borderRadius: '8px', padding: '1rem', cursor: 'pointer', backgroundColor: role === 'CUSTOMER' ? '#fff9fa' : '#fff', position: 'relative' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span role="img" aria-label="user">👤</span> Customer
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>For custom tailoring</div>
                {role === 'CUSTOMER' && <div style={{ position: 'absolute', right: '1rem', top: '1.5rem', color: '#5a0f28' }}>✓</div>}
              </div>

              <div 
                onClick={() => setRole('TAILOR')}
                style={{ flex: 1, border: role === 'TAILOR' ? '2px solid #5a0f28' : '1px solid #e0dcd5', borderRadius: '8px', padding: '1rem', cursor: 'pointer', backgroundColor: role === 'TAILOR' ? '#fff9fa' : '#fff', position: 'relative' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span role="img" aria-label="tailor">✂️</span> Tailor/Atelier
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>To offer services</div>
                {role === 'TAILOR' && <div style={{ position: 'absolute', right: '1rem', top: '1.5rem', color: '#5a0f28' }}>✓</div>}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#333', fontSize: '0.9rem' }}>Full Name</label>
              <input type="text" name="name" placeholder="Aisha Patel" value={formData.name} onChange={handleChange} required style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#333', fontSize: '0.9rem' }}>Phone Number</label>
              <input type="tel" name="phoneNumber" placeholder="+91 98765 43210" value={formData.phoneNumber} onChange={handleChange} required style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: '#333', fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" name="email" placeholder="aisha@example.com" value={formData.email} onChange={handleChange} required style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }} />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#333', fontSize: '0.9rem' }}>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '500', color: '#333', fontSize: '0.9rem' }}>Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }} />
            </div>
          </div>

          <button type="submit" style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {role === 'TAILOR' ? 'Continue to Next Step' : 'Register Account'} <span>→</span>
          </button>
        </form>
        ) : (
        <form onSubmit={(e) => { e.preventDefault(); submitRegistration(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: '#333', fontSize: '0.9rem' }}>Artisan Specialization</label>
            <select name="specialization" value={formData.specialization} onChange={handleChange} required style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', backgroundColor: '#fff' }}>
                <option value="">Select Specialization</option>
                <option value="Zardozi Embroidery">Zardozi Embroidery</option>
                <option value="Zardozi">Zardozi</option>
                <option value="Chikankari">Chikankari</option>
                <option value="Kantha">Kantha</option>
                <option value="Bridal/Custom">Bridal/Custom</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: '#333', fontSize: '0.9rem' }}>Portfolio/Work Samples (URL)</label>
            <input type="url" name="portfolioUrl" placeholder="https://yourportfolio.com" value={formData.portfolioUrl} onChange={handleChange} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="button" onClick={() => setStep(1)} style={{ backgroundColor: '#fff', color: '#5a0f28', border: '1px solid #5a0f28', padding: '1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '1rem', flex: 1 }}>
                Back
              </button>
              <button type="submit" style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '1rem', flex: 2 }}>
                Complete Registration <span>✓</span>
              </button>
          </div>
        </form>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>Already have an account? <Link to="/login" style={{ color: '#5a0f28', fontWeight: 'bold', textDecoration: 'none' }}>Log in</Link></p>
        </div>

      </div>
    </div>
  );
}
