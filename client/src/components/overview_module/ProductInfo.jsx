import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-scroll';

function ProductInfo({ product, style, avgRating, totalReviews, current }) {
  // console.log('Gallery style: ', style);
  // console.log('Gallery current: ', current);
  if (product) {
    return (
      <div className="product-info-container">
        <div className="product_info_reviews">
          <fieldset>
            {avgRating >= 1 ? (
              <FontAwesomeIcon id="star-1" icon={solid('star')} key="1" />
            ) : (
              <FontAwesomeIcon id="star-1" icon={regular('star')} key="1" />
            )}
            {avgRating >= 2 ? (
              <FontAwesomeIcon id="star-2" icon={solid('star')} key="2" />
            ) : (
              <FontAwesomeIcon id="star-2" icon={regular('star')} key="2" />
            )}
            {avgRating >= 3 ? (
              <FontAwesomeIcon id="star-3" icon={solid('star')} key="3" />
            ) : (
              <FontAwesomeIcon id="star-3" icon={regular('star')} key="3" />
            )}
            {avgRating >= 4 ? (
              <FontAwesomeIcon id="star-4" icon={solid('star')} key="4" />
            ) : (
              <FontAwesomeIcon id="star-4" icon={regular('star')} key="4" />
            )}
            {avgRating === 5 ? (
              <FontAwesomeIcon id="star-5" icon={solid('star')} key="5" />
            ) : (
              <FontAwesomeIcon id="star-5" icon={regular('star')} key="5" />
            )}
          </fieldset>
          <Link
            className="scroll-review"
            to="reviews-module"
            smooth
            duration={500}
          >
            Read all &#40;{totalReviews}&#41; reviews{' '}
          </Link>
        </div>
        <div>{product.category}</div>
        <h2>{product.name}</h2>
        <h3>{product.slogan}</h3>
        <div>{style.name}</div>
        <div>
          {style.sale_price !== 'null' ? (
            <div className="price-container">
              <div className="discounted-price">${style.sale_price}</div>
              <div className="original-price">${style.original_price}</div>
            </div>
          ) : (
            <div className="original-price">${style.original_price}</div>
          )}
        </div>
        <button className="addto-outfit">Add to My Outfit</button>
      </div>
    );
  }
  return (
    <div>
      <div className="product_info_reviews">
        <div data-testid="star-rating">This product has 4 stars reviews</div>
        <button className="read-reviews">Read all reviews</button>
      </div>
      <button>Add to My Outfit</button>
    </div>
  );
}

export default ProductInfo;
