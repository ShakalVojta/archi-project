const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
    const { name, phone, email, sector, buildingType, message } = req.body;

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
            <li style="font-size: 16px;"><strong>Jméno:</strong> ${req.body.name}</li>
            <li style="font-size: 16px;"><strong>Telefon:</strong> ${req.body.phone}</li>
            <li style="font-size: 16px;"><strong>Email:</strong> ${req.body.email}</li>
            <li style="font-size: 16px;"><strong>Typ Sektoru:</strong> ${req.body.sector}</li>
            <li style="font-size: 16px;"><strong>Typ Stavby:</strong> ${req.body.buildingType}</li>
        </ul>
        <p style="font-size: 16px;"><strong>Zpráva:</strong><br>${req.body.message}</p>
    </div>
    `
        };

        await transporter.sendMail(mailOptions);

        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Děkujeme za Váš dotaz',
            html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p style="font-size: 16px;">Dobrý den, ${req.body.name},</p>
        <br>
        <p style="font-size: 16px;">děkujeme za váš dotaz ohledně architektonické soutěže.</p>
        <p style="font-size: 16px;">Brzy vás budeme kontaktovat s dalšími podrobnostmi.</p>
        <br>
        <p style="font-size: 16px;">S pozdravem,<br>Tým architektonických soutěží</p>
    </div>
    `
        };

        await transporter.sendMail(mailOptions);

        await transporter.sendMail(customerMailOptions);

        res.status(200).json({ message: 'Email úspěšně odeslán!' });
    } catch (error) {
        console.error('Chyba při odesílání emailu:', error);
        res.status(500).json({ message: 'Chyba při odesílání emailu' });
    }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
});
