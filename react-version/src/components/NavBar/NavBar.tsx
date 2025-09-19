import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h1 style={{ margin: 0, fontFamily: 'Inconsolata, monospace' }}>CALIGO</h1>
        </Link>
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
            <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/category/quienes-somos" style={{ color: 'black', textDecoration: 'none' }}>
              ¿Quiénes somos?
            </Link>
          </li>
          <li>
            <Link to="/category/equipajes" style={{ color: 'black', textDecoration: 'none' }}>
              Equipajes
            </Link>
          </li>
          <li>
            <Link to="/category/accesorios" style={{ color: 'black', textDecoration: 'none' }}>
              Accesorios
            </Link>
          </li>
          <li>
            <Link to="/category/ofertas" style={{ color: 'black', textDecoration: 'none' }}>
              Ofertas
            </Link>
          </li>
        </ul>
      </nav>
      
      <CartWidget />
    </header>
  );
};

export default NavBar;