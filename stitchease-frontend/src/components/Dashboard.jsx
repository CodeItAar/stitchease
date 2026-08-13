import React, { useEffect, useState } from 'react';
import { getAllDesigns, deleteDesign } from '../services/designService';
import AddDesignModal from './AddDesignModal';

export default function Dashboard() {
  const [designs, setDesigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designToEdit, setDesignToEdit] = useState(null);

  const loadDesigns = async () => {
    try {
      const data = await getAllDesigns();
      setDesigns(data);
    } catch (err) {
      console.error('Failed to load designs:', err);
    }
  };

  useEffect(() => {
    loadDesigns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      await deleteDesign(id);
      loadDesigns();
    }
  };

  const handleEdit = (design) => {
    setDesignToEdit(design);
    setIsModalOpen(true);
  };

  return (
      <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        {/* Navigation Header */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 3rem', background: '#fff', borderBottom: '1px solid #e2e8f0', alignItems: 'center' }}>
          <h2 style={{ color: '#5a0f28', margin: 0, fontStyle: 'italic' }}>StitchEase</h2>
          <div style={{ display: 'flex', gap: '2rem', color: '#475569', fontWeight: '500' }}>
            <span>Dashboard</span>
            <span>Orders</span>
            <span>Clients</span>
            <span style={{ color: '#5a0f28', borderBottom: '2px solid #5a0f28', paddingBottom: '0.2rem' }}>My Designs</span>
          </div>
        </nav>

        {/* Main Content Area */}
        <main style={{ padding: '2rem 3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <h1 style={{ margin: 0, color: '#0f172a', fontSize: '2rem', lineHeight: '1.2' }}>
                My Designs
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '1rem', lineHeight: '1.5' }}>
                Browse and manage your uploaded designs.
              </p>
            </div>

            <button
                onClick={() => {
                  setDesignToEdit(null);
                  setIsModalOpen(true);
                }}
                style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: '#5a0f28',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
            >
              + Add New Design
            </button>
          </div>

          {/* Card Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {designs.map((item) => (
                <div key={item.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '0.8rem', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>
                    {item.title}
                  </div>
                  <img
                      src={item.sampleImage}
                      alt={item.title}
                      style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '0.8rem', color: '#64748b', fontSize: '0.9rem' }}>
                    <p style={{ margin: 0 }}>{item.category}</p>
                    <p style={{ margin: '0.25rem 0 0', fontWeight: 'bold', color: '#0f172a' }}>₹{item.basePrice}</p>
                  </div>
                  <div style={{ display: 'flex', borderTop: '1px solid #e2e8f0', marginTop: 'auto' }}>
                    <button 
                      onClick={() => handleEdit(item)}
                      style={{ flex: 1, padding: '0.5rem', border: 'none', borderRight: '1px solid #e2e8f0', background: 'none', cursor: 'pointer' }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                        onClick={() => handleDelete(item.id)}
                        style={{ flex: 1, padding: '0.5rem', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </main>

        <AddDesignModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setDesignToEdit(null);
            }}
            onSuccess={loadDesigns}
            designToEdit={designToEdit}
        />
      </div>
  );
}
