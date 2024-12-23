import { useState, useEffect } from 'react';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';
import './App.css';

export default function App() {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [filterRating, setFilterRating] = useState('all');
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3000/reviews');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddReview = async (review) => {
    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      const data = await response.json();
      setReviews(prevReviews => [data, ...prevReviews]);
      setError(null);
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to add review');
    }
  };

  const handleUpdateReview = async (id, updatedReview) => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview),
      });
      if (!response.ok) {
        throw new Error('Failed to update review');
      }
      const data = await response.json();
      setReviews(prevReviews => 
        prevReviews.map(review => review.id === id ? data : review)
      );
      setEditingReview(null);
      setError(null);
    } catch (error) {
      console.error('Error updating review:', error);
      setError('Failed to update review');
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      setReviews(prevReviews => 
        prevReviews.filter(review => review.id !== id)
      );
      setError(null);
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Failed to delete review');
    }
  };

  const filteredAndSortedReviews = Array.isArray(reviews) ? reviews
    .filter(review => filterRating === 'all' || review.rating === parseInt(filterRating))
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      return b.rating - a.rating;
    }) : [];

  return (
    <div className="app-container">
      <h1>Book Review App</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="filters">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
        
        <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
          <option value="all">All Ratings</option>
          {[5, 4, 3, 2, 1].map(rating => (
            <option key={rating} value={rating}>{rating} Stars</option>
          ))}
        </select>
      </div>

      <ReviewForm 
        onSubmit={editingReview ? 
          (review) => handleUpdateReview(editingReview.id, review) : 
          handleAddReview}
        initialData={editingReview}
      />

      <ReviewList
        reviews={filteredAndSortedReviews}
        onEdit={setEditingReview}
        onDelete={handleDeleteReview}
      />
    </div>
  );
}