import React, { useState } from 'react';

interface ItemCountProps {
  stock: number;
  initial?: number;
  onAdd: (quantity: number) => void;
}

const ItemCount: React.FC<ItemCountProps> = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (count > 0 && count <= stock) {
      onAdd(count);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        padding: '10px 20px',
        backgroundColor: 'white'
      }}>
        <button
          onClick={handleDecrement}
          disabled={count <= 1}
          style={{
            backgroundColor: count <= 1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            fontSize: '20px',
            cursor: count <= 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (count > 1) e.currentTarget.style.backgroundColor = '#0056b3';
          }}
          onMouseLeave={(e) => {
            if (count > 1) e.currentTarget.style.backgroundColor = '#007bff';
          }}
        >
          -
        </button>

        <span style={{
          fontSize: '24px',
          fontWeight: 'bold',
          minWidth: '40px',
          textAlign: 'center',
          color: '#333'
        }}>
          {count}
        </span>

        <button
          onClick={handleIncrement}
          disabled={count >= stock}
          style={{
            backgroundColor: count >= stock ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            fontSize: '20px',
            cursor: count >= stock ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (count < stock) e.currentTarget.style.backgroundColor = '#0056b3';
          }}
          onMouseLeave={(e) => {
            if (count < stock) e.currentTarget.style.backgroundColor = '#007bff';
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={stock === 0}
        style={{
          backgroundColor: stock === 0 ? '#ccc' : '#28a745',
          color: 'white',
          padding: '15px 40px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: stock === 0 ? 'not-allowed' : 'pointer',
          width: '100%',
          maxWidth: '300px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (stock > 0) e.currentTarget.style.backgroundColor = '#218838';
        }}
        onMouseLeave={(e) => {
          if (stock > 0) e.currentTarget.style.backgroundColor = '#28a745';
        }}
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>

      {stock > 0 && stock <= 5 && (
        <p style={{
          fontSize: '14px',
          color: '#dc3545',
          margin: 0
        }}>
          ¡Solo quedan {stock} unidades!
        </p>
      )}
    </div>
  );
};

export default ItemCount;