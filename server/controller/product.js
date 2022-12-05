const model = require('../models/products.js');
const db = require ('../../dbs/db.js')

var products = async (req, res) => {
  // console.log('take a look',req)
  var count = req.query.count || 5;
  var page = req.query.page || 1;
  ;(async function() {
    const client = await db.pool.connect()
    try{
      var records = await model.product(count,page)
      res.send(records['rows'])
    }catch (err) {
      console.log(err.stack)
    } finally {
      client.release()
    }
  })()};


// var productNew = async (req, res) => {
//   var count = req.query.count || 5;
//   var page = req.query.page || 1;

//   ;(async function() {
//     const client = await db.pool.connect()
//     var records = await client.query(`
//     SELECT
//      *
//     FROM products
//     ORDER BY id
//     LIMIT ${count} OFFSET ${(page-1) * count}
//     `)
//     client.release()
//     res.send(records['rows'])
//   })()

//   }


var productInfo = (req, res) => {
  // console.log('sss',req.params.product_id)

  // model.feature(req.params.product_id)
  // .then((response) => {
  //   if(response['rows'].length >=2) {
  //     throw 'there is an error for duplicate product id'
  //   }
  //   res.send(response['rows'][0])
  //   console.log('get succeed');
  // }).catch((err) => {
  //   console.log(err);
  //   res.end(err);
  // })



  ;(async function() {
    const client = await db.pool.connect()

    try{
      var records = await model.feature(req.params.product_id)
      if(records['rows'].length >=2) {
        throw 'there is an error for duplicate product id'
      }
      res.send(records['rows'][0])
    }catch (err) {
      console.log(err.stack)
    } finally {
      client.release()
    }
  })()
}


var styles = (req, res) => {
  // console.log('sss',req.query.product_id)
  // model.style(req.params.product_id)
  // .then((response) => {
  //   var obj = {
  //     'product_id':req.params.product_id,
  //     'results': response['rows']
  //   }
  //   res.send(obj)
  //   console.log('get succeed');
  // }).catch((err) => {
  //   console.log(err);
  //   res.end(err);
  // })

  ;(async function() {
    const client = await db.pool.connect()

    try{
      var records = await model.style(req.params.product_id)
      var obj = {
        'product_id':req.params.product_id,
        'results': records['rows']
      }
      res.send(obj)
    }catch (err) {
      res.send(err)
    } finally {
      client.release()
    }
  })()

}


var related = (req, res) => {
  // console.log('related',req.query.product_id)
  // model.related(req.params.product_id)
  // .then((response) => {
  //   var arr = []
  //   var result = response['rows']
  //   arr = arr.concat(result.map((each)=> {return each['related_product_id']}))
  //   res.send(arr)
  //   console.log('get succeed');
  // }).catch((err) => {
  //   console.log(err);
  //   res.end(err);
  // })

  ;(async function() {
    const client = await db.pool.connect()

    try{
      var records = await model.related(req.params.product_id)
      var arr = []
      var result = records['rows']
      arr = arr.concat(result.map((each)=> {return each['related_product_id']}))
      res.send(arr)
    }catch (err) {
      console.log(err.stack)
    } finally {
      client.release()
    }
  })()

}


module.exports.products = products;
// module.exports.productNew = productNew;
module.exports.productInfo = productInfo;
module.exports.styles = styles;
module.exports.related = related;