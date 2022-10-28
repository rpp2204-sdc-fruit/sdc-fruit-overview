const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  feature_id: Number,
  product_id: Number,
  feature: String,
  value: String,
  created_at: Date,
  updated_at: Date,
});

const PhotoSchema = new mongoose.Schema({
  photo_id: Number,
  style_id: Number,
  url: String,
  thumbnail_url: String,
  created_at: Date,
  updated_at: Date,
});

const SkuSchema = new mongoose.Schema({
  sku_id: Number,
  style_id: Number,
  quantity: Number,
  size: String,
  created_at: Date,
  updated_at: Date,
});

const StyleSchema = new mongoose.Schema({
  style_id: Number,
  product_id: Number,
  name: String,
  sale_price: String,
  original_price: String,
  is_default: Boolean,
  last_modified: Date,
  photos: [{ url: String, thumbnail_url: String }],
  skus: [{ sku_id: Number, size: String, quantity: Number }],
});

const ProductSchema = new mongoose.Schema({
  _id: Number,
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [{ feature: String, value: String }],
  last_modified: Date,
});

const Products = mongoose.model('products', ProductSchema);
const Features = mongoose.model('features', FeatureSchema);
const Styles = mongoose.model('styles', StyleSchema);
const Photos = mongoose.model('photos', PhotoSchema);
const Skus = mongoose.model('skus', SkuSchema);

module.exports = {
  Products,
  Styles,
  Features,
  Photos,
  Skus,
};
