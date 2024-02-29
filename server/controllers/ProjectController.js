const Portfolio = require('../models/portfolioModel');
const Project = require('../models/projectModel');

const getPortfolioController = async (req, res) => {
    try {
        const id = req.params.id;
        const portfolio = await Portfolio.find({ owner: id });
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
            { $pull: { projects: { _id: projectId } } }
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
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await Project.findByIdAndUpdate(projectId, updatedProjectData, { new: true });
        await Portfolio.findOneAndUpdate(
            { owner: userId, 'projects._id': projectId },
            {
                $set: {
                    'projects.$.name': updatedProjectData.name,
                    'projects.$.descr': updatedProjectData.descr,
                    'projects.$.images': updatedProjectData.images,
                },
            }
        );

        res.status(200).json({ message: `Updated project with id: ${projectId}` })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getOneProjectController = async (req, res) => {
    try {
        const userId = req.params.id;
        const portfolio = await Portfolio.find({ owner: userId });
        if (!portfolio) {
            res.status(404).json({ message: `User doesn't have a portfolio` });
        }

        const project = await Project.findById(req.body.id);
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