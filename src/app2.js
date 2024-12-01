let express=require("express");
let app=express();
app.use("/",(req,res,next)=>{
    // res.send("hello")
    next()
}
,(req,res,next)=>{

    // res.send("hello from route handler2")
    next()
}

,(req,res,next)=>{
    next()
}
,

(req,res,next)=>{
    // next()
}
)
app.listen(200,()=>{
    console.log("server is created successfully");
    
})