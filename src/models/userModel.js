const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String,
    autherName: String,
    year:Number,
    category:{
        type:String,
        enum:["fantasy","comedy","mystery"]
    }
    
}, { timestamps: true });

module.exports = mongoose.model('User', bookSchema)

