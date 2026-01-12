import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();

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

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);

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

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(cid, pid);

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

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.removeProductFromCart(cid, pid);

    res.status(200).json({
      status: 'success',
      message: 'Producto eliminado del carrito exitosamente',
      payload: updatedCart
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al eliminar producto del carrito',
      error: error.message
    });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'El campo "products" debe ser un array'
      });
    }

    const updatedCart = await cartManager.updateCart(cid, products);

    res.status(200).json({
      status: 'success',
      message: 'Carrito actualizado exitosamente',
      payload: updatedCart
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar carrito',
      error: error.message
    });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'La cantidad debe ser un número mayor a 0'
      });
    }

    const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);

    res.status(200).json({
      status: 'success',
      message: 'Cantidad actualizada exitosamente',
      payload: updatedCart
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar cantidad',
      error: error.message
    });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const clearedCart = await cartManager.clearCart(cid);

    res.status(200).json({
      status: 'success',
      message: 'Carrito vaciado exitosamente',
      payload: clearedCart
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al vaciar carrito',
      error: error.message
    });
  }
});

export default router;
