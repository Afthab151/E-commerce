
var db=require('../config/connection')
var collection=require('../config/collection')
const { response } = require('../app')
var objectId=require('mongodb').ObjectID
module.exports={

    addProduct:(product,callback)=>{
       

        db.get().collection('products').insertOne(product)
        .then((data)=>{
            
            callback(data.ops[0]._id);
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProducts:(proId)=>{
        return new Promise((resolve,reject)=>{
            console.log(proId);
            console.log(objectId(proId));
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then((response)=>{
                resolve(response)
            })

        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProducts:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
               $set:{
                Name:proDetails.Name,
                Category:proDetails.Category,
                Description:proDetails.Description,
                Price:proDetails.Price
               } 
            }).then((response)=>{
                resolve()
            })
        })
    }
}