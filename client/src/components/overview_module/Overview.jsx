import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Gallery from './Gallery.jsx';
import Slogan from './Slogan.jsx';

function Overview({ product, avgRating, totalReviews }) {
  const [styles, setStyles] = useState([
    {
      style_id: 1,
      product_id: 1,
      name: '',
      original_price: '',
      sale_price: 0,
      default: true,
      photos: [
        {
          thumbnail_url: '',
          url: '',
        },
      ],
      skus: [],
    },
  ]);

  const [selectedStyle, setSelectedStyle] = useState({
    style_id: 1,
    name: '',
    original_price: '',
    sale_price: 0,
    default: true,
    photos: [
      {
        thumbnail_url: '',
        url: '',
      },
    ],
    skus: [],
  });

  useEffect(() => {
    if (product.product_id) {
      axios.get(`/products/${product.product_id}/styles`).then((response) => {
        setStyles(response.data.styles);
        setSelectedStyle(response.data.default);
      });
    }
  }, [product]);

  const changeStyleSelected = (style) => {
    setSelectedStyle(style);
  };

  if (Object.keys(product).length) {
    return (
      <div id="main-container" className="main-container">
        <div data-testid="overview" className="overview">
          <Gallery style={selectedStyle} />
          <div className="new-right">
            <ProductInfo
              product_id={product.product_id}
              product={product}
              features={product.features}
              style={selectedStyle}
              styles={styles}
              avgRating={avgRating}
              totalReviews={totalReviews}
            />
            <Styles
              styles={styles}
              changeStyleSelected={changeStyleSelected}
              style={selectedStyle}
            />
          </div>
        </div>
        <Slogan product={product} />
      </div>
    );
  }
}

export default Overview;
