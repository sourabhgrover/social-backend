const Group = require('../models/').group;
const GroupRelation = require('../models/').group_relation;
const Platform = require('../models/').platform;
var fs = require('fs');


var groupController = {

    get(req,res){
        const imageUrl = req.protocol + '://' + req.get('host') + '/images/group/';
        return Group
            .findAll({
                include: [{
                    model: GroupRelation
                },{
                    model: Platform
                }
                ] 
            })
                .then(Group => {
                    for(let i=0;i < Group.length;i++ ){
                        if(Group[i].dataValues.img_name){
                            Group[i].dataValues.img_url = imageUrl+Group[i].dataValues.img_name;
                        }else{
                            Group[i].dataValues.img_url = '';
                        }
                    }
                    // projects will be an array of all Project instances
                     res.status(200).send(Group);
         }).catch(
                error => {
                            console.log(error.stack);
                            res.status(400).send(error)
                    }
            );
    },
    getOne(req,res){
        const imageUrl = req.protocol + '://' + req.get('host') + '/images/group/';
        return Group
        .findOne({ 
            where: {id: req.params.id},
            include: [{
                model: GroupRelation
            }
            ,{
                model: Platform
            }] 
         })
            .then(Group => {
                if(Group.dataValues.img_name){
                    Group.dataValues.img_url = imageUrl+Group.dataValues.img_name;
                }else{
                    Group.dataValues.img_url = '';
                }
                 res.status(200).send(Group);
     }).catch(
        error => res.status(400).send(error));

    },
    filter(req,res){
        
        // Storing All QueryString Data in queryString Var
        let queryString = req.query;

        platform_id = queryString.platform_id;

        // Declaring Group Where Condition Object
        whereConditionObj =  {};

        // Declaring Group Relation Where Condition Object
        groupRelationWhereConditionObj =  {};

        // If Id passes in queryString add in Group Model where condition 
        if(queryString.id){
            whereConditionObj.id = queryString.id;
        }

        // If platform_id passes in queryString add in Group Model where condition 
        if(queryString.platform_id){
            whereConditionObj.platform_id = queryString.platform_id;
        }

        // If category_id passes in queryString add in Group Relation Model where condition 
        if(queryString.category_id){
            groupRelationWhereConditionObj.category_id = queryString.category_id;
        }

        return Group
        .findAll({
                where : whereConditionObj,
                include: [{
                    model: GroupRelation,
                    where : groupRelationWhereConditionObj
                },
                ,{
                    model: Platform
                }] 
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
        
        // Create new Group object
        let GroupData = {};

        // get the name from request body
        let name = req.body.name;
        if(!name){
            res.status(400).send('Name Field Is Required');
        }
        GroupData['name'] = name;

         // get the name from request body
         let group_url = req.body.group_url;
         if(!group_url){
             res.status(400).send('Group URL Field Is Required');
         }
         GroupData['group_url'] = group_url;

         if(req.body.platform_id){
            GroupData['platform_id'] = req.body.platform_id;
         }
        
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
            var userUploadedPlatformImageLocation = 'public/images/group/';
    
            var uniqueRandomImageName            = 'GroupImage-' + uniqueSHA1String;
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
             GroupData['img_name'] = uploadedImageName;
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
        
        

        return Group
                .create(GroupData)
                .then(
                        Group => {
                        
                            let GroupRelationData = [];
                            if(req.body.category_id){
                                for (let i = 0, len = req.body.category_id.length; i < len; i++) {
                                    singleGroupRelation = {
                                        'group_id' : Group.id,
                                        'category_id' : req.body.category_id[i],
                                        'platform_id' : Group.platform_id
                                    }
                                    GroupRelationData.push(singleGroupRelation);   
                                  }
                                
                                GroupRelation.bulkCreate(GroupRelationData,  {individualHooks: true });   
                            }                            
                            // TODO Id is not returning in Group Relation Data
                            res.status(201).send({Group,GroupRelationData})
                               })
                .catch(error => {
                            console.log(error);
                                    res.status(400).send(error)
                            });
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