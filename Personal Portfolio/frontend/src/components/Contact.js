import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        
        try {
            const response = await axios.post('http://localhost:5000/api/contact', formData);
            console.log('Response from server:', response.data);
            
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            
            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title">Contact Me</h2>
                <div className="contact-container">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>I'm always interested in hearing about new opportunities and exciting projects. Feel free to reach out!</p>
                        <div className="contact-details">
                            <p>📧 Email: princerathod13579@example.com</p>
                            <p>📱 Phone: +1 234 567 8900</p>
                            <p>📍 Rajkot,Gujrat,India</p>
                        </div>
                    </div>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        {success && <div className="success-message">✅ Message sent successfully </div>}
                        {error && <div className="error-message">❌ Failed to send message. Please try again.</div>}
                        
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Your Name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Your Email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <textarea 
                                name="message" 
                                placeholder="Your Message" 
                                value={formData.message} 
                                onChange={handleChange} 
                                required 
                                disabled={loading}
                                rows="5"
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;