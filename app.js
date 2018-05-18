const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');
const promise = require('bluebird');

require('dotenv').config();

// Initialize Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

function sendEmail (obj) {
    return transporter.sendMail(obj);
}

function loadTemplate (templateName, contexts) {
    
}
