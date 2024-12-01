const jwt=require("jsonwebtoken")
const user=require("../src/model/userschema");
const authapi=async (req,res,next)=>{
   try{
             const cookie=req.cookies;
             const { TOKEN }=cookie
             if(!TOKEN){
                throw new Error("TOKEN IS INVALID")
             }
             const decodeddata=await jwt.verify(TOKEN,"bahad123");
             const {_id}=decodeddata;
             const userdata=await user.findById(_id);
             if(!userdata){
                throw new Error("user not found");
             }
            req.user=userdata;
             next();
   }
   catch(err){
          res.send("AUTHAPI ERROR:" + err);
   }

}
module.exports={
    authapi
}