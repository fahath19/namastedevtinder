const validator=require("validator");
const signupvalidate=(req)=>{
    const {firstName,lastName,passWord,email,skill}=req.body;
    if(skill?.length>10){
        throw new Error ("skill should be less then 10..")
       
     }
     else if(!validator.isEmail(email)){
            throw new Error("EMAILID IS INVALID");

     }
     else if(!validator.isStrongPassword(passWord)){
             throw new Error("PASSWORD IS WEAK PLEASE ENTER STRONG PASSWORD");
     }
    //  else{
    //      throw new Error("SOME THING WENT WRONG IN VALIDATONFILE");
    //  }
}
module.exports={
    signupvalidate
}