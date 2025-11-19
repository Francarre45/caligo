import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

// POST / - Crear nuevo carrito
router.post('/', (req, res) => {
  try {
    const newCart = cartManager.createCart();

    res.status(201).json({
      status: 'success',
      message: 'Carrito creado exitosamente',
      payload: newCart
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al crear carrito',
      error: error.message
    });
  }
});

// GET /:cid - Obtener productos de un carrito
router.get('/:cid', (req, res) => {
  try {
    const { cid } = req.params;
    const cart = cartManager.getCartById(cid);

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: `Carrito con ID "${cid}" no encontrado`
      });
    }

    res.status(200).json({
      status: 'success',
      payload: cart
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener carrito',
      error: error.message
    });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = cartManager.addProductToCart(cid, pid);

    res.status(200).json({
      status: 'success',
      message: 'Producto agregado al carrito exitosamente',
      payload: updatedCart
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al agregar producto al carrito',
      error: error.message
    });
  }
});

export default router;
