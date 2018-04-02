var express = require('express');
var router = express.Router();
var platformRoute =  require('../routes/platform.routes')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send("hey it worked agian");
// });


router.use('/platform',platformRoute);


module.exports = router;
