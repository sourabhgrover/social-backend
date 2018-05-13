var express = require('express');
var router = express.Router();

//Include Group Controller
var group = require('../controllers/group.controller');

router.get('/queryString',group.filter);
router.get('/:id',group.getOne);
router.get('/',group.get);
router.post('/',group.post);
router.delete('/:id',group.delete);
router.put('/:id',group.put);


module.exports = router;