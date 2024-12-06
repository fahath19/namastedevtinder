/*



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
     
    
     

});



*/











FOR WE USE THE APP.USE() METHOD is match all the routes executes


app.use("/key/77",(req,res)=>{
    res.send("HELLO FROM /key/77")

})

app.use("/key",(req,res)=>{
    res.send("hello from key server from author abdul bahad")
})



// app.use((req,res)=>{
//     res.send("WELCOME TO HOME PAGE")
 
 
//  })


WE USE THE GET POST PATCH DELETE HTTP METHOD IN EXPRESS JS





mongodb+srv://abdulbahad:<db_password>@namastenodejs.57giz.mongodb.net/

mongodb+srv://abdulbahad:Bahad2003@namastenodejs.57giz.mongodb.net/


mongodb+srv://abdulbahad:Bahad2003@cluster.jmzoa.mongodb.net/?retryWrites=true&w=majority&appName=cluster



let express=require("express");
let {addminauth}=require("../Middleware/auth")



// app.use("/admin",)
app.use("/",(err,req,res,next)=>{
    if(err){
        res.send("somthing wrong your sexy")
    }

    else{
        next()
    }

})
app.get('/admin',addminauth,(req,res)=>{
    //try{
          throw new error("helkrelkrjelk");

        res.send("DATA SENDED SUCCESSFULLY...")

   // }
  // catch(err){
  //  res.send("SOMTHING WENT WRONG....")
  //}

})

/FOR SEE THE NETWORK SSL NETWORK SERVICE FROM MONGODB 
https://cloud.mongodb.com/v2/6708e990d104b406d8d9588d#/security/network/accessList

{
    "email":"kholi@gmail.com"
}

{
    "email":"kholi@gmail.com"
}








  // let useridd=req.body.userid;
    // console.log(useridd);
    
    // let updatedata=req.body;
    // try{
    //      await user.findByIdAndUpdate({_id:useridd},updatedata);
    //      res.send("USER SUCCESSFULLY UPDATED...");
    // }
    // catch(err){
    //     res.status(401).send("SOMETHING WENT WRONG..");

    // }



    {     "userid":"670cc5dcc79fcb256c135473",
      "firstName":"viradfdffffffffft",
        "lastName":"khofffffffffli",
        "passWord":"khffffffffoli@2003",
        "email":"khoffffffli@gmail.com",
        "age":40

}

----| GROUP THE API BY USING EXPRESS ROUTER |----

AUTHENTICATION API:-

     /login api
     /logout api
     /signup api

PROFILE API:-

     /profile API
     /profile/delete API
     /profile/edit API
     /profile/view API

REQUEST API:-
-GET /USER/CONNECTION
-GET /USER/REQUEST
-GET /USER/FEED

STATUS: ignore,interseted,accepted,rejected



