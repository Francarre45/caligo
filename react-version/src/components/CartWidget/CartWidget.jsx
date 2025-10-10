import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalItems = getTotalQuantity();

  return (
    <Link 
      to="/cart"
      style={{ 
        display: 'flex', 
        alignItems: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        position: 'relative'
      }}
    >
      <span style={{ 
        fontSize: '1.5rem', 
        marginRight: '8px' 
      }}>
        🛒
      </span>
      {totalItems > 0 && (
        <span style={{ 
          backgroundColor: '#dc3545', 
          color: 'white', 
          borderRadius: '50%', 
          padding: '4px 8px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          minWidth: '20px',
          textAlign: 'center',
          position: 'absolute',
          top: '-5px',
          right: '-10px'
        }}>
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;