const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const users = new Schema({
    // PoliceStation:String,
    name: String,
    address : String,
    date_since : String,
    on_rent : String,
    landlord : {
        name_landlord : String,
        phone : String
    },
    number_of_residents : String,
    occupation : String,
    mobileNo : String,
    adhaarNumber: String
})

const userModel =  mongoose.model("users", users);

module.exports = {
    userModel:userModel
}
