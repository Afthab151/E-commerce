var express = require('express');
const { log } = require('handlebars');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers');

router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products});
  })
  
})

router.get('/add-products',(req,res)=>{
  res.render('admin/add-products')
})
router.post('/add-products',(req,res)=>{

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if (!err){
        res.render('admin/add-products')
      }
      else{
        console.log(err);
      }
    })
    
  })
})
router.get('/delete-products/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProducts(proId).then((response)=>{
    res.redirect('/admin/')
  })

})
router.get('/edit-products/:id',async(req,res)=>{
  let product= await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-products',{product})
})
router.post('/edit-products/:id',(req,res)=>{
  productHelpers.updateProducts(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      let id=req.params.id
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })

})

module.exports = router;
