import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductManager {
  constructor() {
    this.path = path.join(__dirname, '../data/products.json');
    this.products = [];
    this.init();
  }

  // Inicializar: crear archivo si no existe y cargar productos
  init() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
      this.products = this.readFile();
    } catch (error) {
      console.error('Error al inicializar ProductManager:', error);
      this.products = [];
    }
  }

  // Leer archivo JSON
  readFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer productos:', error);
      return [];
    }
  }

  // Escribir en archivo JSON
  writeFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error('Error al escribir productos:', error);
    }
  }

  // Obtener todos los productos
  getProducts() {
    this.products = this.readFile();
    return this.products;
  }

  // Obtener producto por ID
  getProductById(id) {
    this.products = this.readFile();
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  // Agregar nuevo producto
  addProduct(productData) {
    try {
      this.products = this.readFile();

      // Validar campos requeridos
      const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
      for (const field of requiredFields) {
        if (!productData[field] && productData[field] !== 0) {
          throw new Error(`El campo "${field}" es requerido`);
        }
      }

      // Verificar que el código no esté duplicado
      const codeExists = this.products.some(p => p.code === productData.code);
      if (codeExists) {
        throw new Error(`Ya existe un producto con el código "${productData.code}"`);
      }

      // Crear nuevo producto con ID autogenerado
      const newProduct = {
        id: uuidv4(),
        title: productData.title,
        description: productData.description,
        code: productData.code,
        price: Number(productData.price),
        status: productData.status !== undefined ? productData.status : true,
        stock: Number(productData.stock),
        category: productData.category,
        thumbnails: productData.thumbnails || []
      };

      this.products.push(newProduct);
      this.writeFile();
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar producto
  updateProduct(id, updateData) {
    try {
      this.products = this.readFile();
      const index = this.products.findIndex(p => p.id === id);

      if (index === -1) {
        throw new Error(`Producto con ID "${id}" no encontrado`);
      }

      // No permitir actualizar el ID
      if (updateData.id) {
        delete updateData.id;
      }

      // Actualizar solo los campos proporcionados
      this.products[index] = {
        ...this.products[index],
        ...updateData
      };

      this.writeFile();
      return this.products[index];
    } catch (error) {
      throw error;
    }
  }

  // Eliminar producto
  deleteProduct(id) {
    try {
      this.products = this.readFile();
      const index = this.products.findIndex(p => p.id === id);

      if (index === -1) {
        throw new Error(`Producto con ID "${id}" no encontrado`);
      }

      const deletedProduct = this.products.splice(index, 1)[0];
      this.writeFile();
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManager;
