const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProjectRouter = require('./routes/ProjectRouter');

const app = express();
const uri = config.database.uri;
const port = config.server.port;

app.use(cors());
app.use(express.json());
app.use('/auth', AuthRouter);
app.use('/projects', ProjectRouter);

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on address: http://localhost:${port}`);
        })
    })
    .catch(error => console.error(error));