import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CartManager {
  constructor() {
    this.path = path.join(__dirname, '../data/carts.json');
    this.carts = [];
    this.init();
  }

  // Inicializar: crear archivo si no existe y cargar carritos
  init() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
      this.carts = this.readFile();
    } catch (error) {
      console.error('Error al inicializar CartManager:', error);
      this.carts = [];
    }
  }

  // Leer archivo JSON
  readFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer carritos:', error);
      return [];
    }
  }

  // Escribir en archivo JSON
  writeFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error('Error al escribir carritos:', error);
    }
  }

  // Crear nuevo carrito
  createCart() {
    try {
      this.carts = this.readFile();

      const newCart = {
        id: uuidv4(),
        products: []
      };

      this.carts.push(newCart);
      this.writeFile();
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  // Obtener carrito por ID
  getCartById(id) {
    this.carts = this.readFile();
    const cart = this.carts.find(c => c.id === id);
    return cart || null;
  }

  // Agregar producto al carrito
  addProductToCart(cartId, productId) {
    try {
      this.carts = this.readFile();
      const cartIndex = this.carts.findIndex(c => c.id === cartId);

      if (cartIndex === -1) {
        throw new Error(`Carrito con ID "${cartId}" no encontrado`);
      }

      const cart = this.carts[cartIndex];
      const productIndex = cart.products.findIndex(p => p.product === productId);

      if (productIndex !== -1) {
        // Si el producto ya existe, incrementar cantidad
        cart.products[productIndex].quantity += 1;
      } else {
        // Si no existe, agregarlo con cantidad 1
        cart.products.push({
          product: productId,
          quantity: 1
        });
      }

      this.carts[cartIndex] = cart;
      this.writeFile();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los carritos (opcional, para debugging)
  getAllCarts() {
    this.carts = this.readFile();
    return this.carts;
  }

  // Eliminar carrito (opcional, útil para testing)
  deleteCart(id) {
    try {
      this.carts = this.readFile();
      const index = this.carts.findIndex(c => c.id === id);

      if (index === -1) {
        throw new Error(`Carrito con ID "${id}" no encontrado`);
      }

      const deletedCart = this.carts.splice(index, 1)[0];
      this.writeFile();
      return deletedCart;
    } catch (error) {
      throw error;
    }
  }
}

export default CartManager;
