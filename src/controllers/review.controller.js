const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { ProductId: req.params.productId } });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};