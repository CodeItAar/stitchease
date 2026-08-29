import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageDetailsModal({ isOpen, onClose, design, onSuccess }) {
  const [details, setDetails] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (design) {
      setDetails(design.personalizeDetails || []);
      setNewName('');
      setNewPrice('');
      setError('');
    }
  }, [design]);

  if (!isOpen || !design) return null;

  const handleAddDetail = async (e) => {
    e.preventDefault();
    if (!newName || !newPrice) {
      setError('Please provide both name and price');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Need to send cookies for session auth
      const params = new URLSearchParams();
      params.append('name', newName);
      params.append('priceModifier', newPrice);

      const res = await axios.post(`http://localhost:8080/api/designs/${design.id}/personalize`, params, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      setDetails([...details, res.data]);
      setNewName('');
      setNewPrice('');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError('Failed to add detail. ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (detailId) => {
    if (!window.confirm('Are you sure you want to delete this detail?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/api/designs/${design.id}/personalize/${detailId}`, {
        withCredentials: true
      });
      setDetails(details.filter(d => d.id !== detailId));
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError('Failed to delete detail.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '8px', padding: '2rem',
        width: '500px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#5a0f28', fontFamily: '"Playfair Display", serif' }}>
            Personalize Details for {design.title}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#333', marginBottom: '1rem' }}>Existing Details</h3>
          {details.length === 0 ? (
            <p style={{ color: '#888', fontSize: '0.9rem' }}>No personalize details added yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {details.map(d => (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{d.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>+₹{d.priceModifier}</div>
                  </div>
                  <button onClick={() => handleDelete(d.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleAddDetail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#333', margin: 0 }}>Add New Detail</h3>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555', fontWeight: 'bold' }}>Detail Name</label>
              <input
                type="text"
                placeholder="e.g. Satin Lining"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555', fontWeight: 'bold' }}>Price (+₹)</label>
              <input
                type="number"
                placeholder="500"
                min="0"
                step="0.01"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '0.8rem', 
              backgroundColor: '#5a0f28', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              marginTop: '0.5rem'
            }}>
            {loading ? 'Adding...' : 'Add Detail'}
          </button>
        </form>
      </div>
    </div>
  );
}
