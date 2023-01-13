const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const validateEmail = function(email) {
    const condition = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return condition.test(email)
};


const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please enter your name.']
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required.',
        validate: [validateEmail, 'Please fill a valid email address.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.']
    },
    password: {
        type: String,
        required: true,
        
    },
    confirmPassword: {
        type: String,
        required: true

    },
    dateOfBirth: {
        type: String,
    }, 
    isActive: {
        type: Boolean,
        default: true
    },
    gender: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String,
        required: false
    },

    resetTokenExpiry: {
        type: Date,
        required: false
    },

}, { timestamps: true }) 

UsersSchema.pre('save',  function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UsersSchema.pre('save',  function(next) {

    const user = this;

    if (!user.isModified('confirmPassword')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.confirmPassword, salt, function(err, hash) {
            if (err) return next(err);

            user.confirmPassword = hash;
            next();
        });
    });
});

UsersSchema.methods.createJWT = function() {
    const token = jwt.sign(
        {email:this.email,isAdmin:this.isAdmin},
        process.env.JWT_KEY,
        {expiresIn:"600h"}    
    );
   return token;
};

module.exports = mongoose.model('User', UsersSchema)
