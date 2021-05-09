let mongoose = require('mongoose');

//user schema
let usersSchema =  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    experiences:{
        Type: Array,
    }
});

let User = module.exports = mongoose.model('User', usersSchema, 'users');