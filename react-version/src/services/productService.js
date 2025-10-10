import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nombre: data.nombre || '',
        precio: data.precio || 0,
        imagen: data.imagen || '',
        categoria: data.categoria || '',
        descripcion: data.descripcion || '',
        stock: data.stock || 0
      };
    });
    return productsList;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('categoria', '==', categoryId));
    const productsSnapshot = await getDocs(q);
    const productsList = productsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nombre: data.nombre || '',
        precio: data.precio || 0,
        imagen: data.imagen || '',
        categoria: data.categoria || '',
        descripcion: data.descripcion || '',
        stock: data.stock || 0
      };
    });
    return productsList;
  } catch (error) {
    console.error("Error obteniendo productos por categoría:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const productDoc = doc(db, 'products', id);
    const productSnapshot = await getDoc(productDoc);
    
    if (productSnapshot.exists()) {
      const data = productSnapshot.data();
      return {
        id: productSnapshot.id,
        nombre: data.nombre || '',
        precio: data.precio || 0,
        imagen: data.imagen || '',
        categoria: data.categoria || '',
        descripcion: data.descripcion || '',
        stock: data.stock || 0
      };
    } else {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    throw error;
  }
};

export const getCategories = async () => {
  return [
    { id: 'equipajes', name: 'Equipajes' },
    { id: 'carry-on', name: 'Carry On' },
    { id: 'accesorios', name: 'Accesorios' }
  ];
};