var express = require('express');
var router = express.Router();
var platformRoute =  require('../routes/platform.routes');
const categoryRoute = require('../routes/category.routes');
const groupRoute = require('../routes/group.routes');


router.use('/platform',platformRoute);
router.use('/category',categoryRoute);
router.use('/group',groupRoute);


module.exports = router;
