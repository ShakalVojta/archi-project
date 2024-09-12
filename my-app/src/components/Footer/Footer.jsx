import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Vaše Společnost. Všechna práva vyhrazena.</p>
                <div className="footer-links">
                    <a href="mailto:architektonickesouteze@gmail.com">architektonickesouteze@gmail.com</a>
                    <span className="separator">|</span>
                    <a href="tel:+420607153114">+420 607 153 114</a>
                    <span className="separator">|</span>
                    <a>Facebook</a>
                    <span className="separator">|</span>
                    <a>Instagram</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
