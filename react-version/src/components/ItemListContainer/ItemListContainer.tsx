import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { getProducts, getProductsByCategory } from '../../services/productService';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
}

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { categoryId } = useParams<{ categoryId: string }>();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let productsData: Product[];
        
        if (categoryId) {
          productsData = await getProductsByCategory(categoryId);
        } else {
          productsData = await getProducts();
        }
        
        setProducts(productsData);
      } catch (err) {
        setError('Error al cargar los productos. Inténtalo de nuevo.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  const getCategoryTitle = () => {
    if (!categoryId) return greeting;
    
    switch (categoryId.toLowerCase()) {
      case 'equipajes':
        return 'Equipajes y Valijas';
      case 'accesorios':
        return 'Accesorios de Viaje';
      case 'ofertas':
        return 'Ofertas Especiales';
      case 'quienes-somos':
        return '¿Quiénes Somos?';
      default:
        return `Productos - ${categoryId}`;
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #87c3bd',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px', color: '#666' }}>Cargando productos...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#d32f2f'
      }}>
        <h2>¡Oops! Algo salió mal</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#87c3bd',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#87c3bd' }}>
      <div style={{
        textAlign: 'center',
        padding: '40px 20px 20px 20px',
        backgroundColor: '#87c3bd'
      }}>
        <h1 style={{
          fontSize: '32px',
          color: '#333',
          margin: '0',
          fontFamily: 'Inconsolata, monospace'
        }}>
          {getCategoryTitle()}
        </h1>
        
        {categoryId === 'quienes-somos' && (
          <div style={{
            maxWidth: '800px',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            textAlign: 'left'
          }}>
            <p>
              En CALIGO somos especialistas en equipajes y accesorios de viaje. 
              Desde hace años acompañamos a nuestros clientes en sus aventuras, 
              ofreciendo productos de calidad y un servicio excepcional.
            </p>
            <p>
              Nuestra misión es hacer que cada viaje sea más cómodo, organizado y seguro. 
              Por eso seleccionamos cuidadosamente cada producto, pensando en las 
              necesidades reales de los viajeros.
            </p>
          </div>
        )}
      </div>

      {categoryId !== 'quienes-somos' && (
        <ItemList products={products} />
      )}
      
      {products.length === 0 && !loading && categoryId !== 'quienes-somos' && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666'
        }}>
          <h3>No encontramos productos en esta categoría</h3>
          <p>Te invitamos a explorar otras secciones de nuestra tienda.</p>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;