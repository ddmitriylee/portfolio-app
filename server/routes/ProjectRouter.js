const ProjectRouter = require('express').Router();
const { getPortfolioController, createProjectController, deleteProjectController } = require('../controllers/ProjectController');

ProjectRouter.get('/', getPortfolioController);
ProjectRouter.post('/', createProjectController);
ProjectRouter.delete('/', deleteProjectController);
ProjectRouter.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || "Internal Server Error" });
})

module.exports = ProjectRouter;