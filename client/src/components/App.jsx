import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Overview from './overview_module/Overview.jsx';
import QandAModule from './questions_answers_module/QandAModule.jsx';
import ReviewsModule from './reviews_module/ReviewsModule.jsx';
import ProductLinks from './ProductLinks.jsx';
import Topbar from './Topbar.jsx';

function App() {
  const { product_id } = useParams();
  // const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productName, setProductName] = useState('');
  const [product, setProduct] = useState({});
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (product_id) {
      const id = product_id.split('=')[1];
      axios.get(`/products/${id}`).then((res) => {
        const currentProduct = res.data[0];
        setProduct(currentProduct);
        setProductName(currentProduct.name);
        setProductId(currentProduct.id);
      });
    } else {
      axios.get(`/products`).then((res) => {
        const currentProduct = res.data[0];
        setProduct(currentProduct);
        setProductName(currentProduct.name);
        setProductId(currentProduct.id);
      });
    }
  }, [product_id]);

  const handleRatings = (avg, total) => {
    setAvgRating(avg);
    setTotalReviews(total);
  };

  // useEffect(() => {
  //   const options = {
  //     method: 'get',
  //     url: `/products`,
  //   };

  //   axios(options)
  //     .then((response) => {
  //       const productList = response.data;
  //       setProducts([...productList]);
  //     })
  //     .catch((error) => {
  //       throw new Error (error);
  //     });
  // }, []);

  const widgets =
    productId !== 0 ? (
      <>
        <Overview
          product={product}
          avgRating={avgRating}
          totalReviews={totalReviews}
        />
        {/* <QandAModule product_id={productId} product_name={productName}/> */}
        {/* <ReviewsModule
          product_id={productId}
          product_name={productName}
          handleRatings={handleRatings}
        /> */}
      </>
    ) : null;

  return (
    <div>
      <Topbar />
      {widgets}
      {/* <ProductLinks products={products} /> */}
    </div>
  );
}

export default App;
