import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getProductById } from '../../services/productService';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
}

const ItemDetailContainer: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError('Producto no encontrado');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px'
      }}>
        <h2>Producto no encontrado</h2>
        <p>{error}</p>
      </div>
    );
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;