const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User'); 

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/innovationDB')
  .then(() => {
      console.log("Connected to MongoDB");
  })
  .catch((err) => {
      console.error("MongoDB connection error:", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'loginpage.html')); 
});

app.post('/login', async (req, res) => {
    console.log(req.body); 
    const { name, regno, dob, department, tenth_percentage, twelth_percentage, ug_percentage, hobbies } = req.body;

    
    const hobbiesArray = hobbies ? (Array.isArray(hobbies) ? hobbies : [hobbies]) : [];

    try {
        const user = new User({
            name,
            regno,
            dob: new Date(dob),  
            department,
            tenth_percentage,
            twelth_percentage,
            ug_percentage,
            hobbies: hobbiesArray
        });

        await user.save();
        res.send('Login details saved to MongoDB!');
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).send('Error saving to database');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
