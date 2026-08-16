import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, User, ArrowLeft, Search } from 'lucide-react';

export default function DesignCustomization() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selections
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState([]);

  // Visuals
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const designRes = await axios.get(`http://localhost:8080/api/designs/${id}`);
        setDesign(designRes.data);
        setMainImage(designRes.data.sampleImage);

        const optionsRes = await axios.get('http://localhost:8080/api/customizations');
        setOptions(optionsRes.data);

        // Auto-select first fabric and color if available
        const fabrics = optionsRes.data.filter(o => o.category === 'FABRIC');
        if (fabrics.length > 0) setSelectedFabric(fabrics[0]);

        const colors = optionsRes.data.filter(o => o.category === 'COLOR');
        if (colors.length > 0) setSelectedColor(colors[0]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fabrics = options.filter(o => o.category === 'FABRIC');
  const colors = options.filter(o => o.category === 'COLOR');
  const details = options.filter(o => o.category === 'DETAIL');

  const handleDetailToggle = (detail) => {
    if (selectedDetails.some(d => d.id === detail.id)) {
      setSelectedDetails(selectedDetails.filter(d => d.id !== detail.id));
      if (detail.imageUrl && mainImage === detail.imageUrl) {
        setMainImage(selectedColor?.imageUrl || design.sampleImage);
      }
    } else {
      setSelectedDetails([...selectedDetails, detail]);
      if (detail.imageUrl) {
        setMainImage(detail.imageUrl);
      }
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (color.imageUrl) {
      setMainImage(color.imageUrl);
    } else {
      setMainImage(design.sampleImage);
    }
  };

  const calculateTotal = () => {
    if (!design) return 0;
    let total = design.basePrice || 0;
    if (selectedFabric && selectedFabric.priceModifier) total += selectedFabric.priceModifier;
    if (selectedColor && selectedColor.priceModifier) total += selectedColor.priceModifier;
    selectedDetails.forEach(d => {
      if (d.priceModifier) total += d.priceModifier;
    });
    return total;
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fdfbf7', color: '#333' }}>Loading...</div>;
  if (!design) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fdfbf7', color: '#333' }}>Design not found</div>;

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', color: '#333', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3rem', backgroundColor: '#fdfbf7', color: '#333' }}>
        <h1 onClick={() => navigate('/')} style={{ color: '#5a0f28', fontFamily: '"Playfair Display", serif', margin: 0, fontSize: '2rem', cursor: 'pointer' }}>
          StitchEase
        </h1>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <span style={{ cursor: 'pointer' }}>Collections</span>
          <span style={{ cursor: 'pointer', borderBottom: '2px solid #5a0f28', paddingBottom: '0.2rem' }}>Explore Designs</span>
          <span style={{ cursor: 'pointer' }}>Heritage</span>
          <span style={{ cursor: 'pointer' }}>Atelier</span>
        </nav>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <ShoppingBag size={20} style={{ cursor: 'pointer' }} />
          <User size={20} style={{ cursor: 'pointer' }} onClick={() => navigate('/login')} />
          <button style={{ backgroundColor: '#5a0f28', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Book Appointment
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '0.5rem', color: '#888', fontSize: '0.8rem', marginBottom: '2rem', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/explore')}>Designs</span>
          <span>&gt;</span>
          <span>{design.category}</span>
          <span>&gt;</span>
          <span style={{ color: '#5a0f28' }}>{design.title}</span>
        </div>

        <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Left: Images */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '100%', height: '600px', backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
              <img src={mainImage} alt={design.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Image+Unavailable'; }} />

              <button style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '1.2rem', color: '#333', zIndex: 10 }}>
                ♡
              </button>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div
                onClick={() => setMainImage(design.sampleImage)}
                style={{ width: '100px', height: '100px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: mainImage === design.sampleImage ? '2px solid #5a0f28' : '1px solid #e2e8f0', position: 'relative' }}
              >
                <img src={design.sampleImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Thumb 1" />
              </div>
              {selectedColor && selectedColor.imageUrl && (
                <div
                  onClick={() => setMainImage(selectedColor.imageUrl)}
                  style={{ width: '100px', height: '100px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: mainImage === selectedColor.imageUrl ? '2px solid #5a0f28' : '1px solid #e2e8f0' }}
                >
                  <img src={selectedColor.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Color Thumb" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Customization */}
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Fabric Options */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#555', fontWeight: '500' }}>Fabric Options</h3>
                <span style={{ color: '#d4af37', fontSize: '0.8rem', cursor: 'pointer', borderBottom: '1px solid #d4af37' }}>Fabric Guide</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {fabrics.map(fabric => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric)}
                    style={{
                      padding: '1.2rem',
                      backgroundColor: selectedFabric?.id === fabric.id ? 'rgba(90, 15, 40, 0.05)' : '#fff',
                      border: selectedFabric?.id === fabric.id ? '1px solid #5a0f28' : '1px solid #e2e8f0',
                      borderRadius: '4px',
                      color: '#333',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontWeight: selectedFabric?.id === fabric.id ? 'bold' : 'normal' }}>{fabric.name}</span>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>{fabric.priceModifier > 0 ? `+₹${fabric.priceModifier}` : 'Base Price'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <h3 style={{ margin: '0 0 1rem 0', color: '#555', fontWeight: '500' }}>Color Palette</h3>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                {colors.map(color => (
                  <div
                    key={color.id}
                    onClick={() => handleColorSelect(color)}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      backgroundColor: color.colorHex || '#ccc',
                      cursor: 'pointer',
                      border: selectedColor?.id === color.id ? '2px solid #fff' : '2px solid transparent',
                      boxShadow: selectedColor?.id === color.id ? '0 0 0 2px #5a0f28' : '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                Selected: <span style={{ color: '#333', fontWeight: 'bold' }}>{selectedColor?.name || 'None'}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0' }}></div>

            {/* Personalize Details */}
            <div>
              <h3 style={{ margin: '0 0 1rem 0', color: '#555', fontWeight: '500' }}>Personalize Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {details.map(detail => {
                  const isSelected = selectedDetails.some(d => d.id === detail.id);
                  return (
                    <div
                      key={detail.id}
                      onClick={() => handleDetailToggle(detail)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        border: isSelected ? '1px solid #5a0f28' : '1px solid #e2e8f0',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'rgba(90, 15, 40, 0.05)' : '#fff'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '18px', height: '18px', border: isSelected ? '1px solid #5a0f28' : '1px solid #ccc', borderRadius: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: isSelected ? '#5a0f28' : 'transparent' }}>
                          {isSelected && <span style={{ color: '#fff', fontSize: '0.8rem' }}>✓</span>}
                        </div>
                        <span style={{ color: isSelected ? '#5a0f28' : '#333', fontWeight: isSelected ? '500' : 'normal' }}>{detail.name}</span>
                      </div>
                      <span style={{ color: '#d4af37' }}>+₹{detail.priceModifier}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Box */}
            <div style={{ backgroundColor: '#fff', color: '#333', padding: '1.5rem', borderRadius: '4px', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#666' }}>Base Design</span>
                <span>₹{design.basePrice || 0}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#666' }}>Customizations ({selectedDetails.length})</span>
                <span style={{ color: '#d4af37' }}>+₹{calculateTotal() - (design.basePrice || 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total Investment</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5a0f28' }}>₹{calculateTotal()}</span>
              </div>
              <button 
                onClick={() => navigate(`/checkout-measurements/${id}`, { state: { selectedFabric, selectedColor, selectedDetails, totalPrice: calculateTotal() } })}
                style={{ width: '100%', padding: '1rem', backgroundColor: '#5a0f28', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
              >
                <ShoppingBag size={18} />
                Add to Order - ₹{calculateTotal()}
              </button>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '1rem' }}>
                Taxes calculated at checkout. Free virtual consultation included.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
