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
const {auth_2} = require("../middlewares/auth2");
app.use(express.json());
router.use(cors());


router.post("/", auth_2, async (req, res) => {
    res.status(200).json({status: req.body.state});
})

module.exports = ({
    PCCStatus : router
})