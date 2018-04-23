const Platform = require('../models/').platform;
var fs = require('fs');
//require multer for the file uploads
var multer = require('multer');

// var Storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, '../public/images/platform');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });

var Storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/images/platform')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

//  var upload = multer({ storage: Storage }).array("photo", 1); //Field name and max count 
// var upload = multer({ //multer settings
//     storage: storage
// }).single('photo');

var upload = multer().single('photo'); // for parsing multipart/form-data



var platformController = {

    get(req,res){
        let imageUrl = req.protocol + '://' + req.get('host') + '/images/platform/';
        console.log(imageUrl);
        return Platform
            .findAll()
                .then(Platform => {
                    // Platform will be an array of all Platform instances
                    for(let i=0;i < Platform.length;i++ ){
                        if(Platform[i].dataValues.img_name){
                            Platform[i].dataValues.img_url = imageUrl+Platform[i].dataValues.img_name;
                        }else{
                            Platform[i].dataValues.img_url = '';
                        }
                    }
                     res.status(200).send(Platform)
         }).catch(
            error => res.status(400).send(error));
        
    },
    post(req,res){


        // get the name from request body
        // let name = req.body.name;
        // if(!name){
        //     res.status(400).send();
        // }
    //     //console.log(req);
        // UPLOAD IMAGE HERE STARTS
        // set the directory for the uploads to the uploaded to
        // var DIR = '../public/images/platform';
        // //define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
        // var upload = multer({dest: DIR}).single('photo');
        // var path = '';
        // upload(req, res, function (err) {
        //    if (err) {
        //      // An error occurred when uploading
        //      console.log(err);
        //      return res.status(422).send("an Error occured")
        //    }  
        //   // No error occured.
        //    path = req.file.path;
        //    return res.send("Upload Completed for "+path); 
        //  });  

    //  // UPLOAD IMAGE HERE ENDS
    console.log(req.body);
    console.log(req.file);
    // upload(req, res, function (err) { 

    //     //console.log(res);
    //     // if (err) { 
    //     //     return res.end("Something went wrong!"); 
    //     // } 
    //     // return res.end("File uploaded sucessfully!."); 
    // }); 
    // upload(req,res,function(err){
    //     if(err){
    //          res.json({error_code:1,err_desc:err});
    //          return;
    //     }
    //     console.log(req.file);
    //      res.json({error_code:0,err_desc:null});
    // })

    upload(req,res,function(err){
        // let img = req.body.cropped;
        let img = "data:image/gif;base64,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"
        let image = img.split(';base64,').pop();

    fs.writeFile("public/images/platform/out.png", image, {encoding: 'base64'}, function(err) {
    console.log('File created');
     if(err){
        console.log(err);
        return;
      } else {
        res.redirect('/crop');
      }
    })
        
        // // get the Image Url from the request body
        // let img_url = req.body.img_url;
        
        // // Create new job object
        // let platformData = {
        //         'name' : name,
        //         'img_url' : img_url
        //     };

        // return Platform
        //         .create({
        //             name : req.body.name,
        //             img_url : req.body.img_url
        //         })
        //         .then(Platform => res.status(201).send(Platform))
        //         .catch(error => res.status(400).send(error));



    });

    },
    delete(req, res) {
        return Platform
          .findById(req.params.id)
          .then(Platform => {
            if (!Platform) {
              return res.status(400).send({
                message: 'Platform Not Found',
              });
            }
            return Platform
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
};

module.exports = platformController;