import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  // Estilos para los enlaces
  const linkStyle = {
    color: 'black',
    textDecoration: 'none' as const,
    padding: '10px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease'
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = '#87c3bd';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

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
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontFamily: 'Inconsolata, monospace', color: 'black' }}>CALIGO</h1>
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
            <Link 
              to="/" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/categoria/quienes-somos" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              ¿Quiénes somos?
            </Link>
          </li>
          <li>
            <Link 
              to="/categoria/equipajes" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Equipajes
            </Link>
          </li>
          <li>
            <Link 
              to="/categoria/accesorios" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Accesorios
            </Link>
          </li>
          <li>
            <Link 
              to="/categoria/ofertas" 
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
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