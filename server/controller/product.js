const model = require('../models/products.js');
const db = require ('../../dbs/postgres/db.js')

/**
 * Get endpoint to retrieve products inside databse with pagination supported. 
 * Page number and item per page can be configured through request, default 
 * page number is 1 and item per page is 5.
 * 
 * @param {*} req client request with optional page number and item per page
 * @param {*} res response contains product items 
 */
var products = async (req, res) => {
  var count = req.query.count || 5;
  var page = req.query.page || 1;
  ;(async function() {
    const client = await db.pool.connect()
    try {
      var records = await model.product(count,page);
      res.send(records['rows']);
    }catch (err) {
      var errMessage = 'Products failed to be retrieved';
      console.error(errMessage, err);
      res.status(500).send(errMessage);
    } finally {
      // release db connection
      client.release();
    }
  })();
};

/**
 * Retrieve product information along with all other related info such as features.
 * 
 * @param {*} req client request contains product id
 * @param {*} res response of product info and its features
 */
var productInfo = (req, res) => {
  // request validation
  validateProductId(req, res); 
  
  // fetch product info and its features
  const productId = req.params.product_id;
  ;(async function() {
    const client = await db.pool.connect();
    try {
      var records = await model.feature(productId);
      if (records['rows'].length >= 2) {
        throw new Exception('Internal exception, found duplicate product id!');
      }
      res.send(records['rows'][0]);
    } catch (err) {
      var errMessage = `Failed to get product info for product ${productId}`;
      console.error(errMessage, err);
      res.status(500).send(errMessage);
    } finally {
      // release db connection
      client.release();
    }
  })();
}

/**
 * Get endpoint to retrieve product styles only with product id.
 * 
 * @param {*} req client request with product to search 
 * @param {*} res response with styles of this product
 */
var styles = (req, res) => {
  // request validation
  validateProductId(req, res); 

  // fetch styles for product
  const productId = req.params.product_id;
  ;(async function() {
    const client = await db.pool.connect();
    try{
      var records = await model.style(productId)
      var obj = {
        'product_id': productId,
        'results': records['rows']
      }
      res.send(obj);
    } catch (err) {
      var errMessage = `Failed to get product styles for product ${productId}`;
      console.error(errMessage, err);
      res.status(500).send(errMessage, err);
    } finally {
      // release db connection
      client.release();
    }
  })();
}

/**
 * Get endpoint to retrieve related products for a specific product id.
 * 
 * @param {*} req client request with productId 
 * @param {*} res response with styles of this product
 */
var related = (req, res) => {
  // request validation
  validateProductId(req, res); 

  // retrieve related products for specific productId
  const productId = req.params.product_id;
  ;(async function() {
    const client = await db.pool.connect();
    try {
      var records = await model.related(productId);
      var arr = [];
      arr = arr.concat(records['rows'].map((each)=> {return each['related_product_id']}));
      res.send(arr);
    } catch (err) {
      var errMessage = `Failed to get related products for product ${productId}`;
      console.error(errMessage, err);
      res.status(500).send(errMessage, err);
    } finally {
      // release db connection
      client.release();
    }
  })();
}

/**
 * Method to validate if product id exists in request or not 
 */
var validateProductId = (req, res) => {
  if (req.params === null && req.params.product_id === null) {
    res.status(400);
    res.send('Invalid request, the product_id can not be null!');
  }
}

module.exports.products = products;
module.exports.productInfo = productInfo;
module.exports.styles = styles;
module.exports.related = related;