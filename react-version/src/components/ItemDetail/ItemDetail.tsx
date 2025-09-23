import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
}

interface ItemDetailProps {
  product: Product;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#87c3bd',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            flex: '1',
            minWidth: '300px'
          }}>
            <img 
              src={product.imagen}
              alt={product.nombre}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'contain',
                border: '2px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            />
          </div>
          
          <div style={{
            flex: '1',
            minWidth: '300px'
          }}>
            <h1>{product.nombre}</h1>
            <p>{product.descripcion}</p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#87c3bd' }}>
              {formatPrice(product.precio)}
            </div>
            
            <button style={{
              backgroundColor: '#87c3bd',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '8px',
              marginRight: '15px'
            }}>
              Agregar al carrito
            </button>
            
            <Link to="/" style={{
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              padding: '15px 30px',
              borderRadius: '8px'
            }}>
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;