const controller = require('./product.js');
const { Client } = require('pg');

jest.mock('pg', () => {
  const mClient = {
    connect: () => (new Promise((resolve, reject) => {})),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});
// jest.mock('./handler.js', () => {
//   return {
//     success: jest.fn(),
//     failure: jest.fn(),
//   };
// });

describe('test products API', () => {
  let client;
  beforeEach(() => {
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('test product lists api', async () => {
    var rows = [123]
    var results = { 'rows': rows, rowCount: 0 }
    client.query.mockResolvedValueOnce(results);
    var res = {send: (x) => {}};
    var spy = jest.spyOn(res, 'send');
    //trigger
    await controller.products({query: {count: 4, page: 2}},res);
    //verify
    var query = `
    SELECT
     *
    FROM products
    ORDER BY id
    LIMIT 4 OFFSET 4
    `
    expect(client.query).toBeCalledWith(query);
    expect(spy).toBeCalledWith(rows);
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