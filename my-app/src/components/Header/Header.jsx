import React, { useState } from 'react';
import './Header.scss';
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogoClick = () => {
        navigate('/');
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <header className="header">
            <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                <img src={logo} alt="Logo" />
            </div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <ul className="nav-list">
                    <li><a href="#about">Organizace soutěží</a></li>
                    <li><a href="#services">Služby</a></li>
                    <li><a href="#about-us">O nás</a></li>
                    <li><a href="#contact-form">Nezávazná cenová nabídka</a></li>
                </ul>
            </nav>
            <div className="hamburger" onClick={toggleMenu}>
                ☰
            </div>
        </header>
    );
};

export default Header;
