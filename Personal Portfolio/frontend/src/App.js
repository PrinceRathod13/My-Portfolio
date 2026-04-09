import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ResumeViewer from './components/ResumeViewer';

function App() {
    const [resumeData, setResumeData] = useState(null);
    const [showResume, setShowResume] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResumeData();
    }, []);

    const fetchResumeData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/resume');
            console.log('Data received:', response.data); // Check console
            setResumeData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching resume:', error);
            setError('Failed to load data. Please make sure backend is running on port 5000');
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!resumeData) {
        return <div className="error-message">No data available</div>;
    }

    return (
        <div className="App">
            <Navbar setShowResume={setShowResume} />
            <Hero data={resumeData} />
            <About data={resumeData} />
            <Skills data={resumeData} />
            <Education data={resumeData} />
            <Projects data={resumeData} />
            <Contact />
            {showResume && <ResumeViewer setShowResume={setShowResume} data={resumeData} />}
        </div>
    );
}

export default App;