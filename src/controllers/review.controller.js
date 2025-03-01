const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
    }
};


exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};


exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { productId: req.params.productId } });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

exports.getReviewsByUser = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { userId: req.params.userId } });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reviews', error });
    }
};


exports.updateReply = async (req, res) => {
    try {
        const { reply } = req.body;
        const review = await Review.findByPk(req.params.reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.reply = reply;
        await review.save();
        res.json({ message: 'Reply updated successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error updating reply', error });
    }
};