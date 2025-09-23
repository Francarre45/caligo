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

interface ItemProps {
  product: Product;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    });
  };

  return (
    <div style={{
      border: '2px solid black',
      borderRadius: '8px',
      backgroundColor: '#87c3bd',
      width: '320px',
      height: '480px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{
        backgroundColor: 'white',
        height: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        borderBottom: '1px solid #ddd'
      }}>
        <img 
          src={product.imagen} 
          alt={product.nombre}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
      
      <div style={{ 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#87c3bd'
      }}>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: 'black',
            lineHeight: '1.3',
            textAlign: 'center'
          }}>
            {product.nombre}
          </h3>
          
          <p style={{
            fontSize: '14px',
            color: '#333',
            margin: '0 0 15px 0',
            lineHeight: '1.4',
            textAlign: 'center'
          }}>
            {product.descripcion}
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'black',
            marginBottom: '15px'
          }}>
            {formatPrice(product.precio)}
          </div>
          
          <Link 
            to={`/item/${product.id}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;