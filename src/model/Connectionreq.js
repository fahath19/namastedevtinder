const { Schema }=require("mangoose");
const { default: mongoose, mongo, connection } = require("mongoose");



const Connecionreq=new Schema({
      fromuser:{
        type:mongoose.Schema.Types.ObjectId
      },
      touser:{
        type:mongoose.Schema.Types.ObjectId
      },
      status:{
        type:String,
        enum:{
            values:["accepted","rejected","interseted","ignore"],
            message:"{value} is not allowed to perform.."
            
        }
      }
})

const Connecion=mongoose.model("Connectionreq",Connecionreq);
module.exports=Connecion;