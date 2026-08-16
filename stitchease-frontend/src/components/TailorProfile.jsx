import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Bell, CheckCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function TailorProfile() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/profile');
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading || !profile) {
        return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'Inter, sans-serif' }}>
            <Sidebar />

            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
                {/* Top Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input 
                            type="text" 
                            placeholder="Search orders, clients..." 
                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', outline: 'none' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', fontWeight: '500', color: '#475569' }}>
                            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>Dashboard</span>
                            <span style={{ color: '#5a0f28', borderBottom: '2px solid #5a0f28', paddingBottom: '0.2rem' }}>Profile</span>
                            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/orders')}>Orders</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ position: 'relative', cursor: 'pointer' }}>
                                <Bell size={20} color="#666" />
                                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#333' }}>
                                        {user ? user.name : 'Admin User'}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                        {user ? user.role : 'Master Tailor'}
                                    </div>
                                </div>
                                <div 
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2d5d5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a0f28', fontWeight: 'bold', cursor: 'pointer' }}
                                    onClick={() => navigate('/admin/profile')}
                                >
                                    {user && user.name ? (user.name.length > 2 ? user.name.substring(0, 3) : user.name.substring(0, 2)).toUpperCase() : 'AU'}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h1 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontFamily: '"Playfair Display", serif' }}>Tailor Profile</h1>
                        <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.3rem 0.8rem', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 'bold' }}>● LIVE SHOP</span>
                    </div>
                    <button style={{ padding: '0.5rem 1.5rem', border: '1px solid #5a0f28', backgroundColor: 'transparent', color: '#5a0f28', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Edit Profile
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    
                    {/* Shop Details Card */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#fdfbf7', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ margin: 0, color: '#b99a45', fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', fontStyle: 'italic' }}>StitchEase</h3>
                                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.6rem', color: '#666' }}>Welcome to Your Atelier</p>
                                </div>
                            </div>
                            <div>
                                <h2 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontFamily: '"Playfair Display", serif', fontSize: '1.8rem' }}>{profile.shopName}</h2>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.9rem' }}>Established {profile.establishedYear} • {profile.location}</p>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    {profile.description}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {profile.coreSpecializations?.map((spec, idx) => (
                                        <span key={idx} style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust & Verification */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ margin: '0 0 1.5rem 0', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <CheckCircle size={20} color="#1e293b" /> Trust & Verification
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#475569' }}>Government ID</span>
                                {profile.governmentIdVerified ? <span style={{ color: '#166534', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle size={14} /> Verified</span> : <span style={{ color: '#94a3b8' }}>Pending</span>}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#475569' }}>Trade License</span>
                                {profile.tradeLicenseVerified ? <span style={{ color: '#166534', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle size={14} /> Verified</span> : <span style={{ color: '#94a3b8' }}>Pending</span>}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#475569' }}>GSTIN</span>
                                {profile.gstinVerified ? <span style={{ color: '#166534', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle size={14} /> Verified</span> : <span style={{ color: '#94a3b8' }}>Pending</span>}
                            </div>
                        </div>
                        {profile.premiumPartner && (
                            <div style={{ backgroundColor: '#fdfbf7', border: '1px solid #f3e8d2', padding: '1rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b99a45', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                    💎 Premium Partner
                                </div>
                                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Top 5% rated artisans on StitchEase</div>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                    {/* Tailors Details */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ margin: '0 0 1.5rem 0', color: '#1e293b', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#5a0f28' }}>ⓘ</span> Tailors Details
                        </h3>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Experience</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b', fontWeight: '500' }}>
                                ⏱ {profile.experienceYears}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase' }}>Lead Times</h4>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.3rem' }}>Standard Wear</div>
                                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{profile.standardLeadTime}</div>
                                </div>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', flex: 1 }}>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.3rem' }}>Bridal Custom</div>
                                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{profile.customLeadTime}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payout Information */}
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                🏛 Payout Information
                            </h3>
                            <a href="#" style={{ color: '#5a0f28', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Manage Payouts →</a>
                        </div>
                        
                        <div style={{ backgroundColor: '#fdfbf7', border: '1px solid #f3e8d2', padding: '1.5rem', borderRadius: '12px', display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 'bold' }}>Primary Bank Account</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a0f28', fontWeight: 'bold' }}>
                                        C
                                    </div>
                                    <div style={{ fontWeight: '500', color: '#1e293b', fontSize: '1.1rem' }}>
                                        {profile.bankAccount}
                                    </div>
                                </div>
                            </div>
                            <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '2rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 'bold' }}>UPI ID</div>
                                <div style={{ backgroundColor: '#e2e8f0', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.9rem', color: '#475569' }}>
                                    {profile.upiId}
                                </div>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            🔒 Payouts are processed securely every Tuesday and Friday.
                        </div>
                    </div>
                </div>

                {/* Portfolio Highlights */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ margin: 0, fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#1e293b' }}>Portfolio Highlights</h2>
                        <a href="#" style={{ color: '#5a0f28', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>View All</a>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {profile.portfolioHighlights?.map((image, index) => (
                            <div key={index} style={{ height: '300px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f1f5f9', position: 'relative' }}>
                                <img src={image.imageUrl || `https://via.placeholder.com/300x400?text=Design+${index + 1}`} alt={image.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
