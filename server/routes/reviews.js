import express from 'express';
import { ReviewModel } from '../models/review.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reviews = await ReviewModel.findAll();
    res.json(reviews);
  } catch (error) {
    console.error('Error in GET /reviews:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body.bookTitle || !req.body.author || !req.body.rating || !req.body.reviewText) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const review = await ReviewModel.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    console.error('Error in POST /reviews:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!req.body.bookTitle || !req.body.author || !req.body.rating || !req.body.reviewText) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const review = await ReviewModel.update(req.params.id, req.body);
    res.json(review);
  } catch (error) {
    console.error('Error in PUT /reviews/:id:', error);
    if (error.message === 'Review not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ReviewModel.delete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /reviews/:id:', error);
    if (error.message === 'Review not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;