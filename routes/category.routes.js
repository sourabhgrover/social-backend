var express = require('express');
var router = express.Router();

//Include PLatform Controller
var category = require('../controllers/category.controller');

router.get('/',category.get);
router.post('/',category.post);


module.exports = router;