import React from 'react';

const CartWidget = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      cursor: 'pointer'
    }}>
      <span style={{ 
        fontSize: '1.5rem', 
        marginRight: '8px' 
      }}>
        🛒
      </span>
      <span style={{ 
        backgroundColor: '#87c3bd', 
        color: 'white', 
        borderRadius: '50%', 
        padding: '4px 8px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        minWidth: '20px',
        textAlign: 'center'
      }}>
        3
      </span>
    </div>
  );
};

export default CartWidget;