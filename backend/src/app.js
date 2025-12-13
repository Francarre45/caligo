import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.get('/api', (req, res) => {
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

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    error: err.message
  });
});

const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`📦 Productos API: http://localhost:${PORT}/api/products`);
  console.log(`🛒 Carritos API: http://localhost:${PORT}/api/carts`);
  console.log(`🏠 Vista Home: http://localhost:${PORT}/home`);
  console.log(`⚡ Vista Real Time: http://localhost:${PORT}/realtimeproducts`);
});

const io = new Server(httpServer);

app.set('io', io);

const productManager = new ProductManager();

io.on('connection', (socket) => {
  console.log('✅ Nuevo cliente conectado:', socket.id);

  socket.on('addProduct', (productData) => {
    try {
      const newProduct = productManager.addProduct(productData);
      const products = productManager.getProducts();
      io.emit('updateProducts', products);
    } catch (error) {
      socket.emit('productError', { message: error.message });
    }
  });

  socket.on('deleteProduct', (productId) => {
    try {
      productManager.deleteProduct(productId);
      const products = productManager.getProducts();
      io.emit('updateProducts', products);
    } catch (error) {
      socket.emit('productError', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

export default app;