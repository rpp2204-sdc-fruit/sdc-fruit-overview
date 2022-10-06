import React, { useEffect, useMemo, useRef } from 'react';
import ProductBreakdown from './ProductBreakdown.jsx';
import helpers from './helper_functions/ratings_bd.js';
function RatingsBreakdown({
  product_id,
  setCharacteristics,
  characteristics,
  setCurrentFilters,
  currentFilters,
  handleRatings,
}) {
  const percentRecommended = useRef(0);
  const totalReviews = useRef(0);
  const avgRating = useRef(0);
  const metadata = useRef({});

  const starsRatings = useMemo(
    () => helpers.createStarsRating(avgRating),
    [avgRating.current]
  );

  const ratingsBreakDown = useMemo(
    () => helpers.createRatingsBD(metadata, setCurrentFilters),
    [metadata.current]
  );

  useEffect(() => {
    helpers.getMetadata(product_id, (meta) => {
      metadata.current = meta;
      helpers.handleRatings(meta.ratings, (avg, reviewsCount) => {
        totalReviews.current = reviewsCount;
        avgRating.current = avg;
        handleRatings(avg, reviewsCount);
      });
      helpers.handleRecommended(meta.recommended, (avg) => {
        percentRecommended.current = avg;
      });
      setCharacteristics(() => meta.characteristics);
    });
  }, [product_id]);
  return (
    <div id="ratings-breakdown" >
      <div id="average-rating">
        <div
          id="average"

        >{`${avgRating.current}`}</div>
        <div id="breakdown-stars" >
          {starsRatings}
        </div>
      </div>
      <div
        id="review-count"

      >{`out of ${totalReviews.current} ratings`}</div>
      <div id="recommend-percent" >
        {`${percentRecommended.current}% of reviewers recommend this product`}
      </div>
      <div id="ratings-graph" >
        {ratingsBreakDown}
      </div>
      <ProductBreakdown characteristics={characteristics} />
    </div>
  );
}
export default RatingsBreakdown;
