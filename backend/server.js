const express = require('express');
const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
    console.log('Received request at /api/contact');
    const { name, phone, email, sector, buildingType, message } = req.body;

    console.log('Contact form submission received:', req.body);

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.seznam.cz',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Nový dotaz z webu - Architektonická soutěž',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #007bff; font-size: 24px;">Nový dotaz z webu</h2>
                <p style="font-size: 16px;">Byla odeslána nová zpráva z vašeho webového formuláře.</p>
                <h3 style="color: #007bff; font-size: 20px;">Detaily zprávy:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="font-size: 16px;"><strong>Jméno:</strong> ${name}</li>
                    <li style="font-size: 16px;"><strong>Telefon:</strong> ${phone}</li>
                    <li style="font-size: 16px;"><strong>Email:</strong> ${email}</li>
                    <li style="font-size: 16px;"><strong>Typ Sektoru:</strong> ${sector}</li>
                    <li style="font-size: 16px;"><strong>Typ Stavby:</strong> ${buildingType}</li>
                </ul>
                <p style="font-size: 16px;"><strong>Zpráva:</strong><br>${message}</p>
            </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email úspěšně odeslán!' });
    } catch (error) {
        console.error('Error during email sending:', error.message);
        res.status(500).json({ message: 'Chyba při odesílání emailu', error: error.message });
    }
});

module.exports = app;
module.exports.handler = serverless(app);
