import React from 'react';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <header style={{
      backgroundColor: '#fdf2d9',
      color: 'black',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 30px',
      flexWrap: 'wrap',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/logo192.png" 
          alt="logo CALIGO" 
          style={{ width: '60px', height: '60px', marginRight: '15px' }}
        />
        <h1 style={{ 
          margin: 0, 
          fontFamily: 'Inconsolata, monospace',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          CALIGO
        </h1>
      </div>
      
      <nav>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          margin: 0,
          padding: 0,
          gap: '30px'
        }}>
          <li>
            <a href="#" style={{ 
              color: 'black', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.3s ease'
            }}>
              🏠 Inicio
            </a>
          </li>
          <li>
            <a href="#" style={{ 
              color: 'black', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.3s ease'
            }}>
              👥 ¿Quiénes somos?
            </a>
          </li>
          <li>
            <a href="#" style={{ 
              color: 'black', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.3s ease'
            }}>
              🧳 Equipajes
            </a>
          </li>
          <li>
            <a href="#" style={{ 
              color: 'black', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.3s ease'
            }}>
              💎 Accesorios
            </a>
          </li>
          <li>
            <a href="#" style={{ 
              color: 'black', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.3s ease'
            }}>
              🏷️ Ofertas
            </a>
          </li>
        </ul>
      </nav>
      
      <CartWidget />
    </header>
  );
};

export default NavBar;