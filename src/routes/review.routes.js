const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');

router.post('/', ReviewController.createReview);
router.get('/product/:productId', ReviewController.getReviewsByProduct);

module.exports = router;