const mongoose = require ("mongoose");
mongoose.connect('mongodb://localhost/products');

const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,

})

const featureSchema = new mongoose.Schema({
  featureid: Number,
  product_id: Number,
  feature: String,
  value: String
})

const stylesSchema = new mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default_style: Boolean,
  productid: Number,
})

const photosSchema = new mongoose.Schema({
  photoid: Number,
  thumbnail_url: String,
  url: String,
  style_id: Number
})

const skusSchema = new mongoose.Schema({
  skuid: Number,
  size: String,
  quantity: Number,
  style_id: Number
})


const relatedSchema = new mongoose.Schema({
  relatedid: Number,
  product_id: Number,
  related_product_id: Number
});

const ProductModel = mongoose.model('ProductModel', productSchema);
const FeatureModel= mongoose.model('FeatureModel', featureSchema);
const StylesModel= mongoose.model('StylesModel', stylesSchema);
const PhotosModel= mongoose.model('PhotosModel', photosSchema);
const SkusModel= mongoose.model('SkusModel', skusSchema);
const RelatedModel= mongoose.model('RelatedModel', relatedSchema);

// const related = new RelatedModel({relatedid: 1,product_id: 1,related_product_id: 2 })
const styles = new StylesModel({
  style_id: 11,
  name: 'style1',
  original_price:  '180',
  sale_price: '145',
  default_style: false,
  productid: 1,
})
// const skus = new SkusModel(1,"XS",1,11)
// const product = new ProductModel(1,"Camo Onesie","Blend in to your crowd","The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","Jackets",140)
// const feature = new FeatureModel(10, 1, 'short', 'featurevalue')
const photo = new PhotosModel({
  photoid: 11,
  thumbnail_url: 'http://thumbnail',
  url: 'url',
  style_id: 11})

Promise.all([
// rsrelated.save(),
styles.save(),
// skus.save(),
// product.save(),
// feature.save(),
photo.save()]).then((response) => {
  console.log('mongodb succeed')
}).catch((err) => {
  console.log(err)
})
module.exports.ProductModel =ProductModel
module.exports.FeatureModel =FeatureModel