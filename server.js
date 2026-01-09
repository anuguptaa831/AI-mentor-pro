require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors()); 
app.use(express.json()); 

const PORT = 5000;


app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log("Recevied a message from frontned", userMessage);

    
        const dummyResponse = "Backend connection successful! Your frontend is working perfectly.";
        
        res.json({ reply: dummyResponse }); 

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server Failed." });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server ready!`);
    console.log(`🚀 Address: http://localhost:${PORT}`);
});