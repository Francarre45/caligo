import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/home', (req, res) => {
  try {
    const products = productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar productos',
      error: error.message
    });
  }
});

router.get('/realtimeproducts', (req, res) => {
  try {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar productos',
      error: error.message
    });
  }
});

export default router;