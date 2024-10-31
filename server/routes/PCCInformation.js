// ! importing dependencies
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
app.use(express.json());
router.use(cors());
// console.log("hey")

mongoose.connect(process.env.MONGO_CONNECTION)

router.post("/", auth_1 ,async (req, res) =>{
    // console.log(req.body.name);

    const required_body = z.object({
        // PoliceStation : z.string(),
        name : z.string().min(2, {message : "enter correct name"}),
        address : z.string().min(1, {message:"address required"}),
        dateOfAddress : z.string().min(4, {message: "date of address field required"}),
        on_rent : z.string().min(2, {message: "on rent field required"}),
        number_of_residents : z.string().min(1, {message: "number of residents required"}),
        occupation : z.string().min(2, {message : "occupation required"}),
        mobileNo : z.string().min(9, {message: "phone number required"}),
        adhaarNumber : z.string().min(12).max(12, {message : "enter in format (XXXXXXXXXXXX)"})
    })
    //! i can add some checks for duplicity here
    // const PoliceStation = req.body.PoliceStation;
    const name = req.body.name;
    const address = req.body.address;
    const dateOfAddress = req.body.dateOfAddress;
    const on_rent = req.body.on_rent;
    // !landlord terniry
    const number_of_residents = req.body.number_of_residents;
    const occupation = req.body.occupation;
    const mobileNo = req.body.mobileNo;
    const adhaarNumber = req.body.adhaarNumber
    //! image issue to be taken care of
    //! put in database
    const data =  required_body.safeParse({ name, address, dateOfAddress, on_rent, number_of_residents, occupation,mobileNo ,adhaarNumber});
    if(!data.success){
        res.status(401).json({error : data.error.issues.map(obj => obj.message)});
    }else{
    try{
        await userModel.create({
            // PoliceStation:PoliceStation,
            name:name,
            address:address,
            date_since:dateOfAddress,
            on_rent: on_rent,
            number_of_residents: number_of_residents,
            occupation: occupation,
            mobileNo: mobileNo,
            adhaarNumber: adhaarNumber
        })
        const User = await userModel.findOne({
            adhaarNumber:adhaarNumber,
        })
        //! adding pending requests
        await statusModel.create({
            status:"pending",
            user_id:User._id
        })
        res.status(200).json({token: User._id});
    }catch(e){
        res.status(401).json({error:"Form submission error"}); 
    }
}
})

module.exports = (
    {
        PCCInformation : router
    }
)
