import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, X, CheckCircle, Clock, Package, CheckSquare, Trash2 } from 'lucide-react';
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
    const [showMeasurements, setShowMeasurements] = useState(false);

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

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm(`Are you sure you want to delete Order #SE-${orderId}?`)) {
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
            await fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Failed to delete order');
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
            case 'CONFIRMED': return { bg: '#f3f4f6', text: '#4b5563' };
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
                        <option value="CONFIRMED">Confirmed</option>
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
                                            <td style={{ padding: '1rem', color: '#4b5563' }}>{order.designTitle || (order.designId ? `Design ${order.designId}` : 'Custom Design')}</td>
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
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button 
                                        onClick={() => handleDeleteOrder(selectedOrder.id)} 
                                        style={{ background: '#fef2f2', border: '1px solid #f87171', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center' }}
                                        title="Delete Order"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                                        <X size={20} />
                                    </button>
                                </div>
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
                                            <button 
                                                onClick={() => setShowMeasurements(true)}
                                                style={{ fontSize: '0.85rem', color: '#5a0f28', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                                            >
                                                View Full Sheet
                                            </button>
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
                                    <div style={{ width: '80px', height: '100px', backgroundColor: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                                        {selectedOrder.designImageUrl ? (
                                            <img src={selectedOrder.designImageUrl} alt="Design" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/80x100?text=No+Img'; }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', textAlign: 'center', fontSize: '0.8rem' }}>No Image</div>
                                        )}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#111827' }}>{selectedOrder.designTitle || (selectedOrder.designId ? `Design ${selectedOrder.designId}` : 'Custom Design')}</div>
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
                                    {['CONFIRMED', 'PLACED', 'SOURCING', 'STITCHING', 'QUALITY_CHECK', 'COMPLETED'].map((stage, index) => {
                                        const stages = ['CONFIRMED', 'PLACED', 'SOURCING', 'STITCHING', 'QUALITY_CHECK', 'COMPLETED'];
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
                                <label style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'block' }}>
                                    Update Stage Manually
                                </label>
                                <select 
                                    value={selectedOrder.status}
                                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.8rem', 
                                        borderRadius: '8px', 
                                        border: '1px solid #e5e7eb', 
                                        outline: 'none',
                                        backgroundColor: '#f9fafb',
                                        fontWeight: '500',
                                        color: '#111827',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="CONFIRMED">Confirmed</option>
                                    <option value="PLACED">Placed</option>
                                    <option value="SOURCING">Sourcing</option>
                                    <option value="STITCHING">Stitching</option>
                                    <option value="QUALITY_CHECK">Quality Check</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Measurements Modal */}
            {showMeasurements && selectedOrder?.measurement && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#111827', fontFamily: '"Playfair Display", serif' }}>Customer Measurements</h3>
                            <button onClick={() => setShowMeasurements(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Bust / Chest</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.bustChest || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Waist</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.waist || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Hips</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.hips || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Shoulder</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.shoulder || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Length</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.length || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Sleeve Length</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.sleeveLength || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Neck</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.neck || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Inseam</div>
                                <div style={{ fontSize: '1rem', color: '#111827', fontWeight: '500' }}>{selectedOrder.measurement.inseam || 'N/A'}</div>
                            </div>
                        </div>
                        
                        {selectedOrder.measurement.additionalNotes && (
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Additional Notes</div>
                                <div style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.5 }}>{selectedOrder.measurement.additionalNotes}</div>
                            </div>
                        )}
                        
                        <div style={{ marginTop: '2rem' }}>
                            <button 
                                onClick={() => setShowMeasurements(false)}
                                style={{ width: '100%', padding: '0.8rem', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
