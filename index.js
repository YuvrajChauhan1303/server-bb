const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const filePath = 'data.txt';

app.use(express.json());

// Route to receive data from Raspberry Pi and store it
app.post('/send', (req, res) => {
    const data = req.body.data;
    if (!data) {
        return res.status(400).send('No data received');
    }
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.send('Data stored successfully');
    });
});

// Route to send stored data to ESP8266
app.get('/receive', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
