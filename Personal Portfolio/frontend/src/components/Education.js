import React from 'react';

function Education({ data }) {
    // Safe check - if no data or no education array, show nothing
    if (!data || !data.education || data.education.length === 0) {
        return (
            <section id="education" className="education">
                <div className="container">
                    <h2 className="section-title">Education</h2>
                    <p>No education data available</p>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="education">
            <div className="container">
                <h2 className="section-title">Education</h2>
                <div className="education-timeline">
                    {data.education.map((edu, index) => (
                        <div key={index} className="edu-card">
                            <h3 className="edu-degree">{edu.degree || 'N/A'}</h3>
                            <div className="edu-institution">{edu.institution || 'N/A'}</div>
                            <div className="edu-year">{edu.year || 'N/A'}</div>
                            {edu.gpa && <div className="edu-gpa">GPA: {edu.gpa}</div>}
                            {edu.courses && edu.courses.length > 0 && (
                                <div className="courses-list">
                                    {edu.courses.map((course, idx) => (
                                        <span key={idx} className="course-tag">{course}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;