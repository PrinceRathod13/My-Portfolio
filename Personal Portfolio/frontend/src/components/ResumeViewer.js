import React from 'react';

function ResumeViewer({ setShowResume, data }) {
    return (
        <div className="modal-overlay" onClick={() => setShowResume(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>My Resume</h2>
                    <button className="close-modal" onClick={() => setShowResume(false)}>×</button>
                </div>
                <div className="modal-body">
                    <div className="resume-section">
                        <h3>Work Experience</h3>
                        {data.experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <strong>{exp.title}</strong> at {exp.company}<br />
                                {exp.period}<br />
                                {exp.description}
                            </div>
                        ))}
                    </div>
                    <div className="resume-section">
                        <h3>Certifications</h3>
                        <ul>
                            {data.certificates.map((cert, index) => (
                                <li key={index}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeViewer;