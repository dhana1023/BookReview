import { formatDate } from '../utils/dateUtils';
import { renderStars } from '../utils/ratingUtils';

export default function ReviewList({ reviews, onEdit, onDelete }) {
  return (
    <div className="review-list">
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <h3>{review.bookTitle}</h3>
          <h4>by {review.author}</h4>
          <div className="rating">{renderStars(review.rating)}</div>
          <p>{review.reviewText}</p>
          <div className="review-meta">
            <span>{formatDate(review.dateAdded)}</span>
            <div className="review-actions">
              <button onClick={() => onEdit(review)}>Edit</button>
              <button onClick={() => onDelete(review.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}