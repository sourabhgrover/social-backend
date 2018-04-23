const Platform = require('../models/').platform;
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

 var upload = multer({ storage: Storage }).array("photo", 1); //Field name and max count 
// var upload = multer({ //multer settings
//     storage: storage
// }).single('photo');



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
    upload(req.body.photo,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        console.log(req.file);
         res.json({error_code:0,err_desc:null});
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