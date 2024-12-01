// WE USING THE MIDDLEWARE FOR AUTH,LOGININFO Etc  AND ROUTE HANDLER FOR HANDLING THE REQUEST INCOMING TO GIVE THE RESPONSE..
//ALREADY WE CREATE THE POST API AND WE CREATE THE USER GET API BY USING FIND() METHOD TO MATCH THE EMAILID TO GET THE USER FROM MONGO DATABASE
//AND CREATE THE FEED API TO GET ALL THE USER FROM MONGO DATABASE
//ALSO WE USE THE FINDONE METHOD TO GET THE ONE USERDATA


let express=require("express");
let connectdb=require('./config/Mongodb')
const user=require("./model/userschema");
require("./config/Mongodb");
const {signupvalidate}=require("./utils/validation.js")
const bcrypt=require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
let app=express()
app.use(express.json());
app.use(cookieParser())
const {authapi}=require("../Middleware/auth.js");

//USER GET API FOR GETING THE USER DATA FROM THE MONGO DB USING /getuser
app.get("/userget",async (req,res)=>{
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


app.get("/feedapi",async (req,res)=>{
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
app.delete("/deleteuser",async (req,res)=>{
    let userid=req.body._id;
    
    try{

       await user.findByIdAndDelete({_id:userid});
    res.send("DATA IS SUCCESSFULLY DELETED...")
     
        
    }
    catch(err){
    res.send("SOMETHING WENT WRONG")
          
    }
     
    
     

})
//USER DELETE API FOR  USER DATA FROM THE MONGO DB USING /updateuser

app.patch("/updateuser",async (req,res)=>{
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
//USER POST API FOR LOGIN THE USER  DATA IN MONOGO USING /loginpage
app.post("/loginuser",async (req,res)=>{
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

//USER POST API FOR UPLOAD THE USER DATA INSIDE THE MONGO DB USING /singuppage


app.post("/signuppage",async (req,res)=>{
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



//PROFILE API TO DISPLAY USER INFORMATION



app.post("/profile",authapi, (req,res)=>{

    try{
         const userdata=req.user;
      
                 
          
          res.send(" Hello "+ userdata?.email + " Thank You For Logined In Our DEVTINDER Website ");

    } catch(err){
        res.send("PROFILE ERROR:"+ err.message);
  }


})

//SEND CONNECTION TO USER API

app.post("/sendrequest",authapi,(req,res)=>{
   
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


connectdb()
.then(()=>{
    console.log("DATABASE SUCCESSFULLY CONNECTED");
    app.listen(300,()=>{
        console.log("server excuted successfully");
        
    })
    
})
.catch((err)=>{
    console.log("DATABASE NOT CONNECTED PLEASE TRY AGAIN",err);
})
