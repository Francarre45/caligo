import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    
    const result = await productManager.getProducts({
      limit,
      page,
      sort,
      query
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);

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

router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productManager.addProduct(productData);

    const io = req.app.get('io');
    if (io) {
      const allProducts = await productManager.getProducts({ limit: 100 });
      io.emit('updateProducts', allProducts.payload);
    }

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

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const updateData = req.body;

    const updatedProduct = await productManager.updateProduct(pid, updateData);

    const io = req.app.get('io');
    if (io) {
      const allProducts = await productManager.getProducts({ limit: 100 });
      io.emit('updateProducts', allProducts.payload);
    }

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

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid);

    const io = req.app.get('io');
    if (io) {
      const allProducts = await productManager.getProducts({ limit: 100 });
      io.emit('updateProducts', allProducts.payload);
    }

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
