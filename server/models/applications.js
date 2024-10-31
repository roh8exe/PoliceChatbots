const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const status = new Schema({
    status: String,
    user_id: ObjectId
})

const statusModel =  mongoose.model("status", status);

module.exports = {
    statusModel:statusModel
}
