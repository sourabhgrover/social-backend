const Platform = require('../models/').platform;
var fs = require('fs');


// We use multer to handle  mulitpart form data
//require multer for the file uploads
// var multer = require('multer');
// var Storage = multer.diskStorage({ //multers disk storage settings
//     destination: function (req, file, cb) {
//         cb(null, './public/images/platform')
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
//     }
// });
//  var upload = multer({ storage: Storage }).array("photo", 1); //Field name and max count 


var platformController = {

    get(req,res){
        const imageUrl = req.protocol + '://' + req.get('host') + '/images/platform/';
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
    getOne(req,res){
        const imageUrl = req.protocol + '://' + req.get('host') + '/images/platform/';
        return Platform
        .findOne({ where: {id: req.params.id} })
            .then(Platform => {
                console.log(Platform.dataValues);
                if(Platform.dataValues.img_name){
                    Platform.dataValues.img_url = imageUrl+Platform.dataValues.img_name;
                }else{
                    Platform.dataValues.img_url = '';
                }
                 res.status(200).send(Platform)
     }).catch(
        error => res.status(400).send(error));

    },
    post(req,res){

        let platformData = {};
        // get the name from request body
        let reqBody = req.body;
        let name = reqBody.name;

        if(!name){
            res.status(400).send();
        }

        platformData['name'] = name;

        if(reqBody.package_name_android){
            platformData['package_name_android'] = reqBody.package_name_android;
        }

        if(reqBody.package_name_ios){
            platformData['package_name_ios'] = reqBody.package_name_ios;
        }

        let img_name = req.body.img_name;
        if(img_name){            
                platformData['img_name'] =  uploadImage(img_name);
        }        
        return Platform
                .create(platformData)
                .then(Platform => res.status(201).send(Platform))
                .catch(error => res.status(400).send(error));

    },
    put(req,res){
        let platformData = {};
        // get the name from request body
        let reqBody = req.body;
        let name = reqBody.name;

        if(!name){
            res.status(400).send();
        }

        platformData['name'] = name;

        if(reqBody.package_name_android){
            platformData['package_name_android'] = reqBody.package_name_android;
        }

        if(reqBody.package_name_ios){
            platformData['package_name_ios'] = reqBody.package_name_ios;
        }

        let img_name = req.body.img_name;
        if(img_name){
            platformData['img_name'] =  uploadImage(img_name);
        }

        return Platform.update(
            platformData,
            { where: { id: req.params.id } }
          ).then(Platform => res.status(200).send(Platform))
          .catch(error => res.status(400).send(error));
        
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
      },
        
};


function uploadImage(img_name){

    
        // Regular expression for image type:
        // This regular image extracts the "jpeg" from "image/jpeg"
        var imageTypeRegularExpression      = /\/(.*?)$/;      

        // Generate random string
        var crypto                          = require('crypto');
        var seed                            = crypto.randomBytes(20);
        var uniqueSHA1String                = crypto
                                               .createHash('sha1')
                                                .update(seed)
                                                 .digest('hex');

    var imageBuffer                      = decodeBase64Image(img_name);
    var userUploadedPlatformImageLocation = 'public/images/platform/';

    var uniqueRandomImageName            = 'PlatformImage-' + uniqueSHA1String;
    // This variable is actually an array which has 5 values,
    // The [1] value is the real image extension
    var imageTypeDetected                = imageBuffer
                                            .type
                                             .match(imageTypeRegularExpression);

    var userUploadedImagePath            = userUploadedPlatformImageLocation + 
                                           uniqueRandomImageName +
                                           '.' + 
                                           imageTypeDetected[1];
    let uploadedImageName =     uniqueRandomImageName + '.' + imageTypeDetected[1];

     // Save decoded binary image to disk
     try
     {
     fs.writeFile(
         userUploadedImagePath,
         imageBuffer.data,  
         {encoding: 'base64'},   
         function(err) {
             if(err){
                return res.status(400).send(err);
              } 
            }
        );
     }
     catch(error)
     {
         console.log('ERROR:', error);
     }
     return uploadedImageName;

}

function decodeBase64Image(dataString) 
{
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  if (matches.length !== 3) 
  {
    return res.status(400).send("Invalid Input String");
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

module.exports = platformController;