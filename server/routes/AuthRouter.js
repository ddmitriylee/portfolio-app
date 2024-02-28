const AuthRouter = require('express').Router();

const { registerController, loginController, getUserDataController } = require('../controllers/AuthController');
const { authenticate } = require('../services/token');

AuthRouter.post('/register', registerController);

AuthRouter.post('/login', loginController);

AuthRouter.get('/:id', authenticate, getUserDataController);

AuthRouter.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || "Internal Server Error" });
})

module.exports = AuthRouter;