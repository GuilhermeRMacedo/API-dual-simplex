const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dualSimplexRoutes = require('./api/routes/dualsimplex')

//to cors error
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        return res.status(200).json({})
    }
    next();
});

//to log errors
app.use(morgan('dev'));

//to parse body from requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.use('/dual-simplex', dualSimplexRoutes);

//to return errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//to return errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;