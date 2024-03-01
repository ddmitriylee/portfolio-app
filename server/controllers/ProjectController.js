const Portfolio = require('../models/portfolioModel');
const Project = require('../models/projectModel');

const getPortfolioController = async (req, res) => {
    try {
        const id = req.params.id;
        const portfolio = await Portfolio.findOne({ owner: id });
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const createProjectController = async (req, res) => {
    try {
        const userId = req.id;
        console.log(userId)
        const newProject = new Project(req.body);
        await newProject.save();

        let portfolio = await Portfolio.findOne({ owner: userId });
        if (!portfolio) {
            await Portfolio.create({ owner: userId, projects: [] });
        }

        const newPortfolio = await Portfolio.updateOne({ owner: userId }, { '$addToSet': { projects: newProject } });
        res.status(200).json(newPortfolio);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteProjectController = async (req, res) => {
    const projectId = req.params.id;

    try {
        const userId = req.id;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const portfolio = await Portfolio.findOne({ owner: userId });

        await Portfolio.updateOne(
            { _id: portfolio.id },
            { $pull: { projects: { _id: project._id } } }
        );

        await Project.findByIdAndDelete(projectId);

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateProjectController = async (req, res) => {
    const projectId = req.params.id;

    try {
        const userId = req.id;
        const updatedProjectData = req.body;
        const updatedProject = await Project.findByIdAndUpdate(projectId, updatedProjectData, { new: true });
        const portfolio = await Portfolio.findOne({ 'owner': userId });

        if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
        }

        const projectIndex = portfolio.projects.findIndex(proj => proj._id.toString() === projectId);

        if (projectIndex === -1) {
        return res.status(404).json({ message: "Project not found in portfolio" });
        }

        portfolio.projects[projectIndex] = updatedProject;
        await portfolio.save();

        res.status(200).json({ message: `Updated project with id: ${projectId}` });

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getOneProjectController = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getUsersPortfolio =  async (req, res) => {
    try {
        const userId = req.params.id;
        const portfolio = await Portfolio.find({ owner: userId });
        if (!portfolio) {
            res.status(404).json({ message: `User doesn't have a portfolio` });
        }

        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports.getPortfolioController = getPortfolioController;
module.exports.createProjectController = createProjectController;
module.exports.deleteProjectController = deleteProjectController;
module.exports.updateProjectController = updateProjectController;
module.exports.getOneProjectController = getOneProjectController;
module.exports.getUsersPortfolio = getUsersPortfolio;