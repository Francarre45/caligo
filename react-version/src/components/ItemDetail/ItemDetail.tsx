import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

interface ItemDetailProps {
  product: Product;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    });
  };

  const handleOnAdd = (quantity: number) => {
    setQuantityAdded(quantity);
    addItem(product, quantity);
  };

  return (
    <div style={{
      backgroundColor: '#87c3bd',
      minHeight: '80vh',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '900px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
      }}>
        <div style={{
          flex: '1',
          padding: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <img 
            src={product.imagen} 
            alt={product.nombre}
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'contain'
            }}
          />
        </div>

        <div style={{
          flex: '1',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#333'
          }}>
            {product.nombre}
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            {product.descripcion}
          </p>

          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#28a745',
            marginBottom: '20px'
          }}>
            {formatPrice(product.precio)}
          </div>

          {product.stock !== undefined && (
            <p style={{
              fontSize: '14px',
              color: product.stock > 0 ? '#28a745' : '#dc3545',
              marginBottom: '20px'
            }}>
              {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
            </p>
          )}

          {quantityAdded > 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#28a745',
                fontWeight: 'bold',
                margin: 0
              }}>
                ✓ Agregaste {quantityAdded} {quantityAdded === 1 ? 'unidad' : 'unidades'} al carrito
              </p>
              <Link 
                to="/cart"
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                Ir al carrito
              </Link>
              <Link 
                to="/"
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
              >
                Seguir comprando
              </Link>
            </div>
          ) : (
            <ItemCount 
              stock={product.stock || 0} 
              initial={1} 
              onAdd={handleOnAdd} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;