const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, default: null },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isSpecial: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  material: { type: String },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
    unit: { type: String, default: 'cm' }
  },
  weight: { type: Number },
  color: { type: String },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
