import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route 
              path="/" 
              element={<ItemListContainer greeting="¡Bienvenido a CALIGO! Tu próxima aventura comienza aquí" />} 
            />
            
            <Route 
              path="/productos" 
              element={<ItemListContainer greeting="Todos nuestros productos" />} 
            />
            
            <Route 
              path="/categoria/:categoryId" 
              element={<ItemListContainer greeting="Productos por categoría" />} 
            />
            
            <Route 
              path="/item/:id" 
              element={<ItemDetailContainer />} 
            />
            
            <Route 
              path="/cart" 
              element={<Cart />} 
            />
            
            <Route 
              path="/checkout" 
              element={<CheckoutForm />} 
            />
            
            <Route 
              path="*" 
              element={
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <h2>404 - Página no encontrada</h2>
                  <p>La página que buscas no existe.</p>
                  <a href="/" style={{ color: '#87c3bd' }}>Volver al inicio</a>
                </div>
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;