const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase= sequelize.define('purchase', {
   
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // userId,  productId son las llaves forania

});

module.exports = Purchase