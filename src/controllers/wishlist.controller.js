const Wishlist = require('../models/Wishlist');

exports.addToWishlist = async (req, res) => {
    try {
        const wishlistItem = await Wishlist.create(req.body);
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findAll({ where: { UserId: req.params.userId } });
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error });
    }
};