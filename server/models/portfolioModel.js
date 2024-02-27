const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projects: {
        type: [mongoose.Schema.Types.Mixed]
    }
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;