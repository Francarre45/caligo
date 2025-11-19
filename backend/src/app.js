import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: '🛍️ Bienvenido al Backend de CALIGO',
    endpoints: {
      products: {
        getAll: 'GET /api/products',
        getById: 'GET /api/products/:pid',
        create: 'POST /api/products',
        update: 'PUT /api/products/:pid',
        delete: 'DELETE /api/products/:pid'
      },
      carts: {
        create: 'POST /api/carts',
        getById: 'GET /api/carts/:cid',
        addProduct: 'POST /api/carts/:cid/product/:pid'
      }
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    error: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`📦 Productos API: http://localhost:${PORT}/api/products`);
  console.log(`🛒 Carritos API: http://localhost:${PORT}/api/carts`);
});

export default app;
