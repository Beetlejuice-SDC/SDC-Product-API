const db = require ('../../dbs/db.js')

var product = (count, page) => {
  // console.log('page is is ', page, (page-1) * count)
  // const client = await db.pool.connect();

  var products = db.pool.query(`
    SELECT
     *
    FROM products
    ORDER BY id
    LIMIT ${count} OFFSET ${(page-1) * count}
    `)

  return products;
}


var feature = function (product_id) {
  var productFeature =
  db.pool.query(`select products.*,
  jsonb_agg(to_jsonb(features)-'id' -'product_id') AS features
  FROM products
  LEFT JOIN features on products.id = features.product_id
  GROUP BY products.id
  HAVING products.id = ${product_id}`)
  return productFeature;
}

var style = function (product_id) {
  var productStyle =
  db.pool.query(`
    select
      styles.id AS style_id,
      styles.name,
      styles.original_price,
      styles.sale_price,
      styles.default_style AS "default?",
      jsonb_agg(distinct jsonb_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos,
      jsonb_object_agg( COALESCE(CAST(skus.id AS VARCHAR), 'null'),  jsonb_build_object('quantity', skus.quantity, 'size', skus.size)) AS skus
    FROM styles
    left JOIN photos ON styles.id = photos.styleid
    left JOIN skus ON styles.id = skus.styleid
    GROUP BY styles.id
    HAVING styles.productid = ${product_id}`
  )
  return productStyle;
}

var related = function (product_id) {
  var productRelated =
  db.pool.query(`
    select
      related_product_id
    FROM related
    WHERE current_product_id = ${product_id};
  `)
  return productRelated;
}



module.exports.product = product;
module.exports.feature = feature;
module.exports.style = style;
module.exports.related = related;