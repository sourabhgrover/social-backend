var express = require('express');
var router = express.Router();

//Include PLatform Controller
var platform = require('../controllers/platform.controller');

router.get('/',platform.get);
router.get('/:id',platform.getOne);
router.post('/',platform.post);
router.delete('/:id',platform.delete);


module.exports = router;