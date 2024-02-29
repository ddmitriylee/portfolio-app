const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String,
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    age: {
        type: Number
    },
    proffession: {
        type: String
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;