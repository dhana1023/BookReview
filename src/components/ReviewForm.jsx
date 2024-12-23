import { useState, useEffect } from 'react';

const defaultFormData = {
  bookTitle: '',
  author: '',
  rating: '5',
  reviewText: ''
};

export default function ReviewForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        bookTitle: initialData.bookTitle || '',
        author: initialData.author || '',
        rating: initialData.rating?.toString() || '5',
        reviewText: initialData.reviewText || ''
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      setFormData(defaultFormData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h2>{initialData ? 'Edit Review' : 'Add New Review'}</h2>
      
      <div className="form-group">
        <label htmlFor="bookTitle">Book Title:</label>
        <input
          type="text"
          id="bookTitle"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          {[5, 4, 3, 2, 1].map(num => (
            <option key={num} value={num}>{num} Stars</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="reviewText">Review:</label>
        <textarea
          id="reviewText"
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting 
          ? 'Saving...' 
          : initialData 
            ? 'Update Review' 
            : 'Add Review'
        }
      </button>
    </form>
  );
}