import React, { useState, useEffect } from 'react';
import { addColorVariant, deleteColorVariant } from '../services/designService';

export default function ManageColorsModal({ isOpen, onClose, design, onSuccess }) {
    const [colorName, setColorName] = useState('');
    const [colorHex, setColorHex] = useState('#000000');
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen || !design) return null;

    const handleAddColor = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            setError('Please select an image for this color variant.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('colorName', colorName);
            formData.append('colorHex', colorHex);
            formData.append('image', imageFile);

            await addColorVariant(design.id, formData);
            
            setColorName('');
            setColorHex('#000000');
            setImageFile(null);
            
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('Failed to add color variant:', err);
            setError(err.response?.data || 'Failed to add color variant');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteColor = async (colorId) => {
        if (!window.confirm('Are you sure you want to delete this color variant?')) return;
        
        try {
            await deleteColorVariant(design.id, colorId);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to delete color variant:', err);
            alert('Failed to delete color variant');
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                background: '#fff', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, color: '#5a0f28' }}>Manage Colors - {design.title}</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Existing Variants</h3>
                    {(!design.colorVariants || design.colorVariants.length === 0) ? (
                        <p style={{ color: '#64748b' }}>No color variants added yet.</p>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                            {design.colorVariants.map(variant => (
                                <div key={variant.id} style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.5rem', textAlign: 'center' }}>
                                    <div style={{ 
                                        width: '30px', height: '30px', borderRadius: '50%', backgroundColor: variant.colorHex, 
                                        margin: '0 auto 0.5rem', border: '1px solid #ccc' 
                                    }}></div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{variant.colorName}</div>
                                    <img src={variant.imageUrl} alt={variant.colorName} style={{ width: '100%', height: '100px', objectFit: 'contain', marginTop: '0.5rem' }} />
                                    <button 
                                        onClick={() => handleDeleteColor(variant.id)}
                                        style={{ marginTop: '0.5rem', padding: '0.3rem', width: '100%', border: 'none', background: '#fee2e2', color: '#ef4444', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Add New Color Variant</h3>
                    {error && <div style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}
                    <form onSubmit={handleAddColor} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Color Name</label>
                            <input 
                                type="text" 
                                value={colorName} 
                                onChange={(e) => setColorName(e.target.value)} 
                                required 
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Color Hex</label>
                            <input 
                                type="color" 
                                value={colorHex} 
                                onChange={(e) => setColorHex(e.target.value)} 
                                required 
                                style={{ width: '100%', height: '40px', padding: '0.2rem', border: '1px solid #ccc', borderRadius: '4px' }} 
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Image for this Color</label>
                            <input 
                                type="file" 
                                accept="image/jpeg, image/png, image/jpg" 
                                onChange={(e) => setImageFile(e.target.files[0])} 
                                required 
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{ 
                                padding: '0.8rem', backgroundColor: '#5a0f28', color: '#fff', border: 'none', borderRadius: '4px', 
                                fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' 
                            }}
                        >
                            {loading ? 'Adding...' : 'Add Variant'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
