import http from "k6/http";
import { check, sleep } from "k6";

// export const options = {
//   rps: 500,
//   stages: [
//     { duration: '1m', target: 5000 },
//     { duration: '1m', target: 5000 },
//   ],
// };

export const options = {
  scenarios: {
    open_model: {
      executor: "constant-arrival-rate",
      rate: 10,
      timeUnit: "1s",
      duration: "60s",
      preAllocatedVUs: 100,
      maxVUs: 100,
    },
  },
};

export default function () {
  const requests = {
    "head page": "http://localhost:3000",

    "all products": {
      method: "GET",
      url: "http://localhost:3000/products",
    },

    "product info": {
      method: "GET",
      url: `http://localhost:3000/products/${Math.floor(
        Math.random() * 1000011
      )}`,
    },

    "product styles": {
      method: "GET",
      url: `http://localhost:3000/products/${Math.floor(
        Math.random() * 100011
      )}/styles`,
    },
  };

  const responses = http.batch(requests);

  check(responses["head page"], {
    "head page status was 200": (res) => res.status === 200,
  });
  check(responses["all products"], {
    "all products page status was 200": (res) => res.status === 200,
    // 'products data was sent back': (res) => res.body.length > 0,
  });
  check(responses["product info"], {
    "product info status was 200": (res) => res.status === 200,
    "product data was sent back": (res) => res.body.length > 0,
  });
  check(responses["product styles"], {
    "styles page status was 200": (res) => res.status === 200,
    "style data was sent back": (res) => res.body.length > 0,
  });
}
