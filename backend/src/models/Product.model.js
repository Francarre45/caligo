import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'El código es requerido'],
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo']
  },
  category: {
    type: String,
    required: [true, 'La categoría es requerida'],
    trim: true
  },
  thumbnails: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  versionKey: false
});

productSchema.plugin(mongoosePaginate);

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ status: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;