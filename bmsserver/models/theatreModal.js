const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    theatreName:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
});

module.exports = mongoose.model('theatres', theatreSchema);