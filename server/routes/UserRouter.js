const UserRouter = require('express').Router();
const { authenticate, authenticateAdmin } = require('../services/token');
const { getUserDataController, getAllUserDataController } = require('../controllers/UserController');

UserRouter.get('/:id', authenticate, getUserDataController);
UserRouter.get('/', authenticate, authenticateAdmin, getAllUserDataController);

UserRouter.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || "Internal Server Error" });
})

module.exports = UserRouter;