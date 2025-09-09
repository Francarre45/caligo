import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartWidget = () => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: '#f0f0f0'
      }
    }}>
      <FaShoppingCart 
        style={{ 
          fontSize: '1.5rem', 
          marginRight: '8px',
          color: '#333'
        }} 
      />
      <span style={{ 
        backgroundColor: '#87c3bd', 
        color: 'white', 
        borderRadius: '50%', 
        padding: '4px 8px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        minWidth: '20px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        3
      </span>
    </div>
  );
};

export default CartWidget;