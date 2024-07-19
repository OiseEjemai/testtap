require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./connection');
const Tap = require('./models/Tap');
const bot = require('./bot'); // Ensure your bot is imported to start it

const cors = require('cors');


// Create an Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Endpoint to handle tap data

app.post('/tap', async (req, res) => {
    const { chatId, username } = req.body;
  
    try {
      const db = await connectToDatabase();
      const collection = db.collection('taps');
  
      // Insert or update the tap count
      await collection.updateOne(
        { chatId: chatId },
        { $inc: { taps: 1 }, $set: { username: username } }, // Store the username
        { upsert: true }
      );
  
      res.json({ status: 'success' });
    } catch (error) {
      console.error('Error handling tap:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/taps/:chatId', async (req, res) => {
    const { chatId } = req.params;
  
    try {
      const db = await connectToDatabase();
      const collection = db.collection('taps');
  
      const user = await collection.findOne({ chatId: chatId });
      res.json(user || { taps: 0, username: 'unknown' });
    } catch (error) {
      console.error('Error retrieving taps:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
