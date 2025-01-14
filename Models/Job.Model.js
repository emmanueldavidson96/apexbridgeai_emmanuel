const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    role_description:{
        type:String,
    },
    role_category:{
        type:String
    }    
}, {
    timestamps:true
})

module.exports = mongoose.model("Job", jobSchema);