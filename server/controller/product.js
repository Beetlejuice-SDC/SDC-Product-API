const model = require('../models/products.js');

var products = (req, res) => {
  console.log('take a look',req)
  var count = req.query.count || 5;
  var page = req.query.page || 1;
    model.product(count, page)
    .then((response) => {
      res.send(response['rows'])
      console.log('your get products request succeed')
    }).catch((err) => {
      console.log(err);
    })
  }


var productInfo = (req, res) => {
  console.log('sss',req.params.product_id)
  model.feature(req.params.product_id)
  .then((response) => {
    if(response['rows'].length >=2) {
      throw 'there is an error for duplicate product id'
    }
    res.send(response['rows'][0])
    console.log('get succeed');
  }).catch((err) => {
    console.log(err);
    res.end(err);
  })
}


var styles = (req, res) => {
  // console.log('sss',req.query.product_id)
  model.style(req.params.product_id)
  .then((response) => {
    var obj = {
      'product_id':req.params.product_id,
      'results': response['rows']
    }
    res.send(obj)
    console.log('get succeed');
  }).catch((err) => {
    console.log(err);
    res.end(err);
  })
}


var related = (req, res) => {
  // console.log('related',req.query.product_id)
  model.related(req.params.product_id)
  .then((response) => {
    var arr = []
    var result = response['rows']
    arr = arr.concat(result.map((each)=> {return each['related_product_id']}))
    res.send(arr)
    console.log('get succeed');
  }).catch((err) => {
    console.log(err);
    res.end(err);
  })
}


module.exports.products = products;
module.exports.productInfo = productInfo;
module.exports.styles = styles;
module.exports.related = related;