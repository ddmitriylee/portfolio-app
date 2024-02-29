const bcrypt = require('bcrypt');

const { regValidator, loginValidator } = require('../services/validator');
const { generateToken } = require('../services/token');
const User = require('../models/userModel');
const sendEmail = require('../services/emailSender');

const registerController = async (req, res) => {
    try {
        if (regValidator({ login: req.body.login, password: req.body.password }).error) {
            res.status(422).json({message: "Unprocessable Entity"})
            return
        }

        const newUser = new User(req.body)
        if (await User.findOne({login: newUser.login})) {
            res.status(400).json({message: "User with such login alredy exists"})
            return
        }
    
        const result = await newUser.save();
        console.log(`user registered with id=${result._id}`);
        // sendEmail(newUser.email, "Registration", "Thanks for registrating in my app!");
        res.status(200).json({message: `User registered with id=${result._id}`})

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

const loginController = async (req, res) => {
    try {
        let user = await User.findOne({ login: req.body.login });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user = req.body;
        const validRes = loginValidator(user)
        if (validRes.error) {
            res.status(422).json({ message: loginValidator(user).error })
        } else {
            const encryptedUser = await User.findOne({login: validRes.value.login})
            if (await bcrypt.compare(req.body.password, encryptedUser.password)) {
                const token = generateToken(encryptedUser._id, encryptedUser.isAdmin);
                res.header('Access-Control-Expose-Headers', 'Authorization');
                res.set({"Authorization": token});
                // sendEmail(encryptedUser.email, "Login", "You are logged in!");
                res.status(200).json({ message: "Login success" });
            } else {
                res.status(403).json({ message: "Invalid login or password" });
            }
        }
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

module.exports.registerController = registerController;
module.exports.loginController = loginController;
