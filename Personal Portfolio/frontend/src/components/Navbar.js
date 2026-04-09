import React, { useState, useEffect } from 'react';

function Navbar({ setShowResume }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setIsScrolled(window.scrollY > 50);
        });
        return () => window.removeEventListener('scroll', () => {});
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="logo" onClick={() => scrollToSection('home')}>
                    MyPortfolio
                </div>
                <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <button onClick={() => scrollToSection('home')}>Home</button>
                    <button onClick={() => scrollToSection('about')}>About</button>
                    <button onClick={() => scrollToSection('skills')}>Skills</button>
                    <button onClick={() => scrollToSection('education')}>Education</button>
                    <button onClick={() => scrollToSection('projects')}>Projects</button>
                    <button onClick={() => scrollToSection('contact')}>Contact</button>
                    <button className="resume-btn" onClick={() => setShowResume(true)}>
                        📄 Resume
                    </button>
                </div>
                <div className="mobile-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;