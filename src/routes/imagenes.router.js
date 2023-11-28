const { getAll, create, remove  } = require('../controllers/imagenes.controllers');
const upload = require('../utils/multer');
const express = require('express');

const imagenesRouter = express.Router();

imagenesRouter.route('/')
    .get(getAll)
    .post(upload.single('image'), create);

imagenesRouter.route('/:id')
    .delete(remove);
   
module.exports = imagenesRouter;