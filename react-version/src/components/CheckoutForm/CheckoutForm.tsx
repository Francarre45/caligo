import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useCart } from '../../context/CartContext';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
}

const CheckoutForm: React.FC = () => {
  const { cart, getTotalPrice, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es requerida';
    if (!formData.codigoPostal.trim()) newErrors.codigoPostal = 'El código postal es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const order = {
        buyer: formData,
        items: cart.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          quantity: item.quantity
        })),
        total: getTotalPrice(),
        date: Timestamp.now()
      };

      const ordersCollection = collection(db, 'orders');
      const docRef = await addDoc(ordersCollection, order);
      
      setOrderId(docRef.id);
      clear();
    } catch (error) {
      console.error('Error al crear la orden:', error);
      alert('Hubo un error al procesar tu compra. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    });
  };

  if (orderId) {
    return (
      <div style={{
        backgroundColor: '#87c3bd',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px'
          }}>
            ✅
          </div>
          <h2 style={{
            fontSize: '2rem',
            color: '#28a745',
            marginBottom: '20px'
          }}>
            ¡Compra realizada con éxito!
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '10px'
          }}>
            Tu número de orden es:
          </p>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '30px',
            wordBreak: 'break-all'
          }}>
            {orderId}
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#666',
            marginBottom: '30px'
          }}>
            Recibirás un email de confirmación en breve.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '15px 40px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#87c3bd',
      minHeight: '80vh',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2rem',
          color: '#333',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Finalizar Compra
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              color: '#333'
            }}>
              Datos de contacto
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.nombre ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.nombre && (
                  <span style={{ color: '#dc3545', fontSize: '12px' }}>
                    {errors.nombre}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.email ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.email && (
                  <span style={{ color: '#dc3545', fontSize: '12px' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.telefono ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.telefono && (
                  <span style={{ color: '#dc3545', fontSize: '12px' }}>
                    {errors.telefono}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Dirección *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.direccion ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.direccion && (
                  <span style={{ color: '#dc3545', fontSize: '12px' }}>
                    {errors.direccion}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Ciudad *
                </label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.ciudad ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.ciudad && (
                  <span style={{ color: '#dc3545', fontSize: '12px' }}>
                    {errors.ciudad}
                  </span>
                )}
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Código Postal *
                </label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.codigoPostal ? '2px solid #dc3545' : '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.codigoPostal && (
                  <span style={{ color: '#dc3545', fontSize: '12px' }}>
                    {errors.codigoPostal}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: loading ? '#ccc' : '#28a745',
                  color: 'white',
                  padding: '15px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#218838';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#28a745';
                }}
              >
                {loading ? 'Procesando...' : 'Confirmar compra'}
              </button>
            </form>
          </div>

          <div>
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#333'
              }}>
                Resumen de compra
              </h3>

              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  paddingBottom: '15px',
                  borderBottom: '1px solid #ddd'
                }}>
                  <div>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                      {item.nombre}
                    </p>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>
                    {formatPrice(item.precio * item.quantity)}
                  </p>
                </div>
              ))}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '2px solid #333'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Total:</h3>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#28a745' }}>
                  {formatPrice(getTotalPrice())}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;