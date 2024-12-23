import { db } from '../config/database.js';

export const ReviewModel = {
  findAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM BookReviews ORDER BY dateAdded DESC');
      return rows;
    } catch (error) {
      console.error('Database error in findAll:', error);
      throw new Error('Failed to fetch reviews');
    }
  },

  create: async (review) => {
    try {
      const { bookTitle, author, rating, reviewText } = review;
      const [result] = await db.query(
        'INSERT INTO BookReviews (title, author, rating, reviewText) VALUES (?, ?, ?, ?)',
        [bookTitle, author, rating, reviewText]
      );
      return { id: result.insertId, ...review, dateAdded: new Date().toISOString() };
    } catch (error) {
      console.error('Database error in create:', error);
      throw new Error('Failed to create review');
    }
  },

  update: async (id, review) => {
    try {
      const { bookTitle, author, rating, reviewText } = review;
      const [result] = await db.query(
        'UPDATE BookReviews SET title = ?, author = ?, rating = ?, reviewText = ? WHERE id = ?',
        [bookTitle, author, rating, reviewText, id]
      );
      if (result.affectedRows === 0) {
        throw new Error('Review not found');
      }
      return { id: parseInt(id), ...review, dateAdded: new Date().toISOString() };
    } catch (error) {
      console.error('Database error in update:', error);
      throw new Error('Failed to update review');
    }
  },

  delete: async (id) => {
    try {
      const [result] = await db.query('DELETE FROM BookReviews WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error('Review not found');
      }
      return { id: parseInt(id) };
    } catch (error) {
      console.error('Database error in delete:', error);
      throw new Error('Failed to delete review');
    }
  }
};