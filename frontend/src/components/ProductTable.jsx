import React from 'react';

const ProductTable = ({ products, onDelete, onEdit, activeSource }) => {
  if (!products || products.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No products found.</p>;
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Image</th>
            <th style={{ padding: '12px' }}>Title</th>
            <th style={{ padding: '12px' }}>Price</th>
            <th style={{ padding: '12px' }}>Rating</th>
            {activeSource === 'mongodb' && <th style={{ padding: '12px' }}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const rating = typeof product.rating === 'object' ? product.rating.rate : product.rating;
            return (
              <tr key={product._id || product.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>
                  <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                </td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{product.title}</td>
                <td style={{ padding: '12px', color: '#4f46e5', fontWeight: 'bold' }}>${Number(product.price).toFixed(2)}</td>
                <td style={{ padding: '12px' }}>★ {rating}</td>
                {activeSource === 'mongodb' && (
                  <td style={{ padding: '12px' }}>
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '8px'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;