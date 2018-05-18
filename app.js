const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

require('dotenv').config();

const app = express();

// View Engine Setup
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Environment
app.set('port', process.env.PORT || 8080);

// Base Route
app.get('/', (req, res) => {
    res.send('Hello');
});

// Start Server
app.listen(app.get('port'), () => {
    console.log(`server started on port ${app.get('port')}`);
});