const express=require("express");
const profilrouter=express.Router();
const bcrypt=require("bcrypt");
const user=require("../model/userschema");
const {authapi}=require("../Middleware/auth");
const {isalloweddata}=require("../utils/validation");




//USER GET API FOR GETING THE USER DATA FROM THE MONGO DB USING /feedapi


profilrouter.get("/feedapi",async (req,res)=>{
    // let useremail=req.body.email;
    
    try{
        let getuser= await user.find({})
        if(getuser.length===0){
            res.send("USER NOT FOUND PLEASE GIVE CORRECT DATA")
        }
        else{
            res.send(getuser)

        }
        
    }
    catch(err){
    res.send("SOMETHING WENT WRONG")
          
    }
     
    
     

})







//PROFILE API TO DISPLAY USER INFORMATION



profilrouter.post("/profile",authapi, (req,res)=>{

    try{
         const userdata=req.user;
      
                 
          
          res.send(" Hello "+ userdata?.email + " Thank You For Logined In Our DEVTINDER Website ");

    } catch(err){
        res.send("PROFILE ERROR:"+ err.message);
  }


})

//"/profil/edit" API TO EDIT THE PROFILE INFORMATION

profilrouter.post("/profil/edit",authapi,(req,res)=>{
       
    try{
        if(!isalloweddata(req.body)){
            throw new error("YOU ARE  NOT ALLOWED TO EDIT THE PROFILE");
        }
        
        const LOGINNED_USER=req.user;

        Object.keys(req.body).forEach((item)=>LOGINNED_USER[item]=req.body[item]);
        LOGINNED_USER.save();

        res.send("successfull edited the profile")
        

    }
    catch(err){
        res.send("PROFILE EDIT ERROR:",err);
    }
    
       

})

profilrouter.get("/profile/view",authapi,(req,res)=>{
    res.json({message: "profile successfully fetched",data:req.user});
})








module.exports=profilrouter;