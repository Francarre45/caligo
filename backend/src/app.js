import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

connectDB();

app.engine('handlebars', engine({
  helpers: {
    multiply: (a, b) => a * b,
    calculateTotal: (products) => {
      return products.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    }
  }
}));
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
        addProduct: 'POST /api/carts/:cid/product/:pid',
        removeProduct: 'DELETE /api/carts/:cid/products/:pid',
        updateCart: 'PUT /api/carts/:cid',
        updateQuantity: 'PUT /api/carts/:cid/products/:pid',
        clearCart: 'DELETE /api/carts/:cid'
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

  socket.on('addProduct', async (productData) => {
    try {
      const newProduct = await productManager.addProduct(productData);
      const products = await productManager.getProducts({ limit: 100 });
      io.emit('updateProducts', products.payload);
    } catch (error) {
      socket.emit('productError', { message: error.message });
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      const products = await productManager.getProducts({ limit: 100 });
      io.emit('updateProducts', products.payload);
    } catch (error) {
      socket.emit('productError', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

export default app;