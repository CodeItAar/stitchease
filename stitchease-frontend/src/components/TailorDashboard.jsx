import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Sidebar from './Sidebar';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function TailorDashboard() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/dashboard');
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading || !dashboardData) {
        return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    const { metrics, ordersOverTime, ordersByCategory, recentOrders } = dashboardData;

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
                            placeholder="Search orders, clients, or designs..." 
                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#f0f0f0', outline: 'none' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
                </header>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <MetricCard title="Total Orders" value={metrics.totalOrders.toLocaleString()} trend="+12%" icon="🛒" color="#ffebee" />
                    <MetricCard title="Revenue" value={`₹${(metrics.revenue / 1000000).toFixed(1)}M`} trend="+8%" icon="💵" color="#fff8e1" />
                    <MetricCard title="Active Orders" value={metrics.activeOrders} trend="Steady" icon="🔄" color="#e0f2f1" />
                    <MetricCard title="Completion Rate" value={`${metrics.completionRate}%`} trend="Perfect" icon="✅" color="#fce4ec" />
                </div>

                {/* Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>Orders Over Time</h3>
                            <select style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.85rem' }}>
                                <option>Last 12 Months</option>
                            </select>
                        </div>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ordersOverTime}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                                    <Tooltip cursor={{ fill: '#f5f5f5' }} />
                                    <Bar dataKey="total" fill="#e2d5d5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ margin: 0, marginBottom: '1.5rem', color: '#333', fontSize: '1.1rem' }}>Orders by Category</h3>
                        <div style={{ height: '200px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={ordersByCategory} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                                        {ordersByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                            {ordersByCategory.map(cat => (
                                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#555', fontWeight: '500' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color }}></div>
                                    {cat.name} ({(cat.value / ordersByCategory.reduce((a, b) => a + b.value, 0) * 100).toFixed(0)}%)
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #eee' }}>
                        <h3 style={{ margin: 0, color: '#333', fontSize: '1.1rem' }}>Recent Orders</h3>
                        <a href="#" style={{ color: '#5a0f28', fontSize: '0.9rem', textDecoration: 'none', fontWeight: '500' }}>View Full History</a>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ color: '#888', fontSize: '0.85rem' }}>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Order ID</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Customer</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Design</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Stage</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Amount</th>
                                <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#333' }}>{order.id}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fce4ec', color: '#5a0f28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '600' }}>
                                                {order.initials}
                                            </div>
                                            <span style={{ color: '#444' }}>{order.customer}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#555' }}>{order.design}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{ 
                                            padding: '0.3rem 0.6rem', 
                                            borderRadius: '20px', 
                                            fontSize: '0.75rem', 
                                            fontWeight: '600',
                                            backgroundColor: order.stage.includes('SOURCING') ? '#fef3c7' : order.stage.includes('STITCHING') ? '#fce7f3' : '#d1fae5',
                                            color: order.stage.includes('SOURCING') ? '#b45309' : order.stage.includes('STITCHING') ? '#be185d' : '#047857'
                                        }}>
                                            {order.stage}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#333' }}>₹{order.amount.toLocaleString()}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#666', fontSize: '0.9rem' }}>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

function MetricCard({ title, value, trend, icon, color }) {
    return (
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    {icon}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: trend.includes('+') ? '#10b981' : '#6b7280' }}>
                    {trend}
                </div>
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{title}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#111827', fontFamily: '"Playfair Display", serif' }}>{value}</div>
        </div>
    );
}
