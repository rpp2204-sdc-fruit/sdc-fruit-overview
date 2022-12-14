/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import AddToCart from './AddToCart.jsx';
// import Gallery from './Gallery.jsx';

function Styles({ styles, changeStyleSelected, style }) {
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    setSelectedStyle(style);
  }, []);

  useEffect(() => {
    setSelectedStyle(style);
    changeStyleSelected(style);
  }, [styles]);

  const handleSelect = (e) => {
    e.preventDefault();
    // console.log(JSON.parse(e.target.getAttribute('value')));
    setSelectedStyle(JSON.parse(e.target.getAttribute('value')));
    changeStyleSelected(JSON.parse(e.target.getAttribute('value')));
  };

  if (styles.length) {
    // console.log(`There are ${props.styles.length} styles`);
    return (
      <div className="gallery-styles-container">
        {/* <Gallery style={selectedStyle} /> */}
        <div className="right">
          {/* <h1 className="selected-product-name">{props.product.name}</h1>
          <h3 className="selected-product-slogan">{props.product.slogan}</h3>
          <h4 className="selected-style-name">{selectedStyle.name}</h4> */}
          <div
            data-testid="style-selector"
            className="product_overview_style_selector"
          >
            {styles.map((style, index) => {
              if (style.name === selectedStyle.name) {
                return (
                  <img
                    className="selected-style-thumbnail"
                    onClick={(e) => {
                      handleSelect(e);
                    }}
                    value={JSON.stringify(style)}
                    src={style.photos[0].thumbnail_url}
                    alt=""
                    key={index}
                  />
                );
              }
              return (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                  className="style_thumbnail"
                  onClick={(e) => {
                    handleSelect(e);
                  }}
                  value={JSON.stringify(style)}
                  src={style.photos[0].thumbnail_url}
                  alt=""
                  key={index}
                />
              );
            })}
          </div>
          <AddToCart style={style} />
        </div>
      </div>
    );
  }
}

export default Styles;
