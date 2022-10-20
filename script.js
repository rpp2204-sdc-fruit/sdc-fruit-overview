import http from 'k6/http';
import { check } from 'k6';

// export default function () {
//   http.get('https://test.k6.io');
//   sleep(1);
// };

// export default function () {
//   http.get('http://localhost:3000');
//   sleep(1);
// };

export default function () {
  const requests = {
    'head page': 'http://localhost:3000',

    'all products': {
      method: 'GET',
      url: 'http://localhost:3000/products',
    },

    'product info': {
      method: 'GET',
      url: 'http://localhost:3000/products/?product_id',
      params: { product_id: 1 },
    },

    'product styles': {
      method: 'GET',
      url: 'http://localhost:3000/products/?product_id/styles',
      params: { product_id: 1 },
    },

    'add to cart': {
      method: 'POST',
      url: 'http://localhost:3000/cart/?sku/?qty',
      params: { sku: '1', qty: '1' },
    },
  };
  const responses = http.batch(requests);
  // when accessing results, we use the name of the request as index
  // in order to find the corresponding Response object
  check(responses['head page'], {
    'head page status was 200': (res) => res.status === 200,
  });
  check(responses['all products'], {
    'all products page status was 200': (res) => res.status === 200,
  });
  check(responses['product info'], {
    'product info status was 200': (res) => res.status === 200,
  });
  check(responses['product styles'], {
    'styles page status was 200': (res) => res.status === 200,
  });
  check(responses['add to cart'], {
    'add to cart page status was 201': (res) => res.status === 201,
  });
}
