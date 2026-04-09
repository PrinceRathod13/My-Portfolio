const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Simplified for Mongoose v6+)
const MONGODB_URI = 'mongodb://127.0.0.1:27017/portfolio_db';

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    console.log('📀 Database: portfolio_db');
    console.log('🔗 Connection: mongodb://localhost:27017');
})
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    console.log('💡 Make sure MongoDB is running on your computer');
    console.log('💡 To start MongoDB:');
    console.log('   - Windows: net start MongoDB');
    console.log('   - Mac: brew services start mongodb-community');
    console.log('   - Linux: sudo systemctl start mongod');
});

// Message Schema
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

// Resume Data
const getResumeData = () => ({
    personalInfo: {
        name: "Prince Rathod",
        title: "Computer Science and Engineering Student",
        email: "princerathod13579@example.com",
        phone: "+1 234 567 8900",
        location: "Rajkot ,Gujrat,India",
        github: "https://github.com/PrinceRathod13",
        // linkedin: "https://linkedin.com/in/johndoe"
    },
    summary: "Computer Science student passionate about web development. Looking for internship opportunities.",
    skills: ["JavaScript", "React", "Node.js", "Python", "HTML/CSS", "MongoDB","Fultter","Java","Express .Js","Advanced Java"],
    education: [
        {
            degree: "Computer Engineering (Diploma)",
            institution: "Darshan University",
            year: "2022-2025",
            gpa: "9.92/10"
        },
        {
            degree: " Computer Science and Engineering (BE)",
            institution: "Marwadi University",
            year: "2025-2028",
            gpa: "9/10"
        }
    ],
    // experience: [
    //     {
    //         title: "Web Developer Intern",
    //         company: "Tech Company",
    //         period: "Summer 2024",
    //         description: "Developed web applications using React and Node.js"
    //     }
    // ],
    projects: [
        {
            name: "Online Vendor Shoping System",
            description: "Online Vendor Shoping System with Database",
            technologies: ["Flutter"],
            // github: "https://github.com/username/project"
        },
        {
            name: "Campus Managment System",
            description: "Campus Managment System in Advanced Java Programming",
            technologies: ["Advanced Java"],
            // github: "https://github.com/username/project"
        },
        {
            name: "University Managment System",
            description: "University Managment System With Database",
            technologies: ["Html","CSS","JavaScript"],
             github: "https://github.com/PrinceRathod13/Web-Technology-Project "
        },
        {
            name: "Portfolio Website",
            description: "Personal portfolio with MongoDB database integration",
            technologies: ["React", "Node.js", "MongoDB"],
            // github: "https://github.com/username/project"
        }
    ],
    certificates: ["JavaScript Certificate - freeCodeCamp"]
});

// ========== API ROUTES ==========

// Get resume data
app.get('/api/resume', (req, res) => {
    res.json(getResumeData());
});

// Save contact message to MongoDB
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required' 
            });
        }
        
        // Create and save new message
        const newMessage = new Message({
            name,
            email,
            message
        });
        
        const savedMessage = await newMessage.save();
        
        console.log('✅ Message saved to MongoDB:', {
            id: savedMessage._id,
            name: savedMessage.name,
            email: savedMessage.email,
            time: savedMessage.createdAt
        });
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!',
            data: savedMessage
        });
    } catch (error) {
        console.error('❌ Error saving message:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save message to database' 
        });
    }
});

// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: messages.length,
            messages: messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch messages' 
        });
    }
});

// Get single message by ID
app.get('/api/messages/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ 
                success: false, 
                error: 'Message not found' 
            });
        }
        res.json({ success: true, message });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch message' 
        });
    }
});

// Delete message
app.delete('/api/messages/:id', async (req, res) => {
    try {
        const deleted = await Message.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ 
                success: false, 
                error: 'Message not found' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Message deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to delete message' 
        });
    }
});

// Database status endpoint
app.get('/api/db-status', async (req, res) => {
    try {
        const count = await Message.countDocuments();
        const status = {
            mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            readyState: mongoose.connection.readyState,
            database: mongoose.connection.name || 'Not connected',
            messageCount: count,
            host: mongoose.connection.host || 'localhost'
        };
        res.json(status);
    } catch (error) {
        res.json({ 
            mongodb: 'Error', 
            error: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API Endpoints:`);
    console.log(`   GET  /api/resume     - Portfolio data`);
    console.log(`   POST /api/contact    - Save message to MongoDB`);
    console.log(`   GET  /api/messages   - View all messages`);
    console.log(`   GET  /api/db-status  - Database status`);
    console.log(`\n💡 MongoDB Compass: mongodb://localhost:27017`);
    console.log(`📀 Database: portfolio_db`);
    console.log(`📁 Collection: messages\n`);
});