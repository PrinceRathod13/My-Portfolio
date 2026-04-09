import React from 'react';

function About({ data }) {
    return (
        <section id="about" className="about">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>{data.summary}</p>
                    </div>
                    <div className="about-info">
                        <div className="info-item">
                            <span className="info-label">📧 Email:</span>
                            <span className="info-value">{data.personalInfo.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">📱 Phone:</span>
                            <span className="info-value">{data.personalInfo.phone}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">📍 Location:</span>
                            <span className="info-value">{data.personalInfo.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;