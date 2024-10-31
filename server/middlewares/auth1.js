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



async function auth_1(req, res, next){
    if(req.body.adhaarNumber){
        const user = await  userModel.findOne({adhaarNumber: req.body.adhaarNumber})
        if(user){
            res.status(401).json({error: "you have already applied please view your status"})
        }else{
            next();
        }
        
    }else{
        next();
    }
}

module.exports = ({
    auth_1:auth_1
})