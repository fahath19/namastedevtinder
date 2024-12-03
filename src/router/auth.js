const express=require("express");
const authrouter=express.Router();
const bcrypt=require("bcrypt");
const user=require("../model/userschema");


//SINGUPPAGE API
//USER POST API FOR UPLOAD THE USER DATA INSIDE THE MONGO DB USING /singuppage


authrouter.post("/signuppage",async (req,res)=>{
   const {firstName,lastName,passWord,email,skill,age,gender}=req?.body;
    

   try{
    signupvalidate(req);
     const hashpass=await bcrypt?.hash(passWord,10);
  
           
     let Userr=new user({
        firstName,
        lastName,
        passWord:hashpass,
        email,
        age,
        skill,
        gender
     })
     await Userr.save().then(()=>{

          
       
        res.send("SUCCESSFULLY  SIGNUP   SER DATA ADDED");
        
     })
   }
   catch(err){
         res.send("SIGNUP ERROR:"+ err.message);
   }
});



//LOGIN API

//USER POST API FOR LOGIN THE USER  DATA IN MONOGO USING /loginpage


authrouter.post("/loginuser",async (req,res)=>{
    try{
        const {email,passWord}=req.body;

        const isuser=await user.findOne({ email: email });
        
        
        if(!isuser){
            throw new Error("EMAIL INVALID");
        }
       
        
    //   const ispassword=await bcrypt.compare(passWord.trim(),isuser.passWord);
          const ispassword=await isuser.validatePassowrd(passWord)
     
        if(!ispassword){
            throw new Error("PASSWORD INVALID FROM LOGIN");    
           
        }
        else{

            const token=await isuser.getJWT();
            // const token=await jwt.sign({_id:user._id},"bahad123");
            res.cookie("TOKEN",token);
             
            res.send("LOGIN IS SUCCESSFULL");


        
        }
    }

    catch(err){
        res.send("LOGIN ERROR:" + err);
    }
   
})


//LOGOOUT API 
authrouter.post("/userlogout",(req,res)=>{
    res.cookie("TOKEN",null,{
        expires:new Date(Date.now())
    })
     res.send("YOUR SUCCESSFULLY LOGOUT...");

})


module.exports=authrouter;