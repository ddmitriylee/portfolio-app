const UserRouter = require('express').Router();
const { authenticate, authenticateAdmin } = require('../services/token');
const { getUserDataController, getAllUserDataController, getUserByIdController, deleteUserByIdController } = require('../controllers/UserController');

UserRouter.get('/', authenticate, getUserDataController);
UserRouter.get('/all', authenticate, authenticateAdmin, getAllUserDataController);
UserRouter.get('/:id', authenticate, getUserByIdController);
UserRouter.delete('/:id', authenticate, authenticateAdmin, deleteUserByIdController);

UserRouter.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || "Internal Server Error" });
})

module.exports = UserRouter;