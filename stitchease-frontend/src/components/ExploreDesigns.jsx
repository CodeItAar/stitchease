import React, { useState, useEffect, useContext } from 'react';
import { getAllDesigns, getFilteredDesigns } from '../services/designService';
import { getWishlist, addToWishlist, removeFromWishlist } from '../services/wishlistService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ExploreDesigns() {
  const { user } = useContext(AuthContext);
  const [designs, setDesigns] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [outfit, setOutfit] = useState('');

  useEffect(() => {
    fetchDesigns();
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const data = await getWishlist(user.id);
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const toggleWishlist = async (e, designId) => {
    e.stopPropagation();
    if (!user) {
      alert("Please log in to add to your wishlist!");
      return;
    }

    const isInWishlist = wishlist.some(d => d.id === designId);
    try {
      if (isInWishlist) {
        await removeFromWishlist(user.id, designId);
        setWishlist(wishlist.filter(d => d.id !== designId));
      } else {
        await addToWishlist(user.id, designId);
        // Optimistically add it
        const design = designs.find(d => d.id === designId);
        if (design) setWishlist([...wishlist, design]);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const applyFilters = async () => {
    try {
      const filters = {};
      if (category) filters.category = category;
      if (age) filters.age = age;
      if (gender) filters.gender = gender;
      if (outfit) filters.outfit = outfit;
      
      const data = await getFilteredDesigns(filters);
      // Optional: Local text search filtering if user typed in search bar
      if (search) {
        setDesigns(data.filter(d => d.title.toLowerCase().includes(search.toLowerCase())));
      } else {
        setDesigns(data);
      }
    } catch (error) {
      console.error('Error fetching filtered designs:', error);
    }
  };

  const fetchDesigns = async () => {
    try {
      const data = await getAllDesigns();
      setDesigns(data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', padding: '2rem 5%', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', margin: 0, fontSize: '2.5rem' }}>
            Explore Designs
          </h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Discover bespoke creations from master tailors</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/profile')}
            style={{ 
              background: 'none', 
              border: '1px solid #e2e8f0', 
              borderRadius: '50%', 
              width: '45px', 
              height: '45px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              backgroundColor: '#fff',
              fontSize: '1.2rem'
            }}
            title="Customer Profile"
          >
            👤
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {(search || category || gender || age || outfit) && (
          <button 
            onClick={() => {
              setSearch('');
              setCategory('');
              setGender('');
              setAge('');
              setOutfit('');
              fetchDesigns();
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#5a0f28',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0'
            }}
            title="Clear Search & Filters"
          >
            ⬅️
          </button>
        )}
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search designs..." 
          style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', flexGrow: 1, minWidth: '200px' }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          <option value="">All Categories</option>
          <option value="Bridal">Bridal</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Festive">Festive</option>
        </select>
        <select value={gender} onChange={e => setGender(e.target.value)} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          <option value="">All Genders</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
          <option value="Unisex">Unisex</option>
        </select>
        <select value={age} onChange={e => setAge(e.target.value)} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          <option value="">All Ages</option>
          <option value="Adults">Adults</option>
          <option value="Teens">Teens</option>
          <option value="Kids">Kids</option>
        </select>
        <select value={outfit} onChange={e => setOutfit(e.target.value)} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          <option value="">All Outfits</option>
          <option value="Lehenga">Lehenga</option>
          <option value="Suit">Suit</option>
          <option value="Saree">Saree</option>
          <option value="Kurta">Kurta</option>
        </select>
        <button onClick={applyFilters} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#fff', cursor: 'pointer' }}>
          Apply Filters
        </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: '3', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {designs.map(design => (
            <div key={design.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s', position: 'relative' }} onClick={() => navigate('/design-customization/' + design.id)}>
              <div 
                onClick={(e) => toggleWishlist(e, design.id)}
                style={{ position: 'absolute', top: '10px', right: '10px', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10, fontSize: '1.2rem', color: wishlist.some(w => w.id === design.id) ? '#e91e63' : '#777' }}
              >
                {wishlist.some(w => w.id === design.id) ? '❤️' : '♡'}
              </div>
              <div style={{ height: '200px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                <img 
                  src={design.sampleImage} 
                  alt={design.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fafafa' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/250x200?text=No+Image'; }}
                />
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontFamily: '"Playfair Display", serif', color: '#333' }}>{design.title}</h3>
                <p style={{ margin: '0 0 1rem 0', color: '#777', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {design.description || 'Exquisite custom design'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#5a0f28' }}>Starting at ${design.basePrice || '299'}</span>
                  <span style={{ color: '#666', fontSize: '0.9rem' }}>★ 4.9</span>
                </div>
              </div>
            </div>
          ))}
          {designs.length === 0 && (
             <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>No designs found.</div>
          )}
        </div>

        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: '"Playfair Display", serif', color: '#5a0f28', marginTop: 0 }}>Tailor's Picks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {designs.slice(0, 2).map((pick, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#eee', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={pick.sampleImage} alt={pick.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=No+Img'; }} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{pick.title}</h4>
                    <p style={{ margin: 0, color: '#777', fontSize: '0.8rem' }}>Starting at ${pick.basePrice || '299'}</p>
                  </div>
                </div>
              ))}
              {designs.length === 0 && <p style={{ fontSize: '0.9rem', color: '#666' }}>No picks available</p>}
            </div>
            <button style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', backgroundColor: '#fdfbf7', border: '1px solid #5a0f28', color: '#5a0f28', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              View All Picks
            </button>
          </div>

          <div style={{ backgroundColor: '#5a0f28', color: '#fff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: '"Playfair Display", serif', marginTop: 0 }}>Need Guidance?</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Call or WhatsApp our master tailors for a virtual consultation.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="tel:7200706714" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#fff', color: '#5a0f28', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none', display: 'block' }}>
                Call: 7200706714
              </a>
              <a href="https://wa.me/917200706714" target="_blank" rel="noreferrer" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none', display: 'block' }}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
