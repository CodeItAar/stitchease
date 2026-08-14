import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login, register } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      loginUser(user);
      if (user.role === 'TAILOR') {
        navigate('/admin/designs');
      } else {
        navigate('/explore');
      }
    } catch (err) {
      // If login fails, try to register the user automatically to save them in DB as requested
      try {
        const role = email.toLowerCase().includes('tailor') ? 'TAILOR' : 'CUSTOMER';
        const newUser = await register({ name: email.split('@')[0], email, password, role });
        loginUser(newUser);
        if (newUser.role === 'TAILOR') {
          navigate('/admin/designs');
        } else {
          navigate('/explore');
        }
      } catch (regErr) {
        setError('Failed to login or register');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdfbf7', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '450px', borderTop: '6px solid #5a0f28' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', margin: 0, fontSize: '2.5rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span style={{ fontSize: '2rem' }}>✂️</span> StitchEase
          </h1>
          <p style={{ color: '#777', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: '600' }}>
            Bespoke Atelier Portal
          </p>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: '#333' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: '#333' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
              />
              <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}>👁️</span>
            </div>
          </div>

          <button type="submit" style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1rem' }}>
            Log In ➔
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '1.5rem' }}>
          <p style={{ margin: '0 0 1rem 0', color: '#5a0f28', fontWeight: '500', cursor: 'pointer' }}>Need help accessing your account?</p>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>New to the atelier? <span style={{ color: '#5a0f28', fontWeight: 'bold', cursor: 'pointer' }}>Apply for Access</span></p>
        </div>

      </div>
    </div>
  );
}
