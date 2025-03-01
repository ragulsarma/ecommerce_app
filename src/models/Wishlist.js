const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    }
}, {
    tableName: 'wishlist',
    timestamps: false
});

// Define associations
Wishlist.belongsTo(User, { foreignKey: 'userId' });
Wishlist.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Wishlist;
