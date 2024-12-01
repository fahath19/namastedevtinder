const mongoose=require("mongoose");
const { Schema }=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');

const  userschema=new Schema({
    firstName: {             //FIELD IS FIRSTNAME
          type:String,
          required:true,
          max:150

    },
   lastName: {        //FIELD IS LASTNAME
    type:String,
    required:true,
    max:150
    }
    ,passWord:{                  //FIELD IS passWord
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
   email: {          
        
    //FIELD IS email
     
    type:String,
          unique:true,
          required:true,
          lowercase:true,

          validate(value){
              if(!validator.isEmail(value)){
                 throw new Error("email is invalid");
              }
          }
    }
    , 
    age:{                           //FIELD IS age 
        type:Number,
        required:true
    }
    ,
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["male","female"].includes(value)){
                 throw new Error("PLEASE ENTER CORRECT GENDER....");
                 
            }

        }
    }
    ,
    skill:{
        type:[String],
        default:["english","tamil","discipline"]
    }
    

},
{
    timestamps:true,
}
)

userschema.methods.getJWT=async function  (){
     const user=this;
     const token=await jwt.sign({_id:user._id},"bahad123");
     return token;
}
userschema.methods.validatePassowrd=async function  (getpassowrdinput){
    const isuser=this;
    const ispassword=await bcrypt.compare(getpassowrdinput.trim(),isuser.passWord);
    return ispassword;
}

module.exports=  mongoose.model("User",userschema);