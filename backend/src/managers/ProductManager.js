import Product from '../models/Product.model.js';

class ProductManager {
  
  async getProducts(options = {}) {
    try {
      const {
        limit = 10,
        page = 1,
        sort,
        query
      } = options;

      const filter = {};
      
      if (query) {
        if (query.includes('category:')) {
          const category = query.split(':')[1];
          filter.category = category;
        }
        else if (query.includes('status:')) {
          const status = query.split(':')[1] === 'true';
          filter.status = status;
        }
        else {
          filter.$or = [
            { title: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } }
          ];
        }
      }

      const paginateOptions = {
        page: parseInt(page),
        limit: parseInt(limit),
        lean: true
      };

      if (sort === 'asc') {
        paginateOptions.sort = { price: 1 };
      } else if (sort === 'desc') {
        paginateOptions.sort = { price: -1 };
      }

      const result = await Product.paginate(filter, paginateOptions);

      return {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
        nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null
      };
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error(`Ya existe un producto con el código "${productData.code}"`);
      }
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        throw new Error(`Producto con ID "${id}" no encontrado`);
      }

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        throw new Error(`Producto con ID "${id}" no encontrado`);
      }

      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManager;