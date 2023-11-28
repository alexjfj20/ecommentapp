const Category = require('./Category');
const Imagenes = require('./Image');
const Product = require('./Product');
const Cart = require('./Cart');
const User = require('./User');
const Purchase = require('./Purchase');


Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Imagenes);
Imagenes.belongsTo(Product);


Cart.belongsTo(Product);
Product.hasMany(Cart);

Cart.belongsTo(User);
User.hasMany(Cart);

Purchase.belongsTo(User);
User.hasMany(Purchase);


Purchase.belongsTo(Product);
Product.hasMany(Purchase);

Purchase.belongsTo(User);
User.hasMany(Purchase);

