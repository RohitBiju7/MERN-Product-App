import React from 'react';

const Navbar = ({ activeSource, setActiveSource, darkMode, setDarkMode }) => {
  return (
    <nav style={{
      backgroundColor: 'var(--card-bg)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 700 }}>
        ABC Retail Products
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Source Switcher */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-main)', padding: '4px', borderRadius: '8px' }}>
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
              color: activeSource === 'mongodb' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            MongoDB
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
              color: activeSource === 'fakestore' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            Fake Store
          </button>
        </div>

        {/* Dark Mode Switch Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '8px 12px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-main)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;