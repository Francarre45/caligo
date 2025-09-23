import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          {/* Ruta principal - todos los productos */}
          <Route 
            path="/" 
            element={<ItemListContainer greeting="¡Bienvenido a CALIGO! Tu próxima aventura comienza aquí" />} 
          />
          
          {/* Ruta para mostrar todos los productos */}
          <Route 
            path="/productos" 
            element={<ItemListContainer greeting="Todos nuestros productos" />} 
          />
          
          {/* Ruta para categorías específicas */}
          <Route 
            path="/categoria/:categoryId" 
            element={<ItemListContainer greeting="Productos por categoría" />} 
          />
          
          {/* Ruta para detalle de producto */}
          <Route 
            path="/item/:id" 
            element={<ItemDetailContainer />} 
          />
          
          {/* Ruta 404 - página no encontrada */}
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
  );
}

export default App;