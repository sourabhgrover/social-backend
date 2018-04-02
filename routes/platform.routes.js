var express = require('express');
var router = express.Router();

//Include PLatform Controller
var platform = require('../controllers/platform.controller');

router.get('/',platform.get);


module.exports = router;