const Portfolio = require('../models/portfolioModel');
const Project = require('../models/projectModel');

const getPortfolioController = async (req, res) => {
    try {
        const id = req.headers.id;
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

        const project = { name: req.body.name, descr: req.body.descr, images: req.body.images };
        await Portfolio.updateOne({ owner: id }, { '$addToSet': { projects: project } });
        res.status(200).json(Portfolio);
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const deleteProjectController = async (req, res) => {
    try {
        const id = req.headers.id;
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

module.exports.getPortfolioController = getPortfolioController;
module.exports.createProjectController = createProjectController;
module.exports.deleteProjectController = deleteProjectController;