import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          {/* Ruta principal - todos los productos */}
          <Route 
            path="/" 
            element={<ItemListContainer greeting="¡Bienvenido a CALIGO! Tu próxima aventura comienza aquí" />} 
          />
          
          {/* Ruta para categorías */}
          <Route 
            path="/category/:categoryId" 
            element={<ItemListContainer greeting="Explora nuestra selección por categoría" />} 
          />
          
          {/* Ruta para detalle de producto */}
          <Route 
            path="/item/:itemId" 
            element={<ItemDetailContainer />} 
          />
          
          {/* Ruta 404 temporal */}
          <Route 
            path="*" 
            element={
              <div style={{padding: '40px', textAlign: 'center'}}>
                <h2>Página no encontrada 404</h2>
                <p>La página que buscas no existe.</p>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;