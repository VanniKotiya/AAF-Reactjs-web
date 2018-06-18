const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var projectadd = new Schema({

    projectName:{
        type: String,
        require:true
    },

    privacy:{
        type:Boolean,
        require:true
    },

    tags:{
        type:[],
        require: true
    },

    postdescription: {
        type: String,
        require: true
    },
    coloborators: {
        type:[],
        require: true
    },
    user: {
        type: String,
        //Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }

});

module.exports = project = mongoose.model("project", projectadd);