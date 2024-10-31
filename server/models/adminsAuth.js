const mongoose = require("mongoose")
const { Schema } = mongoose

const admin = new Schema({
    name: String,
    password: String
})

const adminModel = mongoose.model("admins", admin)

module.exports = {
    adminModel: adminModel
}