import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Scissors, Users, Settings } from 'lucide-react';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
        { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/admin/orders' },
        { name: 'Designs', icon: <Scissors size={20} />, path: '/admin/designs' },
        { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
    ];

    return (
        <aside style={{ width: '250px', backgroundColor: '#f9f6f0', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', height: '100vh', borderRight: '1px solid #eee', flexShrink: 0 }}>
            <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
                <h1 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', fontSize: '1.8rem', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>StitchEase</h1>
            </div>
            
            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => navigate(item.path)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    width: '100%',
                                    padding: '0.8rem 1rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    backgroundColor: location.pathname === item.path ? '#ffebee' : 'transparent',
                                    color: location.pathname === item.path ? '#5a0f28' : '#666',
                                    fontWeight: location.pathname === item.path ? '600' : '500',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {item.icon}
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ padding: '1rem', backgroundColor: '#f0e6e6', borderRadius: '12px', marginTop: 'auto' }}>
                <div style={{ fontSize: '0.8rem', color: '#5a0f28', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Heritage Plan</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#333', fontWeight: '500' }}>85% Usage</span>
                    <span style={{ color: '#5a0f28' }}>ⓘ</span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#e2d5d5', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', backgroundColor: '#5a0f28', borderRadius: '2px' }}></div>
                </div>
            </div>
        </aside>
    );
}
