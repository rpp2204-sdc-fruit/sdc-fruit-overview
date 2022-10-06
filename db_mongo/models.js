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
  original_price: String,
  sale_price: String,
  is_default: Boolean,
  created_at: Date,
  updated_at: Date,
});

const ProductSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: Date,
  updated_at: Date,
});

const Products = mongoose.model('Products', ProductSchema);
const Features = mongoose.model('Features', FeatureSchema);
const Styles = mongoose.model('Styles', StyleSchema);
const Photos = mongoose.model('Photos', PhotoSchema);
const Skus = mongoose.model('Skus', SkuSchema);

module.exports = {
  Products,
  Styles,
  Features,
  Photos,
  Skus,
};
