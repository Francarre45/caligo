import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';

class CartManager {
  
  async createCart() {
    try {
      const newCart = await Cart.create({ products: [] });
      return newCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await Cart.findById(id).populate('products.product');
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      console.log('Cart ID:', cartId);
      console.log('Product ID:', productId);
      
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error(`Carrito con ID "${cartId}" no encontrado`);
      }

      const product = await Product.findById(productId);
      console.log('Product found:', product);
      
      if (!product) {
        throw new Error(`Producto con ID "${productId}" no encontrado`);
      }

      const productIndex = cart.products.findIndex(
        p => p.product.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }

      await cart.save();
      
      return await this.getCartById(cartId);
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error(`Carrito con ID "${cartId}" no encontrado`);
      }

      cart.products = cart.products.filter(
        p => p.product.toString() !== productId
      );

      await cart.save();
      return await this.getCartById(cartId);
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error(`Carrito con ID "${cartId}" no encontrado`);
      }

      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Producto con ID "${item.product}" no encontrado`);
        }
      }

      cart.products = products;
      await cart.save();
      
      return await this.getCartById(cartId);
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error(`Carrito con ID "${cartId}" no encontrado`);
      }

      const productIndex = cart.products.findIndex(
        p => p.product.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error(`Producto con ID "${productId}" no encontrado en el carrito`);
      }

      cart.products[productIndex].quantity = quantity;
      await cart.save();
      
      return await this.getCartById(cartId);
    } catch (error) {
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      
      if (!cart) {
        throw new Error(`Carrito con ID "${cartId}" no encontrado`);
      }

      cart.products = [];
      await cart.save();
      
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getAllCarts() {
    try {
      const carts = await Cart.find().populate('products.product');
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      const deletedCart = await Cart.findByIdAndDelete(id);
      
      if (!deletedCart) {
        throw new Error(`Carrito con ID "${id}" no encontrado`);
      }

      return deletedCart;
    } catch (error) {
      throw error;
    }
  }
}

export default CartManager;