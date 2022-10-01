const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const FeatureSchema = new Schema ({
  feature: String,
  value: String,
});

const PhotoSchema = new Schema ({
  url: String,
  thumbnail_url: String,
})

const SkuSchema = new Schema ({
  quantity: Number,
  size: String,
})

const StyleSchema = new Schema ({
  name: String,
  original_price: String,
  sale_price: String,
  is_default: Boolean,
  photos: [PhotoSchema],
  skus: [SkuSchema],
});

const ProductSchema = new mongoose.Schema ({
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [FeatureSchema],
  styles: [StyleSchema],
  created_at: Date,
  updatae_at: Date,
});



let Products = model("Products", ProductSchema);
let Features = model("Featrues", FeatureSchema);
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
