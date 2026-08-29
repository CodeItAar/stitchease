import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, X, CheckCircle, Clock, Package, CheckSquare } from 'lucide-react';
import Sidebar from './Sidebar';

import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function TailorOrderManagement() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Stages');

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const tailorParam = user && user.id ? `&tailorId=${user.id}` : '';
            const response = await axios.get(`http://localhost:8080/api/orders?page=0&size=50${tailorParam}`);
            setOrders(response.data.content || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(`http://localhost:8080/api/orders/${orderId}/status?status=${newStatus}`);
            await fetchOrders();
            setSelectedOrder(prev => prev && prev.id === orderId ? { ...prev, status: newStatus } : prev);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = 
            order.id.toString().includes(searchTerm) || 
            (order.userName && order.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.designTitle && order.designTitle.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === 'All Stages' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'PLACED': return { bg: '#fef3c7', text: '#b45309' };
            case 'SOURCING': return { bg: '#e0e7ff', text: '#4338ca' };
            case 'STITCHING': return { bg: '#fce7f3', text: '#be185d' };
            case 'QUALITY_CHECK': return { bg: '#ffedd5', text: '#c2410c' };
            case 'COMPLETED': return { bg: '#d1fae5', text: '#047857' };
            default: return { bg: '#f3f4f6', text: '#374151' };
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'Inter, sans-serif' }}>
            <Sidebar />

            <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', color: '#111827', margin: '0 0 0.5rem 0' }}>Orders</h2>
                <p style={{ color: '#6b7280', margin: '0 0 2rem 0' }}>Manage custom commissions and production status.</p>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Search orders, clients, or IDs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                        />
                    </div>
                    <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', backgroundColor: 'white' }}
                    >
                        <option value="All Stages">All Stages</option>
                        <option value="PLACED">Placed</option>
                        <option value="SOURCING">Sourcing</option>
                        <option value="STITCHING">Stitching</option>
                        <option value="QUALITY_CHECK">Quality Check</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                {/* Main Split View */}
                <div style={{ display: 'flex', gap: '1.5rem', flex: 1, alignItems: 'flex-start' }}>
                    
                    {/* Orders List */}
                    <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <tr>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>ID</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>CUSTOMER</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>DESIGN</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>FABRIC</th>
                                    <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>STAGE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Loading orders...</td></tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No orders found.</td></tr>
                                ) : (
                                    filteredOrders.map(order => (
                                        <tr 
                                            key={order.id} 
                                            onClick={() => setSelectedOrder(order)}
                                            style={{ 
                                                borderBottom: '1px solid #e5e7eb', 
                                                cursor: 'pointer',
                                                backgroundColor: selectedOrder?.id === order.id ? '#fdf8f9' : 'white',
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <td style={{ padding: '1rem', fontWeight: '600', color: '#5a0f28' }}>#SE-{order.id}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: '500', color: '#111827' }}>{order.userName || `User ${order.userId}`}</div>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#4b5563' }}>{order.designTitle || `Design ${order.designId}`}</td>
                                            <td style={{ padding: '1rem', color: '#4b5563' }}>Standard</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ 
                                                    padding: '0.25rem 0.75rem', 
                                                    borderRadius: '9999px', 
                                                    fontSize: '0.75rem', 
                                                    fontWeight: '600',
                                                    backgroundColor: getStatusColor(order.status).bg,
                                                    color: getStatusColor(order.status).text
                                                }}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Order Details Pane */}
                    {selectedOrder && (
                        <div style={{ width: '400px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontFamily: '"Playfair Display", serif' }}>Order #SE-{selectedOrder.id} Details</h3>
                                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>Placed on {new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h4 style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Search size={14} /> CUSTOMER INFORMATION
                                </h4>
                                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fdf8f9', color: '#5a0f28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            {(selectedOrder.userName || 'U')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#111827' }}>{selectedOrder.userName || `User ${selectedOrder.userId}`}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>ID: {selectedOrder.userId}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e5e7eb', paddingTop: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>PRIMARY FIT</div>
                                            <div style={{ fontSize: '0.85rem', color: '#111827' }}>Tailored</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>MEASUREMENTS</div>
                                            <div style={{ fontSize: '0.85rem', color: '#5a0f28', textDecoration: 'underline', cursor: 'pointer' }}>View Full Sheet</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Design Selection */}
                            <div>
                                <h4 style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CheckSquare size={14} /> DESIGN SELECTION
                                </h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '80px', height: '100px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}></div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#111827' }}>{selectedOrder.designTitle || `Design ${selectedOrder.designId}`}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Price: ₹{selectedOrder.totalPrice}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Production Stage */}
                            <div>
                                <h4 style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={14} /> PRODUCTION STAGE
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginLeft: '0.5rem' }}>
                                    {['PLACED', 'SOURCING', 'STITCHING', 'QUALITY_CHECK', 'COMPLETED'].map((stage, index) => {
                                        const stages = ['PLACED', 'SOURCING', 'STITCHING', 'QUALITY_CHECK', 'COMPLETED'];
                                        const currentStageIndex = stages.indexOf(selectedOrder.status);
                                        const isPast = index < currentStageIndex;
                                        const isCurrent = index === currentStageIndex;
                                        
                                        return (
                                            <div key={stage} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                                                {index < stages.length - 1 && (
                                                    <div style={{ position: 'absolute', left: '9px', top: '24px', bottom: '-16px', width: '2px', backgroundColor: isPast ? '#5a0f28' : '#e5e7eb' }} />
                                                )}
                                                <div style={{ 
                                                    width: '20px', 
                                                    height: '20px', 
                                                    borderRadius: '50%', 
                                                    backgroundColor: isPast || isCurrent ? '#5a0f28' : '#f3f4f6',
                                                    border: isCurrent ? '4px solid #fdf8f9' : 'none',
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    zIndex: 1,
                                                    boxShadow: isCurrent ? '0 0 0 1px #5a0f28' : 'none'
                                                }}>
                                                    {isPast && <CheckCircle size={12} color="white" />}
                                                </div>
                                                <div style={{ marginTop: '-2px' }}>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: isCurrent ? '600' : '500', color: isPast || isCurrent ? '#111827' : '#9ca3af' }}>
                                                        {stage.replace('_', ' ')}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                                {selectedOrder.status !== 'COMPLETED' && (
                                    <button 
                                        onClick={() => {
                                            const stages = ['PLACED', 'SOURCING', 'STITCHING', 'QUALITY_CHECK', 'COMPLETED'];
                                            const nextStage = stages[stages.indexOf(selectedOrder.status) + 1];
                                            if (nextStage) handleUpdateStatus(selectedOrder.id, nextStage);
                                        }}
                                        style={{ 
                                            width: '100%', 
                                            padding: '1rem', 
                                            backgroundColor: '#5a0f28', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '8px', 
                                            fontWeight: '600', 
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            transition: 'background-color 0.2s'
                                        }}
                                    >
                                        Update to {
                                            selectedOrder.status === 'PLACED' ? 'Sourcing' :
                                            selectedOrder.status === 'SOURCING' ? 'Stitching' :
                                            selectedOrder.status === 'STITCHING' ? 'Quality Check' :
                                            'Completed'
                                        }
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
