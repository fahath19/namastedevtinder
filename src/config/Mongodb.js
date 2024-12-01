//WE CONNECT THE CLUSTER(MONGODB ATLAS) TO OUR CODE AND DISPLAY  THE DATA FROM DATABASE IN THE MONGODB COMPASS -->WE USE THE MONGOOSE 
let mongodconnectbstring="mongodb+srv://abdulbahad:Bahad2003@cluster.jmzoa.mongodb.net/devtinder"
let mongoose=require("mongoose");

//npm i mongoose
const connectdb=async ()=>{
    await mongoose.connect(mongodconnectbstring);
}

module.exports=connectdb;