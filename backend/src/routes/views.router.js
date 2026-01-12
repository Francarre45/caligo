import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import CartManager from '../managers/CartManager.js';

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/', async (req, res) => {
  res.redirect('/products');
});

router.get('/home', async (req, res) => {
  try {
    const result = await productManager.getProducts({ limit: 100 });
    res.render('home', { products: result.payload });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar productos',
      error: error.message
    });
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const result = await productManager.getProducts({ limit: 100 });
    res.render('realTimeProducts', { products: result.payload });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar productos',
      error: error.message
    });
  }
});

router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    
    const result = await productManager.getProducts({
      limit,
      page,
      sort,
      query
    });

    res.render('products', {
      products: result.payload,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar productos',
      error: error.message
    });
  }
});

router.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

    if (!product) {
      return res.status(404).render('error', {
        message: 'Producto no encontrado'
      });
    }

    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar producto',
      error: error.message
    });
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);

    if (!cart) {
      return res.status(404).render('error', {
        message: 'Carrito no encontrado'
      });
    }

    res.render('cart', { 
      cart,
      cartId: cid
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar carrito',
      error: error.message
    });
  }
});

export default router;