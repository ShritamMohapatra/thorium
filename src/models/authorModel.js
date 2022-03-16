const mongoose = require('mongoose');
require('mongoose-type-email');

const autherSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:["Mr","Mrs","Miss"],
        required:true
    },
    email:{type:mongoose.SchemaTypes.Email,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Author',autherSchema)
