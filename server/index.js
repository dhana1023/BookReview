import express from 'express';
import cors from 'cors';
import reviewRoutes from './routes/reviews.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/reviews', reviewRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});