import React, { useState, useEffect } from 'react';
import { createDesign, updateDesign } from '../services/designService';

export default function AddDesignModal({ isOpen, onClose, onSuccess, designToEdit }) {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        ageDemographics: '',
        gender: '',
        outfitType: '',
        basePrice: '',
    });
    const [imageFile, setImageFile] = useState(null);

    // Populate form data when opening in edit mode
    useEffect(() => {
        if (designToEdit) {
            setFormData({
                title: designToEdit.title || '',
                category: designToEdit.category || '',
                ageDemographics: designToEdit.ageDemographics || '',
                gender: designToEdit.gender || '',
                outfitType: designToEdit.outfitType || '',
                basePrice: designToEdit.basePrice || '',
            });
        } else {
            setFormData({
                title: '',
                category: '',
                ageDemographics: '',
                gender: '',
                outfitType: '',
                basePrice: '',
            });
        }
        setImageFile(null);
    }, [designToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (designToEdit) {
                // UPDATE DESIGN MODE
                await updateDesign(designToEdit.id, formData);
            } else {
                // CREATE DESIGN MODE
                if (!imageFile) return alert('Please select an image file!');
                const payload = new FormData();
                Object.keys(formData).forEach((key) => payload.append(key, formData[key]));
                payload.append('image', imageFile);
                await createDesign(payload);
            }

            onSuccess();
            onClose();
        } catch (err) {
            alert('Operation failed: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>{designToEdit ? 'Edit Design' : 'Add New Design'}</h2>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input name="title" value={formData.title} placeholder="Title (e.g. Royal Maroon Lehenga)" onChange={handleChange} required />
                    <input name="category" value={formData.category} placeholder="Category (e.g. Bridal Wear)" onChange={handleChange} required />
                    <input name="ageDemographics" value={formData.ageDemographics} placeholder="Age Demographics (e.g. Adults)" onChange={handleChange} required />
                    <input name="gender" value={formData.gender} placeholder="Gender (e.g. Female)" onChange={handleChange} required />
                    <input name="outfitType" value={formData.outfitType} placeholder="Outfit Type (e.g. Lehenga Choli)" onChange={handleChange} required />
                    <input name="basePrice" value={formData.basePrice} placeholder="Base Price (e.g. 5000)" onChange={handleChange} required />

                    {!designToEdit && (
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            required
                        />
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#1e3a8a', color: '#fff', border: 'none', borderRadius: '4px' }}>
                            {designToEdit ? 'Save Changes' : 'Upload Card'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalStyle = { background: '#fff', padding: '2rem', borderRadius: '8px', width: '380px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '0.8rem' };