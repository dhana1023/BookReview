CREATE USER 'dhananjani'@'%' IDENTIFIED BY '@#DhananjaniBooks1234';
CREATE DATABASE book_reviews;
GRANT ALL PRIVILEGES ON book_reviews.* TO 'dhananjani'@'%';
FLUSH PRIVILEGES;

USE book_reviews;


CREATE TABLE BookReviews (
  id INT AUTO_INCREMENT PRIMARY KEY,       
  title VARCHAR(255) NOT NULL,             
  author VARCHAR(255) NOT NULL,         
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  reviewText TEXT,                         
  dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



