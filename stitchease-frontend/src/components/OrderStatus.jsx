import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Package, Clock, ShieldCheck, CheckSquare } from 'lucide-react';

export default function OrderStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading order status...</div>;
  if (!order) return <div style={{ padding: '3rem', textAlign: 'center' }}>Order not found.</div>;

  const stages = ['PLACED', 'CONFIRMED', 'SOURCING', 'STITCHING', 'QUALITY_CHECK', 'COMPLETED'];
  let currentStageIndex = stages.indexOf(order.status);
  if (currentStageIndex === -1) {
    if (order.status === 'PENDING') currentStageIndex = 0;
    else currentStageIndex = 0;
  }

  const stageIcons = {
    'PLACED': <CheckSquare size={24} />,
    'CONFIRMED': <CheckCircle size={24} />,
    'SOURCING': <Package size={24} />,
    'STITCHING': <Clock size={24} />,
    'QUALITY_CHECK': <ShieldCheck size={24} />,
    'COMPLETED': <CheckCircle size={24} />
  };

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', color: '#333', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', backgroundColor: '#fdfbf7', borderBottom: '1px solid #f0e8df' }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#5a0f28', fontFamily: '"Playfair Display", serif', margin: 0, fontSize: '1.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
          StitchEase
        </h1>
        <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555', fontWeight: '500' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/explore')}>Collections</span>
          <span style={{ cursor: 'pointer' }}>Bespoke</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>Profile</span>
        </nav>
      </header>

      <main style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: '#1a1a1a', margin: '0 0 0.5rem 0' }}>
              Order Status
            </h2>
            <p style={{ margin: 0, color: '#666' }}>Order #SE-{order.id}</p>
          </div>
          <button onClick={() => navigate('/profile')} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
            Back to Profile
          </button>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '3rem', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
            {stages.map((stage, index) => {
              const isPast = index <= currentStageIndex;
              const isCurrent = index === currentStageIndex;
              return (
                <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', flex: 1 }}>
                  {index < stages.length - 1 && (
                    <div style={{ position: 'absolute', top: '24px', left: '50%', right: '-50%', height: '2px', backgroundColor: isPast ? '#5a0f28' : '#e5e7eb', zIndex: 0 }} />
                  )}
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '50%', 
                    backgroundColor: isPast ? '#5a0f28' : '#f3f4f6',
                    color: isPast ? '#fff' : '#9ca3af',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1,
                    boxShadow: isCurrent ? '0 0 0 4px #fdf8f9' : 'none',
                    marginBottom: '1rem'
                  }}>
                    {stageIcons[stage]}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: isCurrent ? 'bold' : '500', color: isPast ? '#1a1a1a' : '#9ca3af', textAlign: 'center' }}>
                    {stage.replace('_', ' ')}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '2rem', display: 'flex', gap: '2rem' }}>
            <img 
              src={order.designImageUrl || 'https://via.placeholder.com/120x150?text=Custom'} 
              alt="Design" 
              style={{ width: '120px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/120x150?text=No+Image'; }}
            />
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#1a1a1a' }}>
                {order.designTitle || (order.designId ? `Design ${order.designId}` : 'Custom Design')}
              </h3>
              <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.95rem' }}>
                Total Price: ₹{order.totalPrice}
              </p>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px dashed #e5e7eb' }}>
                <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Current Stage</div>
                <div style={{ fontSize: '1.1rem', color: '#5a0f28', fontWeight: 'bold' }}>{order.status.replace('_', ' ')}</div>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#555' }}>
                  {order.status === 'PLACED' && 'Your order has been placed successfully.'}
                  {order.status === 'CONFIRMED' && 'Your order has been confirmed by the tailor.'}
                  {order.status === 'SOURCING' && 'We are currently sourcing the finest materials for your garment.'}
                  {order.status === 'STITCHING' && 'Your garment is currently being stitched.'}
                  {order.status === 'QUALITY_CHECK' && 'Your garment is undergoing a rigorous quality check.'}
                  {order.status === 'COMPLETED' && 'Your order is complete and ready for delivery/pickup!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
