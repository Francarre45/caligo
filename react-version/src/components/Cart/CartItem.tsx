import React from 'react';
import { Product } from '../../types/product';

interface CartItemProps {
  item: Product & { quantity: number };
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    });
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '15px'
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '10px'
      }}>
        <img 
          src={item.imagen} 
          alt={item.nombre}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '18px',
          color: '#333',
          fontWeight: 'bold'
        }}>
          {item.nombre}
        </h3>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#666'
        }}>
          Cantidad: {item.quantity}
        </p>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: '#666'
        }}>
          Precio unitario: {formatPrice(item.precio)}
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px'
      }}>
        <p style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#28a745'
        }}>
          {formatPrice(item.precio * item.quantity)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;