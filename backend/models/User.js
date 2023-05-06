const mongoose=require('mongoose');
// const {schema}=require('../db')

const schema=mongoose.Schema;

const userschema= new schema({
    name:{type:String,
    required:true
},
    email:{type:String,
    required:true,
    unique:true
},
    password:{type:String,
    required:true
},
    date:{type:Date,
    default:Date.now
}
});
const user=mongoose.model('users',userschema);
// user.createIndexes()
module.exports=user;