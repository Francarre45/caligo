import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Tipos TypeScript
interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
}

const ItemDetailContainer: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Simulamos obtener un producto específico por ID
  const getProductById = (id: string): Promise<Product | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Datos de productos (mismos que en ItemListContainer)
        const allProducts: Product[] = [
          {
            id: 1,
            nombre: "Valija Gris amayra - Tamaño Grande",
            precio: 89990,
            imagen: "/assets/img/Valija Amayra Gris.webp",
            categoria: "equipajes",
            descripcion: "Valija rígida de gran tamaño con ruedas giratorias 360°. Perfecta para viajes largos, cuenta con compartimentos organizadores internos, ruedas giratorias de alta resistencia y cierre de seguridad TSA. Material resistente a impactos y garantía de 2 años."
          },
          {
            id: 2,
            nombre: "Carry on Tourister negro",
            precio: 65990,
            imagen: "/assets/img/Carry on Tourister Negro.webp",
            categoria: "carry-on",
            descripcion: "Equipaje de cabina con compartimentos organizadores. Cumple con todas las regulaciones de aerolíneas internacionales. Diseño elegante y funcional con múltiples bolsillos externos e internos para máxima organización."
          },
          {
            id: 3,
            nombre: "Valija Discovery celeste",
            precio: 75990,
            imagen: "/assets/img/Valija Discovery Celeste.webp",
            categoria: "equipajes",
            descripcion: "Valija expandible con cierre TSA incluido. Capacidad expandible hasta 20% adicional. Material ultra resistente con superficie anti-rayones. Sistema de ruedas silenciosas y asa telescópica reforzada."
          },
          {
            id: 4,
            nombre: "Carry on Wanderlust gris",
            precio: 58990,
            imagen: "/assets/img/Carry on Wanderlust Gris.webp",
            categoria: "carry-on",
            descripcion: "Maleta de cabina ultraliviana para viajes frecuentes. Peso reducido sin comprometer resistencia. Compartimento especial para laptop y documentos. Ideal para viajeros de negocios."
          },
          {
            id: 5,
            nombre: "Valija check in hard negra",
            precio: 95990,
            imagen: "/assets/img/Valija chek in hard negra.webp",
            categoria: "equipajes",
            descripcion: "Valija de gran resistencia para viajes largos. Carcasa rígida ultra resistente. Sistema de compresión interno para maximizar espacio. Ruedas dobles giratorias 360° de alta durabilidad."
          },
          {
            id: 6,
            nombre: "Mochila discovery Negra",
            precio: 42990,
            imagen: "/assets/img/Mochi Discovery Negra.webp",
            categoria: "mochilas",
            descripcion: "Mochila urbana con compartimento para laptop. Diseño ergonómico con respaldo acolchado. Compartimento acolchado para laptop hasta 15.6'. Múltiples bolsillos organizadores y material resistente al agua."
          },
          {
            id: 7,
            nombre: "Agenda Mooving Negra",
            precio: 15990,
            imagen: "/assets/img/AGENDA MOOVING DIARIA NEGRA .jpg",
            categoria: "agenda",
            descripcion: "Agenda diaria para organizar tus viajes. Formato compacto ideal para llevar en cualquier equipaje. Secciones especiales para itinerarios, contactos y notas de viaje. Papel de alta calidad."
          },
          {
            id: 8,
            nombre: "Botella contigo Celeste",
            precio: 25990,
            imagen: "/assets/img/Botella Contigo Celeste.webp",
            categoria: "botellas",
            descripcion: "Botella térmica para mantener temperatura. Mantiene líquidos fríos hasta 24 horas y calientes hasta 12 horas. Material de acero inoxidable libre de BPA. Tapa a prueba de derrames."
          },
          {
            id: 9,
            nombre: "Candado Tsa azul",
            precio: 8990,
            imagen: "/assets/img/Candado TSA azul.webp",
            categoria: "candados",
            descripcion: "Candado de seguridad con combinación TSA. Aprobado por autoridades de seguridad aeroportuaria. Combinación de 3 dígitos fácil de configurar. Material resistente a corrosión."
          },
          {
            id: 10,
            nombre: "Neceser xtreme Voyager gris",
            precio: 32990,
            imagen: "/assets/img/Neceser Xtreme Voyager gris.webp",
            categoria: "neceser",
            descripcion: "Organizador de artículos de higiene personal. Múltiples compartimentos con cierre impermeable. Gancho para colgar en baños. Material resistente al agua y fácil de limpiar."
          }
        ];

        const foundProduct = allProducts.find(p => p.id === parseInt(id));
        resolve(foundProduct || null);
      }, 800);
    });
  };

  useEffect(() => {
    if (itemId) {
      setLoading(true);
      getProductById(itemId).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [itemId]);

  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      alert(`¡${product.nombre} agregado al carrito!\nCantidad: ${quantity}\nTotal: $${(product.precio * quantity).toLocaleString()}`);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#87c3bd', minHeight: '100vh' }}>
        <h2>Cargando producto...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#87c3bd', minHeight: '100vh' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#87c3bd', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ color: '#333', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 10px', color: '#666' }}>/</span>
          <Link to={`/category/${product.categoria}`} style={{ color: '#333', textDecoration: 'none' }}>
            {product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)}
          </Link>
          <span style={{ margin: '0 10px', color: '#666' }}>/</span>
          <span style={{ color: '#666' }}>{product.nombre}</span>
        </nav>

        {/* Contenido principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          border: '2px solid black'
        }}>
          {/* Imagen del producto */}
          <div style={{ textAlign: 'center' }}>
            <img
              src={product.imagen}
              alt={product.nombre}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: '400px',
                objectFit: 'contain',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px'
              }}
            />
          </div>

          {/* Información del producto */}
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '15px', color: '#333' }}>
              {product.nombre}
            </h1>
            
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff', marginBottom: '20px' }}>
              ${product.precio.toLocaleString()}
            </p>

            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', marginBottom: '30px' }}>
              {product.descripcion}
            </p>

            {/* Contador de cantidad */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                Cantidad:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  -
                </button>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  minWidth: '30px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Total y botón agregar */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
                Total: ${(product.precio * quantity).toLocaleString()}
              </p>
              <button
                onClick={handleAddToCart}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                Agregar al carrito
              </button>
            </div>

            {/* Información adicional */}
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '4px',
              fontSize: '14px',
              color: '#666'
            }}>
              <p><strong>Categoría:</strong> {product.categoria}</p>
              <p><strong>Código:</strong> CAL-{product.id.toString().padStart(4, '0')}</p>
              <p><strong>Envío:</strong> Gratis en CABA y GBA</p>
              <p><strong>Garantía:</strong> 12 meses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;