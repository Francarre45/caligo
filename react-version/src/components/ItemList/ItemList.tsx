import React from 'react';
import Item from '../Item/Item';
import { Product } from '../../types/product';

interface ItemListProps {
  products: Product[];
}

const ItemList: React.FC<ItemListProps> = ({ products }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {products.map((product) => (
        <Item 
          key={product.id} 
          product={product} 
        />
      ))}
    </div>
  );
};

export default ItemList;