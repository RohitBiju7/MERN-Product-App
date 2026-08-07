import React, { useState } from 'react';
import axios from 'axios';

const EditProductModal = ({ product, onClose, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    image: product.image,
    rating: typeof product.rating === 'object' ? product.rating.rate : product.rating
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.put(`http://localhost:3000/products/${product._id}`, {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating)
      });

      onProductUpdated(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Edit Product</h3>
        
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px' }}>Rating (0 - 5)</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;