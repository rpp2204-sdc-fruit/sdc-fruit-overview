const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const FeatureSchema = new Schema ({
  feature_id: Number,
  product_id: Number,
  feature: String,
  value: String,
  created_at: Date,
  updated_at: Date,
});

const PhotoSchema = new Schema ({
  photo_id: Number,
  style_id: Number,
  url: String,
  thumbnail_url: String,
  created_at: Date,
  updated_at: Date,
})

const SkuSchema = new Schema ({
  sku_id: Number,
  style_id: Number,
  quantity: Number,
  size: String,
  created_at: Date,
  updated_at: Date,
})

const StyleSchema = new Schema ({
  style_id: Number,
  product_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  is_default: Boolean,
  created_at: Date,
  updated_at: Date,
});

const ProductSchema = new mongoose.Schema ({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: Date,
  updated_at: Date,
});

let Product = model("Product", ProductSchema);
let Feature = model("Feature", FeatureSchema);
let Style = model("Style", StyleSchema);
let Photo = model("Photo", PhotoSchema);
let Sku = model("Sku", SkuSchema);

module.exports = {
  Product,
  Feature,
  Style,
  Photo,
  Sku,
}
