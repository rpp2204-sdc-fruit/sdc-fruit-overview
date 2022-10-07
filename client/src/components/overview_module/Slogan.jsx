import React from 'react';
// import { Link } from 'react-scroll';

function Slogan({ product }) {
  if (product) {
    return (
      <div className="slogan-features">
        <div className="slogan">{product.slogan}</div>
        <ul className="features">
          {product.features.map((feature, index) => {
            if (feature.value !== 'null') {
              return (
                <li
                  key={Math.random(index)}
                >{`${feature.value} ${feature.feature}`}</li>
              );
            }
            return <li key={Math.random(index)}>{`${feature.feature}`}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Slogan;
