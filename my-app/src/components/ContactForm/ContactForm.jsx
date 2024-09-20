import React, { useState } from 'react';
import './ContactForm.scss';

const ContactForm = ({ onFormSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        sector: 'veřejný',
        buildingType: 'náměstí',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://www.testproject.test/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const text = await response.text();

            const data = JSON.parse(text);

            if (response.ok) {
                onFormSubmit();
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    sector: 'veřejný',
                    buildingType: 'náměstí',
                    message: ''
                });
            } else {
                alert('Nastala chyba při odesílání dotazu.');
            }
        } catch (error) {
            console.error('Chyba:', error);
            alert('Nastala chyba při odesílání dotazu.');
        }
    };

    return (
        <section className="contact-form" id="contact-form">
            <h2>Kontaktujte nás pro nezávaznou konzultaci</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Jméno:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefon:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sector">Typ sektoru:</label>
                    <select
                        id="sector"
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                    >
                        <option value="veřejný">Veřejný</option>
                        <option value="soukromý">Soukromý</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="buildingType">Typ stavby:</label>
                    <select
                        id="buildingType"
                        name="buildingType"
                        value={formData.buildingType}
                        onChange={handleChange}
                    >
                        <option value="areál">Areál</option>
                        <option value="brownfield">Brownfield</option>
                        <option value="urbanismus">Urbanismus</option>
                        <option value="park">Park</option>
                        <option value="náměstí">Náměstí</option>
                        <option value="malá budova">Stavba malého rozsahu</option>
                        <option value="střední budova">Stavba středního rozsahu</option>
                        <option value="velká budova">Stavba velkého rozsahu</option>
                        <option value="umělecké dílo">Umělecké dílo</option>
                        <option value="jiné">jiné</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Zpráva:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Odeslat</button>
            </form>
        </section>
    );
};

export default ContactForm;
