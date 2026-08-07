import React from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const title = product.title;
  const price = product.price;
  const image = product.image;
  const rating = typeof product.rating === 'object' ? product.rating.rate : product.rating;

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <h3 className="product-title">{title}</h3>
      <div className="product-meta">
        <span className="price">${Number(price).toFixed(2)}</span>
        <span className="rating">★ {rating}</span>
      </div>
      
      {/* Show Edit and Delete buttons for MongoDB products */}
      {product._id && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(product)}
              style={{
                flex: 1,
                padding: '6px 12px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(product._id)}
              style={{
                flex: 1,
                padding: '6px 12px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;