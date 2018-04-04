const Group = require('../models/').group;

var groupController = {

    get(req,res){
        return Group
            .findAll()
                .then(Group => {
               // projects will be an array of all Project instances
                     res.status(200).send(Group)
         }).catch(
                error => {
                            console.log(error.stack);
                            res.status(400).send(error)
                    }
            );
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
        let GroupData = {
                'name' : name,
                'img_url' : img_url
            };

        return Group
                .create({
                    name : req.body.name,
                    img_url : req.body.img_url
                })
                .then(Group => res.status(201).send(Group))
                .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return Group
          .findById(req.params.id)
          .then(Group => {
            if (!Group) {
              return res.status(400).send({
                message: 'Group Not Found',
              });
            }
            return Group
              .destroy()
              .then(() => res.status(204).send())
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }
};

module.exports = groupController;