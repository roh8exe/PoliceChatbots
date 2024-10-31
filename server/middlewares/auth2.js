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
app.use(express.json());
app.use(cors());


async  function auth_2(req, res, next){
    // console.log(req.body.token)
    const status_report = await statusModel.findOne({
        user_id:req.body.token
    })
    if(status_report){
        req.body.state = status_report.status;
        next();
    }else{
        res.status(402).json({error: "Create new application"})
    }
}

module.exports = ({
    auth_2 : auth_2
})