var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    dob: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    country: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }
});

module.exports = {User};