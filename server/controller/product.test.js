const dotenv = require('dotenv').config()
const controller = require('./product.js');
const { Pool } = require('pg');
const axios = require('axios');


jest.mock('pg', () => {
  const mPool = {
    connect: function () {
      return { release: jest.fn() };
    },
    query: jest.fn()
  };
  return { Pool: jest.fn(() => mPool) };
});
// jest.mock('./handler.js', () => {
//   return {
//     success: jest.fn(),
//     failure: jest.fn(),
//   };
// });

describe('test products API', () => {
  let pool;
  beforeEach(() => {
    pool = new Pool();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('test product lists api', async () => {
    // setup
    // create mock db results
    var rows = [123]
    var results = { 'rows': rows, rowCount: 0 }
    // inject the mock db results to pool.query
    pool.query.mockResolvedValueOnce(results);
    var res = {send: (x) => {}};
    var spy = jest.spyOn(res, 'send');

    //trigger
    await controller.products({query: {count: 4, page: 2}}, res);

    //verify
    var query = `
    SELECT
     *
    FROM products
    ORDER BY id
    LIMIT 4 OFFSET 4
    `
    expect(pool.query).toBeCalledWith(query);
    expect(await spy).toBeCalledWith(rows);
  });

  // it('should failure', async () => {
  //   const mError = new Error('dead lock');
  //   client.query.mockRejectedValueOnce(mError);
  //   await getAlerts();
  //   expect(client.connect).toBeCalledTimes(1);
  //   expect(client.query).toBeCalledWith('SELECT * FROM public.alerts;');
  //   expect(client.end).toBeCalledTimes(1);
  //   expect(failure).toBeCalledWith({ message: mError, status: false });
  // });
});
// Unit test result with 100% cover
const URL = `http://localhost:${process.env.PORT}`;

describe('/products/?product_id=2 returns an object with feature', () => {
  it('returns data and not null', () => {
    axios.get(`${URL}/products/?product_id=2`)
      .then(res => { expect(res.data.length).not.toBe(0) })
      .catch(err => { throw (err); });
  });
});