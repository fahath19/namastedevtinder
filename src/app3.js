// WE USING THE MIDDLEWARE FOR AUTH,LOGININFO Etc  AND ROUTE HANDLER FOR HANDLING THE REQUEST INCOMING TO GIVE THE RESPONSE..
//ALREADY WE CREATE THE POST API AND WE CREATE THE USER GET API BY USING FIND() METHOD TO MATCH THE EMAILID TO GET THE USER FROM MONGO DATABASE
//AND CREATE THE FEED API TO GET ALL THE USER FROM MONGO DATABASE
//ALSO WE USE THE FINDONE METHOD TO GET THE ONE USERDATA


let express=require("express");
let connectdb=require('./config/Mongodb')
require("./config/Mongodb");
const {signupvalidate}=require("./utils/validation.js")
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
let app=express()
app.use(express.json());
app.use(cookieParser())
// const {authapi}=require("../Middleware/auth.js");

const authrouter=require("../src/router/auth.js");
const profilerouter=require("../src/router/profile.js");
const requestrouter=require("../src/router/request.js");

app.use("/",authrouter);
app.use("/",profilerouter);
app.use("/",requestrouter);



















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


