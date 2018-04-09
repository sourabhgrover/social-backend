const Category = require('../models').category;
var CategoryController = {

    get(req,res){
        return Category
            .findAll()
                .then(Category => {
               // projects will be an array of all Project instances
                     res.status(200).send(Category)
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
        let categoryData = {
                'name' : name,
                'img_url' : img_url
            };

        return Category
                .create({
                    name : req.body.name,
                    img_url : req.body.img_url
                })
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