// Install required packages: express, body-parser (Installed)
// Don't forget to actually install these!
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory status data for the spacecraft
let spacecraftStatus = {
    power: null,
    speed: null,
    fuel: null
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get current status of the spacecraft
app.get('/status', (req, res) => {
    res.json(spacecraftStatus);
});

// Update the status of the spacecraft
app.post('/update-status', (req, res) => {
    const { power, speed, fuel } = req.body;

    if (power !== undefined) {
        spacecraftStatus.power = power;
    }
    if (speed !== undefined) {
        spacecraftStatus.speed = speed;
    }
    if (fuel !== undefined) {
        spacecraftStatus.fuel = fuel;
    }

    res.json({ message: 'Spacecraft status updated successfully!', status: spacecraftStatus });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Spacecraft backend is running on http://localhost:${PORT}`);
});