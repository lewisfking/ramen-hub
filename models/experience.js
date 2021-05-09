let mongoose = require('mongoose');

//experience schema
let experienceSchema =  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    barcode:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    }
});

let Experience = module.exports = mongoose.model('Experience', experienceSchema, 'experiences');