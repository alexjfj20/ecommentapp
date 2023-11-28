const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('Cart', {
    
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // userId y   productId


    
});

module.exports = Cart;