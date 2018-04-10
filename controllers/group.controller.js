const Group = require('../models/').group;
const GroupRelation = require('../models/').group_relation;

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
    filter(req,res){
        let queryString = req.query;
        platform_id = queryString.platform_id;

        whereConditionObj =  {};
        
        if(queryString.id){
            whereConditionObj.id = queryString.id;
        }
        if(queryString.platform_id){
            whereConditionObj.platform_id = queryString.platform_id;
        }
        
        return Group
        .findAll({
                where : whereConditionObj
            })
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
    // TODO Refactor
    post(req,res){
   
        // get the name from request body
        let name = req.body.name;
        if(!name){
            res.status(400).send();
        }

         // get the name from request body
         let group_url = req.body.group_url;
         if(!group_url){
             res.status(400).send();
         }
        
        // get the Image Url from the request body
        let img_name = req.body.img_name;
        
        // Create new job object
        let GroupData = {
                'name' : name,
                'img_name' : img_name,
                'group_url' : group_url,
                'platform_id' : req.body.platform_id
            };

        return Group
                .create(GroupData)
                .then(
                        Group => {
                        
                            let GroupRelationData = [];
                            for (let i = 0, len = req.body.category_id.length; i < len; i++) {
                                singleGroupRelation = {
                                    'group_id' : Group.id,
                                    'category_id' : req.body.category_id[i],
                                    'platform_id' : Group.platform_id
                                }
                                GroupRelationData.push(singleGroupRelation);   
                              }
                            
                            GroupRelation.bulkCreate(GroupRelationData,  {individualHooks: true }),
                            // TODO Id is not returning in Group Relation Data
                            res.status(201).send({Group,GroupRelationData})
                               })

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