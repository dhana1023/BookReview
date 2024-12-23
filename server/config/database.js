import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'dhananjani',
  password: '@#DhananjaniBooks1234',
  database: 'book_reviews'
});

export const db = pool.promise();