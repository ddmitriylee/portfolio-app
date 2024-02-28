const Portfolio = require('../models/portfolioModel');
const Project = require('../models/projectModel');

const getPortfolioController = async (req, res) => {
    try {
        const id = req.id;
        const portfolio = await Portfolio.find({ owner: id });
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const createProjectController = async (req, res) => {
    try {
        const id = req.headers.id;
        const newProject = new Project(req.body);
        await newProject.save();

        const project = { _id: newProject.id, name: req.body.name, descr: req.body.descr, images: req.body.images };
        if (!(await Portfolio.findOne({ owner: id }))) {
            await Portfolio.create({ owner: id, projects: [] });
        }
        await Portfolio.updateOne({ owner: id }, { '$addToSet': { projects: project } });
        res.status(200).json(Portfolio);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteProjectController = async (req, res) => {
    const projectId = req.params.id;

    try {
        const userId = req.headers.id;
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
        const userId = req.headers.id;
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

module.exports.getPortfolioController = getPortfolioController;
module.exports.createProjectController = createProjectController;
module.exports.deleteProjectController = deleteProjectController;
module.exports.updateProjectController = updateProjectController;
module.exports.getOneProjectController = getOneProjectController;