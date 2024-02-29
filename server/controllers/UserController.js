const User = require('../models/userModel');

const getUserDataController = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Cannot find the user" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error })
    }
} 

const getAllUserDataController = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteUserByIdController = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `Delted user with id ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports.getUserDataController = getUserDataController;
module.exports.getAllUserDataController = getAllUserDataController;
module.exports.getUserByIdController = getUserByIdController;
module.exports.deleteUserByIdController = deleteUserByIdController;