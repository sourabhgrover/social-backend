var express = require('express');
var router = express.Router();

//Include Group Controller
var group = require('../controllers/group.controller');

router.get('/',group.get);
router.get('/:id',group.getOne);
router.get('/queryString',group.filter);
router.post('/',group.post);
router.delete('/:id',group.delete);


module.exports = router;