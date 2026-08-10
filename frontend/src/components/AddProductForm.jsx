import React, { useState } from 'react';
import api from '../api';

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    rating: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const res = await api.post('/products', {
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating)
      });

      setSuccess('Product added successfully!');
      setFormData({ title: '', price: '', image: '', rating: '' });
      
      if (onProductAdded) {
        onProductAdded(res.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text-main)',
    outline: 'none'
  };

  return (
    <div style={{
      backgroundColor: 'var(--card-bg)',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid var(--border-color)',
      marginBottom: '2rem'
    }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Add New Product (MongoDB)</h3>
      
      {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
      {success && <p style={{ color: '#10b981', marginBottom: '1rem' }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title (min 5 chars)"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>Price ($)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>Rating (0 - 5)</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="4.5"
            required
            style={inputStyle}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;