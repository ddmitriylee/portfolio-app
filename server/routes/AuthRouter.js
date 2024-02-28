const AuthRouter = require('express').Router();

const { registerController, loginController } = require('../controllers/AuthController');

AuthRouter.post('/register', registerController);

AuthRouter.post('/login', loginController);

AuthRouter.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || "Internal Server Error" });
})

module.exports = AuthRouter;