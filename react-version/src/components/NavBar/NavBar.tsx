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
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/logo192.png" 
          alt="logo CALIGO" 
          style={{ width: '60px', height: '60px', marginRight: '15px' }}
        />
        <h1 style={{ margin: 0, fontFamily: 'Inconsolata, monospace' }}>CALIGO</h1>
      </div>
      
      <nav>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          margin: 0,
          padding: 0,
          gap: '30px'
        }}>
          <li><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Inicio</a></li>
          <li><a href="#" style={{ color: 'black', textDecoration: 'none' }}>¿Quiénes somos?</a></li>
          <li><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Equipajes</a></li>
          <li><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Accesorios</a></li>
          <li><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Ofertas</a></li>
        </ul>
      </nav>
      
      <CartWidget />
    </header>
  );
};

export default NavBar;