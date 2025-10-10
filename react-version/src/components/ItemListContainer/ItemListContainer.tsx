import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { getProducts, getProductsByCategory } from '../../services/productService';
import { Product } from '../../types/product';

interface ItemListContainerProps {
  greeting?: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productsData: Product[];

        if (categoryId) {
          productsData = await getProductsByCategory(categoryId);
        } else {
          productsData = await getProducts();
        }

        setProducts(productsData);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <main style={{ 
        backgroundColor: '#87c3bd',
        minHeight: '80vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#333' }}>Cargando productos...</h2>
      </main>
    );
  }

  return (
    <main style={{ 
      backgroundColor: '#87c3bd',
      minHeight: '80vh',
      padding: '40px 20px',
      fontFamily: 'Inconsolata, monospace'
    }}>
      <section style={{ 
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          color: '#333',
          marginBottom: '30px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          {greeting}
        </h2>
        
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#333' }}>
            No hay productos disponibles
          </p>
        ) : (
          <ItemList products={products} />
        )}
      </section>
    </main>
  );
};

export default ItemListContainer;