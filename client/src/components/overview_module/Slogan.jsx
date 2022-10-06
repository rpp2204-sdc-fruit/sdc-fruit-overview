/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-scroll';
// import findDefaultStyle from './helper-functions/findDefaultStyle.js';

function Slogan({ product }) {
  if (product) {
    return (
      <div className="slogan-features">
        <div className="slogan">{product.slogan}</div>
        <ul className="features">
          {product.features.map((feature, index) => (
            <li key={index}>{`${feature.value} ${feature.feature}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Slogan;
