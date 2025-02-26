const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Wishlist = sequelize.define('Wishlist', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true }
});

Wishlist.belongsTo(User);
Wishlist.belongsTo(Product);

module.exports = Wishlist;