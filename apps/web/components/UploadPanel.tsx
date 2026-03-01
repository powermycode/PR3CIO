'use client';

import React from 'react';

export const UploadPanel = () => {
  return (
    <div style={{
      background: 'rgba(20, 20, 24, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      padding: '40px',
      textAlign: 'center',
    }}>
      <div style={{
        border: '2px dashed rgba(138, 85, 247, 0.3)',
        borderRadius: '16px',
        padding: '60px 20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(138, 85, 247, 0.3)')}
      >
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📁</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px' }}>Upload your tracks</h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Drag and drop or click to browse files</p>
      </div>
      <button className="ads-btn ads-btn-primary" style={{ marginTop: '30px', width: '100%' }}>
        Start Creating
      </button>
    </div>
  );
};
