const ProjectRouter = require('express').Router();
const { authenticate, authenticateAdmin } = require('../services/token');
const { getPortfolioController, createProjectController, deleteProjectController, updateProjectController, getOneProjectController, getUsersPortfolio } = require('../controllers/ProjectController');

ProjectRouter.use(authenticate);
ProjectRouter.get('/:id', getPortfolioController);
ProjectRouter.get('/project/:id', getOneProjectController);
ProjectRouter.post('/', createProjectController);
ProjectRouter.delete('/:id', deleteProjectController);
ProjectRouter.put('/:id', updateProjectController);

ProjectRouter.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || "Internal Server Error" });
})

module.exports = ProjectRouter;