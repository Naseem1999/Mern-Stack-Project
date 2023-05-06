const mongoose=require('mongoose');
 const mongoo=mongoose.connect("mongodb://0.0.0.0:27017/Inotebook");
module.exports=mongoo;


 

//    const productSchema=new mongoose.Schema(
//         {  name:String,
//            price:Number,
//            brand:String,
//            category:String
//         });
// module.exports=mongoose.model('products',productSchema);

