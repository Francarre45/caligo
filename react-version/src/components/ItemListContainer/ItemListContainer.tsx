import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
}

interface ProductData {
  equipajes: Product[];
  accesorios: Product[];
}

interface Props {
  greeting: string;
}

const ItemListContainer: React.FC<Props> = ({ greeting }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getProducts = (): Promise<ProductData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const productData: ProductData = {
          equipajes: [
            {
              id: 1,
              nombre: "Valija Gris amayra - Tamaño Grande",
              precio: 89990,
              imagen: "/assets/img/Valija Amayra Gris.webp",
              categoria: "equipajes",
              descripcion: "Valija rígida de gran tamaño con ruedas giratorias 360°"
            },
            {
              id: 2,
              nombre: "Carry on Tourister negro",
              precio: 65990,
              imagen: "/assets/img/Carry on Tourister Negro.webp",
              categoria: "carry-on",
              descripcion: "Equipaje de cabina con compartimentos organizadores"
            },
            {
              id: 3,
              nombre: "Valija Discovery celeste",
              precio: 75990,
              imagen: "/assets/img/Valija Discovery Celeste.webp",
              categoria: "equipajes",
              descripcion: "Valija expandible con cierre TSA incluido"
            },
            {
              id: 4,
              nombre: "Carry on Wanderlust gris",
              precio: 58990,
              imagen: "/assets/img/Carry on Wanderlust Gris.webp",
              categoria: "carry-on",
              descripcion: "Maleta de cabina ultraliviana para viajes frecuentes"
            },
            {
              id: 5,
              nombre: "Valija check in hard negra",
              precio: 95990,
              imagen: "/assets/img/Valija chek in hard negra.webp",
              categoria: "equipajes",
              descripcion: "Valija de gran resistencia para viajes largos"
            },
            {
              id: 6,
              nombre: "Mochila discovery Negra",
              precio: 42990,
              imagen: "/assets/img/Mochi Discovery Negra.webp",
              categoria: "mochilas",
              descripcion: "Mochila urbana con compartimento para laptop"
            }
          ],
          accesorios: [
            {
              id: 7,
              nombre: "Agenda Mooving Negra",
              precio: 15990,
              imagen: "/assets/img/AGENDA MOOVING DIARIA NEGRA .jpg",
              categoria: "agenda",
              descripcion: "Agenda diaria para organizar tus viajes"
            },
            {
              id: 8,
              nombre: "Botella contigo Celeste",
              precio: 25990,
              imagen: "/assets/img/Botella Contigo Celeste.webp",
              categoria: "botellas",
              descripcion: "Botella térmica para mantener temperatura"
            },
            {
              id: 9,
              nombre: "Candado Tsa azul",
              precio: 8990,
              imagen: "/assets/img/Candado TSA azul.webp",
              categoria: "candados",
              descripcion: "Candado de seguridad con combinación TSA"
            },
            {
              id: 10,
              nombre: "Neceser xtreme Voyager gris",
              precio: 32990,
              imagen: "/assets/img/Neceser Xtreme Voyager gris.webp",
              categoria: "neceser",
              descripcion: "Organizador de artículos de higiene personal"
            }
          ]
        };
        resolve(productData);
      }, 1000);
    });
  };

  useEffect(() => {
    setLoading(true);
    
    getProducts().then((data) => {
      let filteredProducts: Product[] = [];

      if (!categoryId) {
        filteredProducts = [...data.equipajes, ...data.accesorios];
      } else if (categoryId === 'equipajes') {
        filteredProducts = data.equipajes;
      } else if (categoryId === 'accesorios') {
        filteredProducts = data.accesorios;
      } else {
        filteredProducts = [...data.equipajes, ...data.accesorios];
      }

      setProducts(filteredProducts);
      setLoading(false);
    });
  }, [categoryId]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Cargando productos...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#87c3bd', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        {greeting}
      </h2>
      
      {categoryId && (
        <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
          Categoría: {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
        </h3>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '2px solid black',
              borderRadius: '8px',
              backgroundColor: 'white',
              padding: '15px',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <img
              src={product.imagen}
              alt={product.nombre}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
                marginBottom: '10px'
              }}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/200x200/87c3bd/000000?text=CALIGO';
              }}
            />
            <h4 style={{ margin: '10px 0', fontSize: '16px' }}>{product.nombre}</h4>
            <p style={{ color: '#666', fontSize: '14px', margin: '10px 0' }}>
              {product.descripcion}
            </p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              ${product.precio.toLocaleString()}
            </p>
            <Link 
              to={`/item/${product.id}`}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                width: 'auto',
                textDecoration: 'none',
                display: 'inline-block',
                textAlign: 'center',
                margin: '10px auto 0 auto'
              }}
            >
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;