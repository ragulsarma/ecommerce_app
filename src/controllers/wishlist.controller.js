const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const User = require('../models/User');
const { sequelize } = require('../config/database');
exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Check if the product is already in the wishlist
        const existingItem = await Wishlist.findOne({ where: { userId, productId } });
        if (existingItem) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        const wishlistItem = await Wishlist.create({ userId, productId });
        res.status(201).json(wishlistItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to wishlist', error });
    }
};


exports.getAllWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.findAll({
            attributes: [
                'userId',
                [sequelize.literal(`json_build_object(
                    'id', "User"."id",
                    'name', "User"."name",
                    'email', "User"."email"
                )`), 'user'],
                [sequelize.literal(`json_agg(json_build_object(
                    'id', "Product"."id",
                    'name', "Product"."name",
                    'price', "Product"."price"
                ))`), 'products']
            ],
            include: [{
                model: Product,
                attributes: []
            }, {
                model: User,
                attributes: []
            }],
            group: ['Wishlist.userId', 'User.id', 'User.name', 'User.email']
        });

        if (!wishlists.length) {
            return res.status(404).json({ message: 'No wishlists found' });
        }

        res.json(wishlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlists', error });
    }
}
// ✅ Get Wishlist by User ID (All Products in Wishlist for One User)
exports.getWishlistByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const wishlist = await Wishlist.findOne({
            where: { userId },
            attributes: [
                'userId',
                [sequelize.literal(`json_build_object(
                    'id', "User"."id",
                    'name', "User"."name",
                    'email', "User"."email"
                )`), 'user'],
                [sequelize.literal(`json_agg(json_build_object(
                    'id', "Product"."id",
                    'name', "Product"."name",
                    'price', "Product"."price"
                ))`), 'products']
            ],
            include: [{
                model: Product,
                attributes: []
            }, {
                model: User,
                attributes: []
            }],
            group: ['Wishlist.userId', 'User.id', 'User.name', 'User.email']
        });

        if (!wishlist) {
            return res.status(404).json({ message: 'No wishlist items found for this user' });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error });
    }
};

// ✅ Get Wishlist by Wishlist ID (Retrieve Wishlist Entry with Products and User Info)
exports.getWishlistById = async (req, res) => {
    try {
        const { wishlistId } = req.params;

        const wishlist = await Wishlist.findOne({
            where: { id: wishlistId },
            attributes: [
                'id',
                'userId',
                [sequelize.literal(`json_build_object(
                    'id', "User"."id",
                    'name', "User"."name",
                    'email', "User"."email"
                )`), 'user'],
                [sequelize.literal(`json_agg(json_build_object(
                    'id', "Product"."id",
                    'name', "Product"."name",
                    'price', "Product"."price"
                ))`), 'products']
            ],
            include: [{
                model: Product,
                attributes: []
            }, {
                model: User,
                attributes: []
            }],
            group: ['Wishlist.id', 'Wishlist.userId', 'User.id', 'User.name', 'User.email']
        });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching wishlist', error });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const deleted = await Wishlist.destroy({
            where: { userId, productId }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Wishlist entry not found' });
        }

        res.json({ message: 'Wishlist entry removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing wishlist entry', error });
    }
};