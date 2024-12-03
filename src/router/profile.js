const express=require("express");
const profilrouter=express.Router();
const bcrypt=require("bcrypt");
const user=require("../model/userschema");
const {authapi}=require("../Middleware/auth");



//USER GET API FOR GETING THE USER DATA FROM THE MONGO DB USING /getuser
profilrouter.get("/userget",async (req,res)=>{
    let useremail=req.body.email;
    
    try{
        let getuser= await user.findOne({})
        // if(getuser.length===0){
         if(!getuser){

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




//USER DELETE API FOR  USER DATA FROM THE MONGO DB USING /deleteuser
profilrouter.delete("/deleteuser",async (req,res)=>{
    let userid=req.body._id;
    
    try{

       await user.findByIdAndDelete({_id:userid});
    res.send("DATA IS SUCCESSFULLY DELETED...")
     
        
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


//USER DELETE API FOR  USER DATA FROM THE MONGO DB USING /updateuser

profilrouter.patch("/updateuser",async (req,res)=>{
    let useridd=req.body._id;
    let updatedata=req.body;

    let ALLOWEDUPDATEDATA=["_id","passWord","skill","firstName","lastName"];
    if(updatedata.skill.length>10){
        res.send("skills should be less then 10")
        return;
     }
     try{

        let ISALLOWEDDATA=Object.keys(updatedata).every((keys)=>ALLOWEDUPDATEDATA.includes(keys));

        
        if(!ISALLOWEDDATA){
            res.send("data cannot be modified..")
        }
          await user.findByIdAndUpdate(useridd,updatedata,{
            runValidators:true,
            returnDocument:"after"
        });
          res.send("USER SUCCESSFULLY UPDATED...");
     }
     catch(err){
         res.status(401).send("ERROR:",err.message)
     }
    

})


module.exports=profilrouter;