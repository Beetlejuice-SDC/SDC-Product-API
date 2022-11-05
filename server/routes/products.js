const express = require('express');
const router = express.Router();
const controllers = require('../controller/product.js');


router.get('/', controllers.products)
router.get('/:product_id', controllers.productInfo)
router.get('/:product_id/styles', controllers.styles)
router.get('/:product_id/related', controllers.related)

module.exports = router;