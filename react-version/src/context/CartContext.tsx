import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  isInCart: (productId: string) => boolean;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeItem = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (productId: string): boolean => {
    return cart.some(item => item.id === productId);
  };

  const getTotalQuantity = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        getTotalQuantity,
        getTotalPrice,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export {};