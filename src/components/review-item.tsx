import React from "react";
import { TReview } from "../type/review"

type TReviewItem = {
  review: TReview;
}

export default function ReviewItem( { review }: TReviewItem) {
  return (
    <li className="reviews__item">
      <div className="reviews__item-user">
        <img src="../../public/img/avatar.svg" alt={`avatar ${review.name}`} className="reviews__item-avatar" width={30} height={30} />
        <span className="reviews__item-name">{review.name}</span>
      </div>
      <p className="reviews__item-comments">
        {review.text}
      </p>
    </li>
  )
}