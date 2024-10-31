require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {z} = require("zod");
const cors = require("cors");
const bcrypt = require("bcrypt");
const {userModel} = require("../models/users")
const {statusModel} = require("../models/applications")
const router = express.Router();
const {auth_1} = require("../middlewares/auth1");
const {auth3} = require("../middlewares/auth3")
app.use(express.json());
app.use(cors());
// console.log("hey")

mongoose.connect(process.env.MONGO_CONNECTION)

// ! add admin table and verification middleware here
router.post("/", auth3 ,async (req, res) => {
try{   
    const token = req.body.token;
    const status = req.body.status;
    // const username = req.body.
    const user = await statusModel.findOne({
         user_id : token
    }) 
    if(!user){
        res.status(401).json({error : "User does not exists"})
    }else{
       const result =  await statusModel.updateOne({
            user_id : token
        }, 
        {
        $set:{status: status}
        }
    
)
        res.status(200).json({status : "Status change completed "});
    }
    
}
catch(e){
    res.status(401).json({error : "Invalid entry"})
}
}
)


module.exports = ({
    adminPath : router
})