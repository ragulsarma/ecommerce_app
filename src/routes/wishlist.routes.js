const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlist.controller');

router.post('/', WishlistController.addToWishlist);
router.get('/:userId', WishlistController.getWishlist);

module.exports = router;