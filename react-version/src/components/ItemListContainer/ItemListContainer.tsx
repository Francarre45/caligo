import React from 'react';

interface ItemListContainerProps {
  greeting: string;
}

const ItemListContainer = ({ greeting }: ItemListContainerProps) => {
  return (
    <main style={{ 
      backgroundColor: '#87c3bd',
      minHeight: '80vh',
      padding: '40px 20px',
      fontFamily: 'Inconsolata, monospace'
    }}>
      <section style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '2rem', 
          color: '#333',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>
          {greeting}
        </h2>
        
        <p style={{ 
          color: '#333', 
          lineHeight: '1.6', 
          fontSize: '1.1rem',
          marginBottom: '40px',
          textAlign: 'justify',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          En nuestro local vas a encontrar todo lo que necesitás para viajar cómodo, 
          organizado y con estilo. Tenemos valijas de todos los tamaños, desde las más 
          compactas para escapadas cortas, hasta las más grandes para esos viajes soñados. 
          También contamos con una gran variedad de mochilas, ideales para el día a día, 
          paseos o aventuras más intensas.
        </p>
      </section>
    </main>
  );
};

export default ItemListContainer;