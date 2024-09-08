import React from "react";
import ReviewItem from "./review-item";
import { TReview } from "../type/review";

type TReviewList = {
  reviews: TReview[];
}

export default function ReviewList( {reviews}: TReviewList ) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewItem review={review}/>)}
    </ul>
  )
}