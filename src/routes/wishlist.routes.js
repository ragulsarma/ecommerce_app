const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlist.controller');

router.post('/', WishlistController.addToWishlist);
router.get('/', WishlistController.getAllWishlists);
router.get('/user/:userId', WishlistController.getWishlistByUserId);
router.get('/:wishlistId', WishlistController.getWishlistById);
router.delete('/', WishlistController.removeFromWishlist);
module.exports = router;