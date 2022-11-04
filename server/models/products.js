const db = require ('../../dbs/db.js')

var product = function (count) {
  var products =
  db.client.query(`SELECT * FROM products ORDER BY id LIMIT ${count}`);
  return products;
}


var feature = function (product_id) {
  var productFeature =
  db.client.query(`select products.*,
  jsonb_agg(to_jsonb(features)-'id' -'product_id') AS features
  FROM products
  LEFT JOIN features on products.id = features.product_id
  GROUP BY products.id
  HAVING products.id = ${product_id}`);
  return productFeature;
}

module.exports.product = product;
module.exports.feature = feature;