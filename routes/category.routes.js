var express = require('express');
var router = express.Router();

//Include Category Controller
var category = require('../controllers/category.controller');

router.get('/',category.get);
router.get('/:id',category.getOne);
router.post('/',category.post);
router.delete('/:id',category.delete);


module.exports = router;