const mongoose = require ("mongoose");
mongoose.connect('mongodb://localhost/products');

/**
 * Product related schemas
 */
const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
});

const featureSchema = new mongoose.Schema({
  featureid: Number,
  product_id: Number,
  feature: String,
  value: String
});

const stylesSchema = new mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: Number,
  sale_price: Number,
  default_style: Boolean,
  productid: Number,
});

const photosSchema = new mongoose.Schema({
  photoid: Number,
  thumbnail_url: String,
  url: String,
  style_id: Number
});

const skusSchema = new mongoose.Schema({
  skuid: Number,
  size: String,
  quantity: Number,
  style_id: Number
});

const relatedSchema = new mongoose.Schema({
  relatedid: Number,
  product_id: Number,
  related_product_id: Number
});

/**
 * Product related schemas 
 */
const ProductModel = mongoose.model('ProductModel', productSchema);
const FeatureModel= mongoose.model('FeatureModel', featureSchema);
const StylesModel= mongoose.model('StylesModel', stylesSchema);
const PhotosModel= mongoose.model('PhotosModel', photosSchema);
const SkusModel= mongoose.model('SkusModel', skusSchema);
const RelatedModel= mongoose.model('RelatedModel', relatedSchema);

/**
 * Create initial records for with all the schemas
 */
const product = new ProductModel({
  product_id: 1,
  name: "Camo Onesie",
  slogan: "Blend in to your crowd",
  description: "The So Fatigues will wake you up and fit you in.",
  category: "Jackets",
  default_price: 123,
});

const feature = new FeatureModel({
  featureid: 10,
  product_id: 1,
  feature: "short",
  value: 'featurevalue'
});

const styles = new StylesModel({
  style_id: 11,
  name: 'style1',
  original_price:  '180',
  sale_price: '145',
  default_style: false,
  productid: 1,
});

const photo = new PhotosModel({
  photoid: 11,
  thumbnail_url: 'http://thumbnail',
  url: 'url',
  style_id: 11
});

const skus = new SkusModel({
  skuid: 1,
  size: "XS",
  quantity: 1,
  style_id: 11
});

const related = new RelatedModel({
  relatedid: 1,
  product_id: 1,
  related_product_id: 2
});

Promise.all([
  product.save(),
  feature.save(),
  styles.save(),
  photo.save(),
  skus.save(),
  related.save()]
).then((response) => {
  console.log('Successfully create initial records', response);
}).catch((err) => {
  console.log('Failed to create initial records', err);
});

module.exports.ProductModel = ProductModel
module.exports.FeatureModel = FeatureModel