import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { cart, clear, removeItem, getTotalPrice } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    });
  };

  if (cart.length === 0) {
    return (
      <div style={{
        backgroundColor: '#87c3bd',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#333',
          marginBottom: '20px'
        }}>
          Tu carrito está vacío
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          marginBottom: '30px'
        }}>
          ¡Agrega productos para comenzar tu compra!
        </p>
        <Link
          to="/"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '15px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#87c3bd',
      minHeight: '80vh',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#333',
            margin: 0
          }}>
            Tu Carrito
          </h2>
          <button
            onClick={clear}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
          >
            Vaciar carrito
          </button>
        </div>

        <div style={{ marginBottom: '30px' }}>
          {cart.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              onRemove={removeItem}
            />
          ))}
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '2px solid #ddd'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              margin: 0,
              color: '#333'
            }}>
              Total:
            </h3>
            <p style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#28a745',
              margin: 0
            }}>
              {formatPrice(getTotalPrice())}
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '15px'
          }}>
            <Link
              to="/"
              style={{
                flex: 1,
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              Seguir comprando
            </Link>
            <Link
              to="/checkout"
              style={{
                flex: 1,
                backgroundColor: '#28a745',
                color: 'white',
                padding: '15px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;