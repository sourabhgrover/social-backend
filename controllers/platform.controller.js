const Platform = require('../models').Platform;
var platformController = {

    get(req,res){
        return Platform
            .findAll()
                .then(Platform => {
               // projects will be an array of all Project instances
                     res.status(200).send(Platform)
         }).catch(
            error => res.status(400).send(error));
        
    }

    



};

module.exports = platformController;