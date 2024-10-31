require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { z } = require("zod");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/users");
const { statusModel } = require("../models/applications");
const { adminModel } = require("../models/adminsAuth");
const router = express.Router();
app.use(express.json());
app.use(cors());

async function auth3(req, res, next) {
  // console.log(req.body.name)
  const requiredBody = z.object({
    name: z.string().min(1),
    password: z.string().min(1),
    token: z.string().min(1),
    status: z.string().min(1),
  });
  const adminName = req.body.name;
  const adminPassword = req.body.password;
  const adminToken = req.body.token;
  const status = req.body.status;
  const data = requiredBody.safeParse({
    name : adminName,
    password :adminPassword,
    token : adminToken,
    status : status,
  });
  if (data.success) {
    const admin = await adminModel.findOne({
      name: req.body.name,
      password: req.body.password,
      // ! i am not adding bcrypt as there is no signUp for admin in website
    });
    if (admin) {
      next();
    } else {
      res.status(401).json({ error: "Not  Authorized" });
    }
  } else {
    res.status(401).json({ error: "Invalid Request" });
  }
}

module.exports = {
  auth3: auth3,
};
