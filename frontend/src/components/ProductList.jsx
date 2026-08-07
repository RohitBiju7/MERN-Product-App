import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onDelete, onEdit }) => {
  if (!products || products.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No products found.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ProductList;