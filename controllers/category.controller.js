const Category = require('../models').category;
var fs = require('fs');

var CategoryController = {

    get(req,res){
        const imageUrl = req.protocol + '://' + req.get('host') + '/images/category/';
        return Category
            .findAll()
                .then(Category => {
                     // Category will be an array of all Category instances
                     for(let i=0;i < Category.length;i++ ){
                        if(Category[i].dataValues.img_name){
                            Category[i].dataValues.img_url = imageUrl+Category[i].dataValues.img_name;
                        }else{
                            Category[i].dataValues.img_url = '';
                        }
                    }
                     res.status(200).send(Category)
         }).catch(
            error => res.status(400).send(error));
        
    },
    getOne(req,res){
        const imageUrl = req.protocol + '://' + req.get('host') + '/images/category/';
        return Category
        .findOne({ where: {id: req.params.id} })
            .then(Category => {
                console.log(Category.dataValues);
                if(Category.dataValues.img_name){
                    Category.dataValues.img_url = imageUrl+Category.dataValues.img_name;
                }else{
                    Category.dataValues.img_url = '';
                }
                 res.status(200).send(Category)
     }).catch(
        error => res.status(400).send(error));

    },
    post(req,res){
        
        let categoryData = {};
        // get the name from request body
        let name = req.body.name;
        if(!name){
            res.status(400).send();
        }
        categoryData['name'] = name;
        

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

        let img_name = req.body.img_name;
        if(img_name){
            var imageBuffer                      = decodeBase64Image(img_name);
            var userUploadedPlatformImageLocation = 'public/images/category/';
    
            var uniqueRandomImageName            = 'CategoryImage-' + uniqueSHA1String;
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
             categoryData['img_name'] = uploadedImageName;
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

        return Category
                .create(categoryData)
                .then(Category => res.status(201).send(Category))
                .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return Category
          .findById(req.params.id)
          .then(Category => {
            if (!Category) {
              return res.status(400).send({
                message: 'Category Not Found',
              });
            }
            return Category
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
};

module.exports = CategoryController;