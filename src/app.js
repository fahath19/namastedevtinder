const expresss = require("express");
let app=expresss();

app.get("/bahad/:userid/:name/:password",(req,res)=>{
    //   res.send(req.query);
    
     res.send({route:req.params,name:"bahad",age:20,status:"success"})

})

app.post("/bahad1",(req,res)=>{
    res.send("FILE WILL POST IN THE DATA BASE")

})


app.delete("/bahad",(req,res)=>{
    res.send("file will be deleted or removed from the data base")

})


app.listen(300,()=>{
    console.log("server started successfully");
    
});
