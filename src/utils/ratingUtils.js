export const renderStars = (rating) => {
    const validRating = Math.min(Math.max(parseInt(rating) || 0, 0), 5);
    return '★'.repeat(validRating) + '☆'.repeat(5 - validRating);
  };