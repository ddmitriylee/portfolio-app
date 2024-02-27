const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
    },
    descr: {
        type: String
    },
    images: {
        type: Array
    }
})

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;