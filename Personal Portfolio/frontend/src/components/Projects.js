import React from 'react';

function Projects({ data }) {
    if (!data || !data.projects || data.projects.length === 0) {
        return (
            <section id="projects" className="projects">
                <div className="container">
                    <h2 className="section-title">My Projects</h2>
                    <p>Online MultiVendor Shoiping System In <b>Flutter</b> </p>
                    <p>Campus Management System In <b>Advanced Java Programming</b></p>
                    <p>University Management System <b>Web Technology</b></p>
                    <p> Online Course Managment System in<b> Advanced Web Technology</b></p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="projects">
            <div className="container">
                <h2 className="section-title">My Projects</h2>
                <div className="projects-grid">
                    {data.projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-content">
                                <h3 className="project-title">{project.name || 'Project'}</h3>
                                <p className="project-description">{project.description || 'No description'}</p>
                                {project.technologies && (
                                    <div className="project-tech">
                                        {project.technologies.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                                {project.github && (
                                    <a 
                                        href={project.github} 
                                        className="project-link" 
                                        target="_blank" 
                                        rel="noopener noreferrer"  // ✅ Fixed security issue
                                    >
                                        GitHub →
                                    </a>
                                )}
                                {project.live && (
                                    <a 
                                        href={project.live} 
                                        className="project-link" 
                                        target="_blank" 
                                        rel="noopener noreferrer"  // ✅ Fixed security issue
                                        style={{ marginLeft: '15px' }}
                                    >
                                        Live Demo →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;