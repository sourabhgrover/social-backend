var express = require('express');
var router = express.Router();
var platformRoute =  require('../routes/platform.routes');
const categoryRoute = require('../routes/category.routes');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send("hey it worked agian");
// });


router.use('/platform',platformRoute);
router.use('/category',categoryRoute);


module.exports = router;
