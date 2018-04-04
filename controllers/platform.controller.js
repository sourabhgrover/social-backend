const Platform = require('../models/').Platform;
var platformController = {

    get(req,res){
        return Platform
            .findAll()
                .then(Platform => {
               // projects will be an array of all Project instances
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