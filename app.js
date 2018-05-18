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
    res.render('contact');
});

// submit form 
app.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `"AlterEgoDesigns" <${process.env.EMAIL}>`, // sender address
        to: `${req.body.email}`, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {msg: 'Email has been sent'});
    });
});


// Start Server
app.listen(app.get('port'), () => {
    console.log(`server started on port ${app.get('port')}`);
});