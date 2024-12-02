
const express=require("express");
const requestrouter=express.Router();
// const bcrypt=require("bcrypt");
// const user=require("./model/userschema");

const {authapi}=require("../Middleware/auth.js");

//SEND CONNECTION TO USER API

requestrouter.post("/sendrequest",authapi,(req,res)=>{
   
    try{
        const userdata=req.user;
        console.log(userdata.email);
        
        res.send(`successfull request is sended ${userdata.email}`);

    }
    catch(err)
{
    res.send(err);

}
})

module.exports=requestrouter ;