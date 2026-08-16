import React, { useEffect, useState } from 'react';
import { getAllDesigns, deleteDesign } from '../services/designService';
import AddDesignModal from './AddDesignModal';
import ManageColorsModal from './ManageColorsModal';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [designs, setDesigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designToEdit, setDesignToEdit] = useState(null);
  
  const [isColorsModalOpen, setIsColorsModalOpen] = useState(false);
  const [designForColors, setDesignForColors] = useState(null);

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
  
  const handleManageColors = (design) => {
    setDesignForColors(design);
    setIsColorsModalOpen(true);
  };

  return (
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'Inter, sans-serif' }}>
        <Sidebar />

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <h1 style={{ margin: 0, color: '#5a0f28', fontSize: '2.2rem', fontFamily: '"Playfair Display", serif' }}>
                Manage Designs
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', maxWidth: '400px' }}>
                Curation and oversight of the StitchEase seasonal collections and bespoke patterns.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {activeSearchTerm && (
                <button 
                  onClick={() => {
                    setActiveSearchTerm('');
                    setSearchTerm('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    color: '#5a0f28',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0'
                  }}
                  title="Clear Search"
                >
                  ⬅️
                </button>
              )}
              <input 
                type="text" 
                placeholder="🔍 Search designs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setActiveSearchTerm(searchTerm);
                  }
                }}
                style={{ padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', width: '250px' }}
              />

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
          </div>

          {/* Card Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {designs.filter(design => 
              design.title.toLowerCase().includes(activeSearchTerm.toLowerCase()) || 
              design.category.toLowerCase().includes(activeSearchTerm.toLowerCase())
            ).map((item) => (
                <div key={item.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '0.8rem', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>
                    {item.title}
                  </div>
                  <img
                      src={item.sampleImage}
                      alt={item.title}
                      style={{ width: '100%', height: '220px', objectFit: 'contain', backgroundColor: '#fcfaf6' }}
                  />
                  <div style={{ padding: '0.8rem', color: '#64748b', fontSize: '0.9rem' }}>
                    <p style={{ margin: 0 }}>{item.category}</p>
                    <p style={{ margin: '0.25rem 0 0', fontWeight: 'bold', color: '#0f172a' }}>₹{item.basePrice}</p>
                    {item.colorVariants && item.colorVariants.length > 0 && (
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#5a0f28' }}>{item.colorVariants.length} variants</p>
                    )}
                  </div>
                  <div style={{ display: 'flex', borderTop: '1px solid #e2e8f0', marginTop: 'auto' }}>
                    <button 
                      onClick={() => handleManageColors(item)}
                      style={{ flex: 1, padding: '0.5rem', border: 'none', borderRight: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', color: '#0f172a' }}
                    >
                      🎨 Colors
                    </button>
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
                      🗑️
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
        
        <ManageColorsModal
            isOpen={isColorsModalOpen}
            onClose={() => {
              setIsColorsModalOpen(false);
              setDesignForColors(null);
            }}
            design={designForColors}
            onSuccess={async () => {
                // reload designs and update the currently selected design for colors to show changes in modal
                try {
                    const data = await getAllDesigns();
                    setDesigns(data);
                    if (designForColors) {
                        const updatedDesign = data.find(d => d.id === designForColors.id);
                        if (updatedDesign) {
                            setDesignForColors(updatedDesign);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }}
        />
      </div>
  );
}
