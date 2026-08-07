import React from 'react';

const Navbar = ({ activeSource, setActiveSource }) => {
  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '1.25rem', color: '#1e293b', fontWeight: 700 }}>
        ABC Retail Products
      </h1>
      <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
        <button
          type="button"
          onClick={() => setActiveSource('mongodb')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            backgroundColor: activeSource === 'mongodb' ? '#4f46e5' : 'transparent',
            color: activeSource === 'mongodb' ? '#ffffff' : '#64748b'
          }}
        >
          MongoDB Products
        </button>
        <button
          type="button"
          onClick={() => setActiveSource('fakestore')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            backgroundColor: activeSource === 'fakestore' ? '#4f46e5' : 'transparent',
            color: activeSource === 'fakestore' ? '#ffffff' : '#64748b'
          }}
        >
          Fake Store API
        </button>
      </div>
    </nav>
  );
};

export default Navbar;