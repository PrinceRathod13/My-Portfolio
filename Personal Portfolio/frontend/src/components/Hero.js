import React from 'react';

function Hero({ data }) {
    const scrollToContact = () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1>{data.personalInfo.name}</h1>
                    <div className="hero-title">{data.personalInfo.title}</div>
                    <div className="hero-summary">{data.summary.substring(0, 150)}...</div>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={scrollToContact}>Hire Me</button>
                        <button className="btn-secondary">View Work</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;