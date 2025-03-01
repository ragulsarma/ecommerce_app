const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');

router.post('/', ReviewController.createReview);
router.get('/product/:productId', ReviewController.getReviewsByProduct);
router.get('/user/:userId', ReviewController.getReviewsByUser);  // Get reviews by user ID
router.get('/', ReviewController.getAllReviews);  // Get all reviews
router.put('/:reviewId/reply', ReviewController.updateReply);  // Update reply by review ID

module.exports = router;