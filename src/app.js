const expresss = require("express");
let app=expresss();

app.use("/keyjj",(req,res)=>{

  


    res.send("hello from keyjj server from author abdul bahad")


})
app.use((req,res)=>{
    res.send("hello from server")
 
 
 })
app.listen(300,()=>{
    console.log("server started successfully");
    
});
