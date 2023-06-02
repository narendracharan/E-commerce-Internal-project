const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://narendracharan:MwXDBJTWBx3jPfQq@ecommerce.yonhe3a.mongodb.net/",{useNewUrlParser:true})
const connection=mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connect successfully");
})