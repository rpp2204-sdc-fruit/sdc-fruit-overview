import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Gallery from './Gallery.jsx';
import Slogan from './Slogan.jsx';

function Overview({ product, avgRating, totalReviews }) {
  const [selectedStyle, setSelectedStyle] = useState({
    style_id: 1,
    name: '',
    original_price: '',
    sale_price: 0,
    is_default: true,
    photos: [
      {
        thumbnail_url: '',
        url: '',
      },
    ],
    skus: {},
  });

  const [styles, setStyles] = useState([selectedStyle]);

  const style = useRef({});

  useEffect(() => {
    if (product) {
      axios.get(`/products/${product.product_id}/styles`).then((response) => {
        setStyles(response.data.styles);
        setSelectedStyle(response.data.default);
        style.current = response.data.default;
      });
    }
  }, [product]);

  const changeStyleSelected = (newStyle) => {
    setSelectedStyle(newStyle);
  };

  if (product) {
    return (
      <div id="main-container" className="main-container">
        <div data-testid="overview" className="overview">
          <Gallery style={selectedStyle} current={style} />
          <div className="new-right">
            <ProductInfo
              product={product}
              style={selectedStyle}
              avgRating={avgRating}
              totalReviews={totalReviews}
            />
            <Styles
              styles={styles}
              changeStyleSelected={changeStyleSelected}
              style={selectedStyle}
              current={style}
            />
          </div>
        </div>
        <Slogan product={product} />
      </div>
    );
  }
}

export default Overview;
