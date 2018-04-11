const Platform = require('../models/').platform;
var platformController = {

    get(req,res){
        let imageUrl = req.protocol + '://' + req.get('host') + 'images/platform/';
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
        let name = req.body.name;
        if(!name){
            res.status(400).send();
        }
        
        // get the Image Url from the request body
        let img_url = req.body.img_url;
        
        // Create new job object
        let platformData = {
                'name' : name,
                'img_url' : img_url
            };

        return Platform
                .create({
                    name : req.body.name,
                    img_url : req.body.img_url
                })
                .then(Platform => res.status(201).send(Platform))
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
      }
};

module.exports = platformController;