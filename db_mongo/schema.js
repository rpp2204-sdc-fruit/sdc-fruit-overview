const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const FeatureSchema = new Schema ({
  feature_id: Number,
  feature: String,
  value: String,
  created_at: Date,
  updated_at: Date,
});

const PhotoSchema = new Schema ({
  photo_id: Number,
  url: String,
  thumbnail_url: String,
  created_at: Date,
  updated_at: Date,
})

const SkuSchema = new Schema ({
  sku_id: Number,
  quantity: Number,
  size: String,
  created_at: Date,
  updated_at: Date,
})

const StyleSchema = new Schema ({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  is_default: Boolean,
  photos: [PhotoSchema],
  skus: [SkuSchema],
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
  features: [FeatureSchema],
  styles: [StyleSchema],
  created_at: Date,
  updated_at: Date,
});



let Products = mongoose.model("Products", ProductSchema);
let Features = model("Features", FeatureSchema);
let Styles = model("Styles", StyleSchema);
let Photos = model("Photos", PhotoSchema);
let Skus = model("Skus", SkuSchema);



module.exports = {
  Products,
  Features,
  Styles,
  Photos,
  Skus,
}
