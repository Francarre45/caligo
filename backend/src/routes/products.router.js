import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
  try {
    const products = productManager.getProducts();
    res.status(200).json({
      status: 'success',
      payload: products
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

router.get('/:pid', (req, res) => {
  try {
    const { pid } = req.params;
    const product = productManager.getProductById(pid);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: `Producto con ID "${pid}" no encontrado`
      });
    }

    res.status(200).json({
      status: 'success',
      payload: product
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener producto',
      error: error.message
    });
  }
});

router.post('/', (req, res) => {
  try {
    const productData = req.body;
    const newProduct = productManager.addProduct(productData);

    const io = req.app.get('io');
    const products = productManager.getProducts();
    io.emit('updateProducts', products);

    res.status(201).json({
      status: 'success',
      message: 'Producto creado exitosamente',
      payload: newProduct
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al crear producto',
      error: error.message
    });
  }
});

router.put('/:pid', (req, res) => {
  try {
    const { pid } = req.params;
    const updateData = req.body;

    const updatedProduct = productManager.updateProduct(pid, updateData);

    const io = req.app.get('io');
    const products = productManager.getProducts();
    io.emit('updateProducts', products);

    res.status(200).json({
      status: 'success',
      message: 'Producto actualizado exitosamente',
      payload: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
});

router.delete('/:pid', (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = productManager.deleteProduct(pid);

    const io = req.app.get('io');
    const products = productManager.getProducts();
    io.emit('updateProducts', products);

    res.status(200).json({
      status: 'success',
      message: 'Producto eliminado exitosamente',
      payload: deletedProduct
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
});

export default router;
